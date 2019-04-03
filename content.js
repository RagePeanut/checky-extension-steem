const mentionRegex = /(^|[^\w=/#])@([a-z][a-z\d.-]*[a-z\d])/gimu; 

const elements = {};

let checkPostTimeout;
let ignored;

chrome.runtime.onMessage.addListener(insertMarkups);

chrome.storage.sync.get(['ignored'], storage => ignored = storage.ignored || []);

/**
 * Inserts the base markups added by the extension to post submitters pages.
 */
function insertMarkups() {
    elements.textarea = document.querySelector("textarea");
    elements.textarea.addEventListener("input", resetCheckPostTimeout);
    const toInsert = "<div id=\"checky\" class=\"vframe__section--shrink\" style=\"display: none\">"
            + "<h6>Possibly wrong mentions</h6>"
            + "<table>"
                + "<thead>"
                    + "<th>Mention</th>"
                    + "<th>Actions</th>"
                + "</thead>"
                + "<tbody></tbody>"
            + "</table>"
        + "</div>";
    document.getElementsByClassName("vframe")[0].lastElementChild.previousElementSibling.insertAdjacentHTML("beforebegin", toInsert);
    elements.checkyDiv = document.getElementById("checky");
    elements.tbody = elements.checkyDiv.getElementsByTagName("tbody")[0];
    elements.tbody.addEventListener("click", changeRowContent);
    checkPost(elements.textarea.value);
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
                const newContent = "<input pattern=\"[A-Za-z][A-Za-z\\d.-]{1,}[A-Za-z\d]\" title=\"This username isn't valid.\" type=\"text\" style=\"display: inline-block; vertical-align: middle; width: 60%\" placeholder=\"Type what you want to replace " + td.previousElementSibling.innerText + " by here.\" required>"
                    + "<button name=\"checky__change\" class=\"button\" style=\"margin-left: 1rem; margin-bottom: 0; font-size: 1rem\">Change</button>"
                    + "<button name=\"checky__back\" class=\"button hollow no-border\" style=\"margin-bottom: 0\">Back</button>";
                td.innerHTML = newContent;
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
                const buttons = "<button name=\"checky__replace\" class=\"button\" style=\"margin-bottom: 0; font-size: 1rem\">Replace</button>"
                    + "<button name=\"checky__ignore\" class=\"button hollow no-border\" style=\"margin-bottom: 0\">Ignore</button>";
                td.innerHTML = buttons;
                break;
            default:
                console.log("Wrong button name");
        }
    }
}

/**
 * Removes a table row from the DOM.
 * 
 * @param {HTMLElement} tr The table row to remove
 */
function removeTableRow(tr) {
    tr.remove();
    if(!elements.tbody.hasChildNodes()) {
        elements.checkyDiv.style.display = "none";
    }
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
 * Resets the timeout to check the post's mentions.
 */
function resetCheckPostTimeout() {
    clearTimeout(checkPostTimeout);
    checkPostTimeout = setTimeout(checkPost, 60000, this.value);
}

/**
 * Checks the post's mentions.
 * 
 * @param {string} post The post to check
 */
function checkPost(post) {
    let matches = post.match(mentionRegex);
    if(matches != null) {
        // The first character check handles the case of matches such as "@@mention"
        matches = matches.map(mention => {
            const splits = mention.split("@");
            return (splits[2] || splits[1]).toLowerCase();
        });
        filterWrongUsernames(matches, insertTableRows)
    } else {
        elements.tbody.innerHTML = "";
        elements.checkyDiv.style.display = "none";
    }
}

/**
 * Filters the usernames that don't exist on Steem from an array of usernames.
 * 
 * @param {string[]} username The usernames to filter
 * @param {function(string[])} callback A callback taking an array of wrong usernames as its argument
 */
function filterWrongUsernames(usernames, callback) {
    steem.api.lookupAccountNames(usernames, (err, resp) => {
        if(err) {
            console.log(err);
            return;
        }
        const correctUsernames = resp.filter(user => user != null).map(user => user.name);
        const wrongUsernames = usernames.filter(username => !correctUsernames.includes(username) && !ignored.includes(username));
        if(wrongUsernames.length > 0) {
            const uniqWrongUsernames = [];
            for(let i = 0; i < wrongUsernames.length; i++) {
                if(!uniqWrongUsernames.includes(wrongUsernames[i])) {
                    uniqWrongUsernames.push(wrongUsernames[i]);
                }
            }
            callback(uniqWrongUsernames);
        } else {
            elements.tbody.innerHTML = "";
            elements.checkyDiv.style.display = "none";
        }
    });
}

/**
 * Inserts the rows associated to wrong mentions in the extension's table.
 * 
 * @param {string[]} mentions The mentions to include in the rows
 */
function insertTableRows(mentions) {
    const buttons = "<button name=\"checky__replace\" class=\"button\" style=\"margin-bottom: 0; font-size: 1rem\">Replace</button>"
        + "<button name=\"checky__ignore\" class=\"button hollow no-border\" style=\"margin-bottom: 0\">Ignore</button>";
    let toInsert = "";
    for(const mention of mentions) {
        toInsert += "<tr id=\"checky__row-" + mention + "\"><td>" + mention + "</td><td>" + buttons + "</td></tr>";
        elements.tbody.innerHTML = toInsert;
    }
    elements.checkyDiv.style.display = "block";
}