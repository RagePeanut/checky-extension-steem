const menu = {
    app: null,
    /**
     * @param {Event} event
     */
    changeLinkState: async (event) => {
        const target = event.target.tagName === "A" ? event.target : event.target.parentElement;
        const href = target.getAttribute("href");
        if(target.tagName === "A" && href !== "#" && target.getAttribute("target") !== "_blank") {
            if(href === "#checky-settings") {
                if(menu.app !== "steempeak") {
                    if(menu.hasBeenOnSettingsPage) {
                        elements.appContents.forEach(appContent => {
                            if(document.body.contains(appContent)) {
                                appContent.style.display = "none";
                            }
                        });
                        elements.checkyContents.forEach(checkyContent => {
                            if(document.body.contains(checkyContent)) {
                                checkyContent.style.display = "block";
                            }
                        });
                    }
                    const activeLink = specs.menu.getActiveLink(menu.app);
                    activeLink.className = "";
                    activeLink.parentElement.className = "";
                    elements.checkyLink.className = attr[menu.app].settingsLink.liClassActive;
                    elements.checkyLink.children[0].className = attr[menu.app].settingsLink.aClassActive;
                } else if (elements.checkyContents && document.contains(elements.checkyContents[0])) {
                    elements.checkyContents[0].remove();
                }
            } else if(menu.isOnSettingsPage) {
                elements.checkyContents.forEach(checkyContent => {
                    if(document.body.contains(checkyContent)) {
                        checkyContent.style.display = "none";
                    }
                });
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