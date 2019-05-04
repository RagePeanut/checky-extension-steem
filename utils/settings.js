const settings = {
    app: null,
    /**
     * Removes the checked ignored usernames.
     * 
     * @param {Event} event
     */
    removeIgnored: event => {
        event.preventDefault();
        let inputs = event.target.elements["checky__ignored[]"];
        if(!inputs.length) inputs = [inputs];
        for(let i = inputs.length - 1; i >= 0; i--) {
            if(inputs[i].checked) {
                ignored = ignored.filter(username => username !== inputs[i].value);
                document.getElementById("checky__ignored-" + inputs[i].value).remove();
            }
        }
        if(ignored.length === 0) elements.checkyIgnoredForm.innerHTML = html.noIgnored;
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
    init: async app => {
        if(!elements.checkySettings) {
            editor.app = app;
            const baseSettings = html.baseSettings(ignored.sort(), app);
            (await specs.settings.getInsertionLandmark(app)).insertAdjacentHTML("beforeend", baseSettings);
            elements.checkySettings = document.getElementById("checky");
            elements.checkyIgnoredForm = document.getElementById("checky__ignored");
            elements.checkyIgnoredForm.addEventListener("submit", settings.removeIgnored);
            elements.checkyIgnoredFormRemoveAll = document.getElementById("checky__ignored-removeAll");
            if(elements.checkyIgnoredFormRemoveAll) elements.checkyIgnoredFormRemoveAll.addEventListener("click", settings.removeAllIgnored);
        }
    }
}