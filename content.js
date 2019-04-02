const mentionRegex = /(^|[^\w=/#])@([a-z][a-z\d.-]{1,16}[a-z\d])([\w(]|\.[a-z])?/gimu; 

let checkPostTimeout;
let tbody;

chrome.runtime.onMessage.addListener(insertMarkups);

/**
 * Inserts the base markups added by the extension to post submitters pages.
 */
function insertMarkups() {
    document.querySelector("textarea").addEventListener("input", resetCheckPostTimeout);
    const toInsert = '<div id="checky" class="vframe__section--shrink">'
            + "<div>"
                + "<h6>Possibly wrong mentions</h6>"
                + "<table>"
                    + "<thead>"
                        + "<th>Mention</th>"
                        + "<th>Suggestion</th>"
                    + "</thead>"
                    + "<tbody></tbody>"
                + "</table>"
            + "</div>"
        + '</div>';
    document.getElementsByClassName("vframe")[0].lastElementChild.previousElementSibling.insertAdjacentHTML("beforebegin", toInsert);
    tbody = document.querySelector("#checky tbody");
}

/**
 * Resets the timeout to check the post's mentions.
 */
function resetCheckPostTimeout() {
    clearTimeout(checkPostTimeout);
    checkPostTimeout = setTimeout(checkPost, 5000, this.value);
}

/**
 * Checks the post's mentions.
 * 
 * @param {string} post The post to check
 */
function checkPost(post) {
    const matches = post.match(mentionRegex);
    if(matches != null) {
        const wrongMentions = matches.map(mention => mention.substring(2))
                                     .filter(mention => !isExistingUsername(mention));
        insertTableRows(wrongMentions);
    }
}

/**
 * Checks if the username exists on Steem.
 * 
 * @param {string} username The username to check
 */
function isExistingUsername(username) {
    // TODO: check with steemjs if a user has the given username
    return false;
}

/**
 * Inserts the rows associated to wrong mentions in the extension's table.
 * 
 * @param {string[]} mentions The mentions to include in the rows
 */
function insertTableRows(mentions) {
    if(tbody == null) {
        return;
    }
    for(const mention of mentions) {
        const toInsert = "<tr><td>" + mention + "</td><td></td></tr>";
        tbody.insertAdjacentHTML("beforeend", toInsert);
    }
}