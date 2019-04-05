chrome.tabs.onUpdated.addListener(urlUpdated);

/**
 * Sends a message to the content scripts if the page is ready to be edited.
 * 
 * @param {number} tabId The tab id
 * @param {object} changeInfo The changes to the state of the tab that was updated
 * @param {object} tab The state of the tab that was updated.
 */
function urlUpdated(tabId, changeInfo, tab) {
    if(tab.status == "complete" && !changeInfo.favIconUrl) {
        if(tab.url == "https://steemit.com/submit.html" && tab.title == "Create a post — Steemit") {
            chrome.tabs.sendMessage(tabId, "editor");
        } else if(/https:\/\/steemit\.com\/@[a-z\d.-]{3,16}\/settings/.test(tab.url) && /.* \(@[a-z\d.-]{3,16}\) — Steemit/.test(tab.title)) {
            chrome.tabs.sendMessage(tabId, "settings");
        }
    }
}