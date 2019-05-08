const pageObjects = {
    editor,
    settings
};

let currentPage;
let elements;
let correctMentions = [];
let wrongMentions;

let authorizations, ignored, sortingOrder;

chrome.storage.sync.get(["ignored", "authorizations", "sortingOrder"], storage => {
    ignored = storage.ignored || [];
    authorizations = storage.authorizations || {
        busy: true,
        steemit: true,
        steempeak: true
    };
    sortingOrder = storage.sortingOrder || "alphabetical+";
});

chrome.runtime.onMessage.addListener(init);

function init(data) {
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