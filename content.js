const pageObjects = {
    editor,
    settings
};

let elements;
let correctMentions = [];
let wrongMentions;

let ignored;

chrome.storage.sync.get(['ignored'], storage => ignored = storage.ignored || []);

chrome.runtime.onMessage.addListener(init);

function init(page) {
    elements = {};
    wrongMentions = [];
    pageObjects[page].init();
}