const settings = {
    app: null,
    changeCheckboxClass: checkbox => {
        if(settings.app === "busy") {
            if(checkbox.checked) {
                checkbox.parentElement.parentElement.classList.add("ant-radio-button-wrapper-checked");
            } else {
                checkbox.parentElement.parentElement.classList.remove("ant-radio-button-wrapper-checked");
            }
        }
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
            document.getElementById("checky__save-settings").addEventListener("click", settings.saveSettings);
            elements.authorizationCheckboxes = [...document.getElementsByClassName("checky__authorization-checkbox") || []];
            elements.authorizationCheckboxes.forEach(checkbox => checkbox.addEventListener("change", () => {
                if(event.target.checked || elements.authorizationCheckboxes.some(checkbox => checkbox.checked)) {
                    if(settings.app === "busy") settings.changeCheckboxClass(event.target);
                } else {
                    event.target.checked = true;
                    event.target.click();
                }
            }));
        }
    },
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
     * Saves the settings.
     */
    saveSettings: () => {
        const order = document.getElementById("checky__sorting-order").value;
        settings.setSortingOrder(order);
        settings.setAuthorizedApps();
        settings.setCaseSensitivity();
    },
    /**
     * Sets the apps that Checky can operate on.
     */
    setAuthorizedApps: () => {
        elements.authorizationCheckboxes.forEach(checkbox => authorizations[checkbox.name.split("__")[1]] = checkbox.checked);
        chrome.storage.sync.set({authorizations: authorizations});
    },
    /**
     * Sets the case sensitivity for the mention checker.
     */
    setCaseSensitivity: () => {
        isCaseSensitive = document.getElementById("checky__case-sensitivity").checked;
        chrome.storage.sync.set({isCaseSensitive: isCaseSensitive});
    },
    /**
     * Sets the suggestions sorting order.
     */
    setSortingOrder: order => {
        sortingOrder = order;
        chrome.storage.sync.set({sortingOrder: sortingOrder});
    }
}