chrome.tabs.onUpdated.addListener(urlUpdated);

/**
 * Sends a message to the content scripts if the page is ready to be edited.
 * 
 * @param {number} tabId The tab id
 * @param {object} _changeInfo The changes to the state of the tab that was updated
 * @param {object} tab The state of the tab that was updated.
 */
function urlUpdated(tabId, _changeInfo, tab) {
    if(tab.status == "complete" && tab.url == "https://steemit.com/submit.html" && tab.title == "Create a post — Steemit") {
        chrome.tabs.sendMessage(tabId, tab);
    }
}