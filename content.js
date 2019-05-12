const pageObjects = {
    editor,
    settings
};

let currentPage;
let elements;
let correctMentions = [];
let wrongMentions;

let authorizations, ignored, sortingOrder, isCaseSensitive;

chrome.runtime.onMessage.addListener(init);

async function init(data) {
    if(!authorizations) {
        await getStorageData();
    }
    if(authorizations[data.app]) {
        if(data.page === "other") {
            elements = {};
            wrongMentions = [];
            menu.hasBeenOnSettingsPage = false;
        } else {
            elements = currentPage === data.page || currentPage === "settings" && data.page === "menu" || currentPage === "menu" && data.page === "settings" ? elements : {};
            wrongMentions = currentPage === data.page ? wrongMentions : [];
            const page = data.page === "menu" ? "settings" : data.page;
            pageObjects[page].init(data.app, data.path, data.page === "settings");
        }
        currentPage = data.page;
    }
}

function getStorageData() {
    return new Promise(resolve => {
        chrome.storage.sync.get(["ignored", "authorizations", "sortingOrder", "isCaseSensitive"], storage => {
            storage = storage || {};
            ignored = storage.ignored || [];
            authorizations = storage.authorizations || {
                busy: true,
                steemit: true,
                steempeak: true
            };
            sortingOrder = storage.sortingOrder || "alphabetical+";
            isCaseSensitive = storage.isCaseSensitive || false;
            resolve();
        });
    });
}