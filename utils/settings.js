const settings = {
    app: null,
    /**
     * Removes the checked ignored usernames.
     * 
     * @param {Event} event
     */
    removeIgnored: event => {
        event.preventDefault();
        const inputs = event.target.elements["checky__ignored[]"];
        for(let i = inputs.length - 1; i >= 0; i--) {
            if(inputs[i].checked) {
                ignored = ignored.filter(username => username !== inputs[i].value);
                inputs[i].parentElement.remove();
            }
        }
        chrome.storage.sync.set({ignored: ignored});
    },
    /**
     * Removes all ignored usernames.
     */
    removeAllIgnored: () => {
        ignored = [];
        chrome.storage.sync.set({ignored: ignored});
        elements.checkyIgnoredForm.innerHTML = html.ignoredAll(ignored, editor.app);
    },
    /**
     * Initializes the extension settings variables and DOM elements.
     */
    init: app => {
        editor.app = app;
        const baseSettings = html.baseSettings(ignored.sort(), app);
        specs.settings.getInsertionLandmark(app).insertAdjacentHTML("beforeend", baseSettings);
        elements.checkySettings = document.getElementById("checky");
        elements.checkyIgnoredForm = document.getElementById("checky__ignored");
        elements.checkyIgnoredForm.addEventListener("submit", settings.removeIgnored);
        elements.checkyIgnoredFormRemoveAll = document.getElementById("checky__ignored-removeAll");
        if(elements.checkyIgnoredFormRemoveAll) elements.checkyIgnoredFormRemoveAll.addEventListener("click", settings.removeAllIgnored);
    }
}