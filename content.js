const mentionRegex = /(^|[^\w=/#])@([a-z][a-z\d.-]{1,16}[a-z\d])([\w(]|\.[a-z])?/gimu; 

let checkPostTimeout;
let checkyDiv;
let tbody;

chrome.runtime.onMessage.addListener(insertMarkups);

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
    checkPostTimeout = setTimeout(checkPost, 1000, textarea.value);
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
}

/**
 * Filters the usernames that don't exist on Steem from an array of usernames.
 * 
 * @param {string[]} username The usernames to filter
 */
function filterWrongUsernames(usernames, callback) {
    steem.api.lookupAccountNames(usernames, (err, resp) => {
        if(err) {
            console.log(err);
            return;
        }
        const correctUsernames = resp.filter(user => user != null).map(user => user.name);
        const wrongUsernames = usernames.filter(username => !correctUsernames.includes(username));
        callback(wrongUsernames);
    });
}

/**
 * Inserts the rows associated to wrong mentions in the extension's table.
 * 
 * @param {string[]} mentions The mentions to include in the rows
 */
function insertTableRows(mentions) {
    if(checkyDiv == null) {
        console.log("The table hasn't been inserted yet");
        return;
    }
    const buttons = "<button name=\"checky__replace\" class=\"button\" style=\"margin-bottom: 0; font-size: 1rem\"><span>Replace</span></button>"
        + "<button class=\"button hollow no-border\" style=\"margin-bottom: 0\">Ignore</button>";
    let toInsert = "";
    for(const mention of mentions) {
        toInsert += "<tr><td>" + mention + "</td><td id=\"checky__" + mention + "-actions\">" + buttons + "</td></tr>";
        tbody.innerHTML = toInsert;
    }
    checkyDiv.style.display = "block";
}