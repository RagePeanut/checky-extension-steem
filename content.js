const pageObjects = {
    editor,
    settings
};

let currentPage;
let elements;
let correctMentions = [];
let wrongMentions;

let ignored;

chrome.storage.sync.get(['ignored'], storage => ignored = storage.ignored || []);

chrome.runtime.onMessage.addListener(init);

function init(data) {
    if(data.page === "other") {
        elements = {};
        wrongMentions = [];
    } else {
        elements = currentPage === data.page || currentPage === "settings" && data.page === "menu" || currentPage === "menu" && data.page === "settings" ? elements : {};
        wrongMentions = currentPage === data.page ? wrongMentions : [];
        const page = data.page === "menu" ? "settings" : data.page;
        pageObjects[page].init(data.app, data.path, data.page === "settings");
    }
    currentPage = data.page;
}