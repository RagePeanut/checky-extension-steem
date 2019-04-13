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
        elements = currentPage === data.page ? elements : {};
        wrongMentions = currentPage === data.page ? wrongMentions : [];
        pageObjects[data.page].init(data.app);
    }
    currentPage = data.page;
}