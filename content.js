const mentionRegex = /(^|[^\w=/#])@([a-z][a-z\d.-]*[a-z\d])([\w(]|\.[a-z])?/gimu; 

let checkPostTimeout;
let checkyDiv;
let tbody;
let ignored;

chrome.runtime.onMessage.addListener(insertMarkups);

chrome.storage.sync.get(['ignored'], storage => ignored = storage.ignored || []);

/**
 * Inserts the base markups added by the extension to post submitters pages.
 */
function insertMarkups() {
    const textarea = document.querySelector("textarea");
    textarea.addEventListener("input", resetCheckPostTimeout);
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
    checkyDiv = document.getElementById("checky");
    tbody = checkyDiv.getElementsByTagName("tbody")[0];
    tbody.addEventListener("click", changeRowContent);
    checkPost(textarea.value);
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
                break;
            case "ignore":
                ignoreUsername(td.previousElementSibling.innerText);
                td.parentElement.remove();
                if(!tbody.hasChildNodes()) {
                    checkyDiv.style.display = "none";
                }
                break;
            default:
                console.log("Wrong button name");
        }
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
 * Resets the timeout to check the post's mentions.
 */
function resetCheckPostTimeout() {
    clearTimeout(checkPostTimeout);
    checkPostTimeout = setTimeout(checkPost, 1000, this.value);
}

/**
 * Checks the post's mentions.
 * 
 * @param {string} post The post to check
 */
function checkPost(post) {
    let matches = post.match(mentionRegex);
    if(matches != null) {
        matches = matches.map(mention => mention.split("@")[1]);
        filterWrongUsernames(matches, insertTableRows)
    }
    tbody.innerHTML = "";
    checkyDiv.style.display = "none";
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
            callback(wrongUsernames);
        } else {
            tbody.innerHTML = "";
            checkyDiv.style.display = "none";
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
        tbody.innerHTML = toInsert;
    }
    checkyDiv.style.display = "block";
}