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
            app: (tab.url.match(/\/\/(?:staging\.)?([a-z]+)/) || [])[1],
            path: (new URL(tab.url)).pathname
        };
        if(!/^(busy|steemit|steempeak)$/.test(data.app)) return;
        if(tab.url === "https://steemit.com/submit.html"
                || tab.url === "https://steempeak.com/publish"
                || /https:\/\/(staging\.)?busy.org\/editor/.test(tab.url)) {
            data.page = "editor";
        } else if(/#checky-settings/.test(tab.url)) {
            data.page = "settings";
        } else if(/https:\/\/(staging\.)?busy.org\/(activity|bookmarks|drafts|edit-profile|invite|settings)/.test(tab.url)
                || data.app === "steemit" && /\/@[a-z\d.-]+(\/(comments|recent-replies|settings))?$/.test(tab.url)
                || data.app === "steempeak" && /\/@[a-z\d.-]+\/settings\/[a-z\d.-]/.test(tab.url)) {
            data.page = "menu";
        } else {
            data.page = "other";
        }
        chrome.tabs.sendMessage(tabId, data);
    }
}