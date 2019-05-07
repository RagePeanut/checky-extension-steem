const menu = {
    app: null,
    /**
     * @param {Event} event
     */
    changeLinkState: async (event) => {
        const target = event.target.getAttribute("href") ? event.target : event.target.parentElement;
        if(target.innerText !== "Rewards" && target.getAttribute("target") !== "_blank") {
            if(menu.isOnSettingsPage) {
                if(target.innerText !== "Checky" && !/\n/.test(target.innerText)) {
                    elements.checkyContent.style.display = "none";
                    elements.appContents.forEach(appContent => {
                        if(document.body.contains(appContent)) {
                            appContent.style.display = "block";
                        }
                    });
                    elements.settingsLandmark.className = attr[menu.app].settingsLandmark.appClass;
                    elements.checkyLink.className = "";
                    elements.checkyLink.children[0].className = "";
                    target.parentElement.className = attr[menu.app].settingsLink.liClassActive;
                    target.className = attr[menu.app].settingsLink.aClassActive;
                }
            } else if(target.innerText.toLowerCase() === "checky") {
                if(menu.app !== "steempeak") {
                    if(menu.hasBeenOnSettingsPage) {
                        elements.appContents.forEach(appContent => {
                            if(document.body.contains(appContent)) {
                                appContent.style.display = "none";
                            }
                        });
                        elements.checkyContent.style.display = "block";
                    }
                    const activeLink = specs.menu.getActiveLink(menu.app);
                    activeLink.className = "";
                    activeLink.parentElement.className = "";
                    elements.checkyLink.className = attr[menu.app].settingsLink.liClassActive;
                    elements.checkyLink.children[0].className = attr[menu.app].settingsLink.aClassActive;
                } else if (document.contains(elements.checkyContent)) {
                    elements.checkyContent.remove();
                }
            }
        }
    },
    init: async (app, path, isOnSettingsPage) => {
        menu.path = path;
        menu.isOnSettingsPage = isOnSettingsPage;
        if((app === "busy" || path.includes("@" + await specs.settings.getUsername(app)))
            && (!document.body.contains(elements.checkyLink) || app === "steempeak" && isOnSettingsPage)) {
            menu.app = app;
            if(!document.body.contains(elements.checkyLink)) {
                const {linkLandmark, appMenu} = await specs.menu.getInsertionLandmarkAndMenu(app);
                linkLandmark.insertAdjacentHTML("beforeend", html.settingsLink(app));
                elements.appMenu = appMenu;
                elements.appMenu.addEventListener("click", menu.changeLinkState);
            }
            elements.checkyLink = document.getElementById("checky__link");
            if(isOnSettingsPage) {
                const activeLink = specs.menu.getActiveLink(app);
                activeLink.className = "";
                activeLink.parentElement.className = "";
                elements.checkyLink.className = attr[app].settingsLink.liClassActive;
                elements.checkyLink.children[0].className = attr[app].settingsLink.aClassActive;
            }
        }
        menu.hasBeenOnSettingsPage = menu.hasBeenOnSettingsPage || isOnSettingsPage;
    },
    hasBeenOnSettingsPage: false,
    isOnSettingsPage: false,
    path: null
};