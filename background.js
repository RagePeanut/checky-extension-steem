chrome.tabs.onUpdated.addListener(urlUpdated);

/**
 * Sends a message to the content scripts if the page is ready to be edited.
 * 
 * @param {number} tabId The tab id
 * @param {object} changeInfo The changes to the state of the tab that was updated
 * @param {object} tab The state of the tab that was updated.
 */
function urlUpdated(tabId, changeInfo, tab) {
    if(changeInfo.status === "complete") {
        const data = {
            app: tab.url.match(/\/\/(?:staging\.)?([a-z]+)/)[1]
        };
        switch(true) {
            case tab.url === "https://steemit.com/submit.html":
            case /https:\/\/(staging\.)?busy.org\/editor/.test(tab.url):
                data.page = "editor";
                chrome.tabs.sendMessage(tabId, data);
                break;
            case /\/settings$/.test(tab.url):
                data.page = "settings";
                chrome.tabs.sendMessage(tabId, data);
                break;
            default:
                data.page = "other";
                chrome.tabs.sendMessage(tabId, data);
                break;
        }
    }
}