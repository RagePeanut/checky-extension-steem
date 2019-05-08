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
    init: async (app, path, isOnSettingsPage) => {
        menu.init(app, path, isOnSettingsPage);
        if(isOnSettingsPage && (!elements.checkyContents || !elements.checkyContents[0] || app !== "steemit")) {
            settings.app = app;
            if(!elements.checkyContents || !document.body.contains(elements.checkyContents[0])) {
                if(elements.checkyContents && document.body.contains(elements.checkyContents[1])) {
                    elements.checkyContents[1].remove();
                }
                const {settingsLandmark, appContents} = await specs.settings.getInsertionLandmark(app);
                elements.appContents = appContents;
                elements.appContents.forEach(appContent => appContent.style.display = "none");
                settingsLandmark.insertAdjacentHTML("beforeend", html.baseSettings(sortingOrder, app));
                elements.settingsLandmark = settingsLandmark;
                const ignoredSettingLandmark = specs.settings.getIgnoredInsertionLandmark(app);
                ignoredSettingLandmark.insertAdjacentHTML("beforeend", html.baseSettingsIgnored(ignored.sort(), app));
            }
            attr[app].settingsLandmark.appClass = elements.settingsLandmark.className;
            elements.settingsLandmark.className = attr[menu.app].settingsLandmark.checkyClass;
            elements.checkyContents = [...document.getElementsByClassName("checky-content")];
            elements.checkyIgnoredForm = document.getElementById("checky__ignored");
            elements.checkyIgnoredForm.addEventListener("submit", settings.removeIgnored);
            elements.checkyIgnoredFormRemoveAll = document.getElementById("checky__ignored-removeAll");
            if(elements.checkyIgnoredFormRemoveAll) elements.checkyIgnoredFormRemoveAll.addEventListener("click", settings.removeAllIgnored);
            const authorizationCheckboxes = [...document.getElementsByClassName("checky__authorization-checkbox") || []];
            authorizationCheckboxes.forEach(checkbox => {
                checkbox.addEventListener("click", () => {
                    if(event.target.tagName === "INPUT") {
                        if(event.target.checked) {
                            event.target.parentElement.parentElement.classList.add("ant-radio-button-wrapper-checked");
                        } else {
                            event.target.parentElement.parentElement.classList.remove("ant-radio-button-wrapper-checked");
                        }
                    }
                });
            });
        }
    }
}