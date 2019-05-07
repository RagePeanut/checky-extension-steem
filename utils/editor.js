const editor = {
    app: null,
    /**
     * Changes the content of the row in which a button has been clicked.
     * 
     * @param {MouseEvent} event An event representing the button click
     */
    changeRowContent: event => {
        const target = event.target;
        if(target.nodeName == "BUTTON") {
            const td = target.parentElement;
            switch(target.name.split("__")[1]) {
                case "replace":
                    td.innerHTML = html.replace(editor.app);
                    td.getElementsByTagName("input")[0].addEventListener("input", editor.changeUserPreview);
                    break;
                case "suggestions":
                    td.innerHTML = html.suggestionsLoading(3);
                    checker.suggestions(td.previousElementSibling.innerText, editor.populateSuggestions, td);
                    break;
                case "more-suggestions":
                    let dotCount = 3;
                    td.innerHTML = html.suggestionsLoading(dotCount);
                    const intervalHandle = setInterval(() => {
                        if(++dotCount == 4) dotCount = 1;
                        td.innerHTML = html.suggestionsLoading(dotCount);
                    }, 800);
                    checker.moreSuggestions(td.previousElementSibling.innerText, editor.populateSuggestions, intervalHandle, td);
                    break;
                case "ignore":
                    editor.ignoreUsername(td.previousElementSibling.innerText);
                    editor.removeTableRow(td.parentElement);
                    break;
                case "change":
                    editor.changeUsername(td.previousElementSibling.innerText, target.previousElementSibling.value);
                    editor.removeTableRow(td.parentElement);
                    break;
                case "back":
                    td.innerHTML = html.buttons(editor.app);
                    break;
                default:
                    console.log("Wrong button name");
            }
        }
    },
    /**
     * Changes a user preview based on the value of `this`.
     */
    changeUserPreview: event => {
        event.target.previousElementSibling.src = "https://steemitimages.com/u/" + event.target.value + "/avatar";
    },
    /**
     * Changes all occurences of an username in the textarea by a new username.
     * 
     * @param {string} username The username to change
     * @param {string} newUsername The new username
     */
    changeUsername: (username, newUsername) => {
        if(!/^[a-z][a-z\d.-]{1,}[a-z\d]$/i.test(newUsername)) {
            return;
        }
        const event = new Event("input", { bubbles: true });
        elements.textarea.value = elements.textarea.value.replace(new RegExp("@" + username + "(?![.-]?[a-z\\d])", "gi"), "@" + newUsername);
        elements.textarea.dispatchEvent(event);
    },
    /**
     * Checks the post's mentions.
     * 
     * @param {string} post The post to check
     */
    checkPost: post => {
        let matches = post.match(/(^|[^\w=/#])@([a-z][a-z\d.-]*[a-z\d])/gimu) || [];
        // The first character check handles the case of matches such as "@@mention"
        matches = matches.map(mention => {
            const splits = mention.split("@");
            return (splits[2] || splits[1]).toLowerCase();
        });
        if(wrongMentions.length > 0) {
            wrongMentions = wrongMentions.filter(mention => {
                if(!matches.includes(mention)) {
                    editor.removeTableRow(document.getElementById("checky__row-" + mention));
                    return false;
                }
                return true;
            });
        }
        const newMentions = [];
        for(const mention of matches) {
            if(!wrongMentions.concat(correctMentions).includes(mention) && !newMentions.includes(mention)) {
                newMentions.push(mention);
            }
        }
        if(newMentions.length > 0) {
            editor.filterWrongUsernames(newMentions, editor.insertTableRows)
        }
    },
    checkPostTimeout: 0,
    /**
     * Filters the usernames that don't exist on Steem from an array of usernames.
     * 
     * @param {string[]} usernames The usernames to filter
     * @param {function(string[])} callback A callback taking an array of wrong usernames as its argument
     */
    filterWrongUsernames: (usernames, callback) => {
        steem.api.lookupAccountNames(usernames, (err, resp) => {
            if(err) {
                console.log(err);
                return;
            }
            const correctUsernames = resp.filter(user => user != null).map(user => user.name);
            correctMentions = correctMentions.concat(correctUsernames.filter(username => !correctMentions.includes(username)));
            const wrongUsernames = usernames.filter(username => !correctUsernames.includes(username) && !ignored.includes(username));
            if(wrongUsernames.length > 0) {
                wrongMentions = wrongMentions.concat(wrongUsernames);
                callback(wrongUsernames);
            }
        });
    },
    /**
     * Ignores an username forever.
     * 
     * @param {string} username The username to ignore
     */
    ignoreUsername: username => {
        if(!ignored.includes(username)) {
            ignored.push(username);
            chrome.storage.sync.set({ignored: ignored});
        }
    },
    /**
     * Initializes the extension editor variables and DOM elements.
     */
    init: async app => {
        if(!elements.checkyEditor) {
            editor.app = app;
            (await specs.editor.getInsertionLandmark(app)).insertAdjacentHTML("beforebegin", html.baseEditor(app));
            elements.textarea = document.querySelector("textarea");
            elements.textarea.addEventListener("input", editor.rescheduleCheckPost);
            elements.checkyEditor = document.getElementById("checky");
            elements.tbody = elements.checkyEditor.getElementsByTagName("tbody")[0];
            elements.tbody.addEventListener("click", editor.changeRowContent);
        }
        editor.checkPost(elements.textarea.value);
    },
    /**
     * Inserts the rows associated to new wrong mentions in the extension's table.
     * 
     * @param {string[]} mentions The mentions to include in the rows
     */
    insertTableRows: mentions => {
        let toInsert = "";
        for(const mention of mentions) {
            toInsert += html.tr(mention, editor.app);
        }
        elements.tbody.insertAdjacentHTML("beforeend", toInsert);
        elements.checkyEditor.style.display = "block";
    },
    /**
     * Populates the suggestions select with valid usernames close to the wrong one.
     * 
     * @param {string[]} suggestions The valid usernames
     * @param {HTMLElement} td The td to insert to suggestions into
     * @param {boolean} isFirstSuggestions Whether or not the suggestions are one edit away only
     */
    populateSuggestions: (suggestions, td, isFirstSuggestions) => {
        if(suggestions.length > 0) {
            // Sorting the suggestions alphabetically and putting the suggestions with the same first character
            // as the wrong mention in first
            const wrongMentionStart = td.previousElementSibling.innerText[0];
            suggestions = suggestions.sort((a, b) => {
                if(wrongMentionStart === a[0]) {
                    if(wrongMentionStart !== b[0]) {
                        return -1;
                    }
                } else if(wrongMentionStart === b[0]) {
                    return 1;
                }
                return a.localeCompare(b);
            });
            let options = "";
            for(const suggestion of suggestions) {
                options += html.option(suggestion, suggestion, false, false);
            }
            td.innerHTML = html.suggestions(options, suggestions[0], editor.app, isFirstSuggestions);
            td.getElementsByTagName("select")[0].addEventListener("change", editor.changeUserPreview)
        } else {
            const option = html.option("", "No username found", true, false);
            td.innerHTML = html.suggestions(option, null, editor.app, isFirstSuggestions);
        }
    },
    /**
     * Removes a table row from the DOM.
     * 
     * @param {HTMLElement} tr The table row to remove
     */
    removeTableRow: tr => {
        if(!tr) return;
        tr.remove();
        if(!elements.tbody.hasChildNodes()) elements.checkyEditor.style.display = "none";
    },
    /**
     * Reschedules the check of the post's mentions.
     */
    rescheduleCheckPost: event =>  {
        clearTimeout(editor.checkPostTimeout);
        editor.checkPostTimeout = setTimeout(editor.checkPost, 1000, event.target.value);
    }
}