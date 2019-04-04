const html = {
    back: "<button name=\"checky__back\" class=\"button hollow no-border\" style=\"margin-bottom: 0\">Back</button>",
    base: "<div id=\"checky\" class=\"vframe__section--shrink\" style=\"display: none\">"
            + "<h6>Possibly wrong mentions</h6>"
            + "<table>"
                + "<thead>"
                    + "<th>Mention</th>"
                    + "<th>Actions</th>"
                + "</thead>"
                + "<tbody></tbody>"
            + "</table>"
        + "</div>",
    buttons: "<button name=\"checky__replace\" class=\"button\" style=\"margin-bottom: 0; font-size: 1rem\">Replace</button>"
            + "<button name=\"checky__suggestions\" class=\"button\" style=\"margin-bottom: 0; font-size: 1rem\">Suggestions</button>"
            + "<button name=\"checky__ignore\" class=\"button hollow no-border\" style=\"margin-bottom: 0\">Ignore</button>",
    change: "<button name=\"checky__change\" class=\"button\" style=\"margin-left: 1rem; margin-bottom: 0; font-size: 1rem\">Change</button>",
    option: (suggestion, disabled) => "<option value=\"" + suggestion + (disabled ? " disabled\">" : "\">") + suggestion + "</option>",
    replace: mention => html.userpic("null")
                        + "<input pattern=\"[A-Za-z][A-Za-z\\d.-]{1,}[A-Za-z\d]\" title=\"This username isn't valid.\" type=\"text\" style=\"display: inline-block; vertical-align: middle; width: 60%\" placeholder=\"Type what you want to replace " + mention + " by here.\" required>"
                        + html.change
                        + html.back,
    suggestions: (options, firstOption) => {
        let toReturn = "";
        if(firstOption) toReturn += html.userpic(firstOption);
        toReturn += "<select style=\"vertical-align: middle; width: 30%\">" + options + "</select>";
        if(firstOption) toReturn += html.change;
        toReturn += html.back;
        return toReturn;
    },
    suggestionsLoading: "<span>Please wait while the suggestions get generated...</span>",
    tr: mention => "<tr id=\"checky__row-" + mention + "\" style=\"height: 70px\"><td style=\"width: 15%\">" + mention + "</td><td>" + html.buttons + "</td></tr>",
    userpic: username => "<img class=\"Userpic\" src=\"https://steemitimages.com/u/" + username + "/avatar\" style=\"margin-right: 1rem\">"
}
const mentionRegex = /(^|[^\w=/#])@([a-z][a-z\d.-]*[a-z\d])/gimu; 

const elements = {};
let correctMentions = [];
let wrongMentions = [];

let checkPostTimeout;
let ignored;

chrome.runtime.onMessage.addListener(init);

chrome.storage.sync.get(['ignored'], storage => ignored = storage.ignored || []);

/**
 * Initializes the extension variables and DOM elements.
 */
function init() {
    elements.textarea = document.querySelector("textarea");
    document.getElementsByClassName("vframe")[0].lastElementChild.previousElementSibling.insertAdjacentHTML("beforebegin", html.base);
    elements.textarea.addEventListener("input", rescheduleCheckPost);
    elements.checkyDiv = document.getElementById("checky");
    elements.tbody = elements.checkyDiv.getElementsByTagName("tbody")[0];
    elements.tbody.addEventListener("click", changeRowContent);
    checkPost(elements.textarea.value);
}

/**
 * Sets an image element's src to the default profile picture.
 */
function setDefaultImage() {
    this.src = "https://steemitimages.com/u/null/avatar";
}

/**
 * Changes the content of the row in which a button has been clicked.
 * 
 * @param {MouseEvent} event An event representing the button click
 */
function changeRowContent(event) {
    const target = event.target;
    if(target.nodeName == "BUTTON") {
        const td = target.parentElement;
        switch(target.name.split("__")[1]) {
            case "replace":
                td.innerHTML = html.replace(td.previousElementSibling.innerText);
                td.getElementsByTagName("input")[0].addEventListener("input", changeUserPreview);
                td.getElementsByClassName("Userpic")[0].addEventListener("error", setDefaultImage);
                break;
            case "suggestions":
                td.innerHTML = html.suggestionsLoading;
                checker.suggestions(td.previousElementSibling.innerText, populateSuggestions, td);
                break;
            case "ignore":
                ignoreUsername(td.previousElementSibling.innerText);
                removeTableRow(td.parentElement);
                break;
            case "change":
                changeUsername(td.previousElementSibling.innerText, target.previousElementSibling.value);
                removeTableRow(td.parentElement);
                break;
            case "back":
                td.innerHTML = html.buttons;
                break;
            default:
                console.log("Wrong button name");
        }
    }
}

/**
 * Populates the suggestions select with valid usernames close to the wrong one.
 * 
 * @param {string[]} suggestions The valid usernames
 * @param {HTMLElement} td The td to insert to suggestions into
 */
function populateSuggestions(suggestions, td) {
    if(suggestions.length > 0) {
        let options = "";
        for(const suggestion of suggestions) {
            options += html.option(suggestion, false);
        }
        td.innerHTML = html.suggestions(options, suggestions[0]);
        td.getElementsByTagName("select")[0].addEventListener("change", changeUserPreview)
    } else {
        td.innerHTML = html.suggestions(html.option("No username found", true), null);
    }
}

/**
 * Removes a table row from the DOM.
 * 
 * @param {HTMLElement} tr The table row to remove
 */
function removeTableRow(tr) {
    if(!tr) {
        return;
    }
    tr.remove();
    if(!elements.tbody.hasChildNodes()) {
        elements.checkyDiv.style.display = "none";
    }
}

function changeUserPreview() {
    const td = this.parentElement;
    td.getElementsByClassName("Userpic")[0].src = "https://steemitimages.com/u/" + this.value + "/avatar";
}

/**
 * Ignores an username forever.
 * 
 * @param {string} username The username to ignore
 */
function ignoreUsername(username) {
    if(!ignored.includes(username)) {
        ignored.push(username);
        chrome.storage.sync.set({ignored: ignored});
    }
}

/**
 * Changes all occurences of an username in the textarea by a new username.
 * 
 * @param {string} username The username to change
 * @param {string} newUsername The new username
 */
function changeUsername(username, newUsername) {
    if(!/^[a-z][a-z\d.-]{1,}[a-z\d]$/i.test(newUsername)) {
        return;
    }
    const event = new Event("input", { bubbles: true });
    elements.textarea.value = elements.textarea.value.replace(new RegExp("@" + username + "(?![.-]?[a-z\\d])", "gi"), "@" + newUsername);
    elements.textarea.dispatchEvent(event);
}

/**
 * Reschedules the check of the post's mentions.
 */
function rescheduleCheckPost() {
    clearTimeout(checkPostTimeout);
    checkPostTimeout = setTimeout(checkPost, 100, this.value);
}

/**
 * Checks the post's mentions.
 * 
 * @param {string} post The post to check
 */
function checkPost(post) {
    let matches = post.match(mentionRegex) || [];
    // The first character check handles the case of matches such as "@@mention"
    matches = matches.map(mention => {
        const splits = mention.split("@");
        return (splits[2] || splits[1]).toLowerCase();
    });
    if(wrongMentions.length > 0) {
        wrongMentions = wrongMentions.filter(mention => {
            if(!matches.includes(mention)) {
                removeTableRow(document.getElementById("checky__row-" + mention));
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
        filterWrongUsernames(newMentions, insertTableRows)
    }
}

/**
 * Filters the usernames that don't exist on Steem from an array of usernames.
 * 
 * @param {string[]} usernames The usernames to filter
 * @param {function(string[])} callback A callback taking an array of wrong usernames as its argument
 */
function filterWrongUsernames(usernames, callback) {
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
}

/**
 * Inserts the rows associated to new wrong mentions in the extension's table.
 * 
 * @param {string[]} mentions The mentions to include in the rows
 */
function insertTableRows(mentions) {
    let toInsert = "";
    for(const mention of mentions) {
        toInsert += html.tr(mention);
    }
    elements.tbody.insertAdjacentHTML("beforeend", toInsert);
    elements.checkyDiv.style.display = "block";
}