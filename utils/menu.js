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
                    elements.appContent.style.display = "block";
                    elements.checkyLink.className = "";
                    elements.checkyLink.children[0].className = "";
                    target.parentElement.className = attr[menu.app].settingsLink.liClassActive;
                    target.className = attr[menu.app].settingsLink.aClassActive;
                }
            } else if(target.innerText.toLowerCase() === "checky") {
                if(menu.app !== "steempeak") {
                    if(menu.hasBeenOnSettingsPage) {
                        elements.appContent.style.display = "none";
                        elements.checkyContent.style.display = "block";
                    }
                    const activeLink = document.querySelector(attr[menu.app].menuLink.selector);
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
        menu.hasBeenOnSettingsPage = menu.hasBeenOnSettingsPage || isOnSettingsPage;
        if(!document.body.contains(elements.checkyLink) || app === "steempeak" && isOnSettingsPage) {
            menu.app = app;
            if(!document.body.contains(elements.checkyLink)) {
                const {linkLandmark, appMenu} = await specs.menu.getInsertionLandmarkAndMenu(app);
                linkLandmark.insertAdjacentHTML("beforeend", html.settingsLink(app));
                elements.appMenu = appMenu;
                elements.appMenu.addEventListener("click", menu.changeLinkState);
            }
            elements.checkyLink = document.getElementById("checky__link");
            if(isOnSettingsPage) {
                const activeLink = document.querySelector(attr[app].menuLink.selector);
                activeLink.className = "";
                activeLink.parentElement.className = "";
                elements.checkyLink.className = attr[app].settingsLink.liClassActive;
                elements.checkyLink.children[0].className = attr[app].settingsLink.aClassActive;
            }
        }
    },
    hasBeenOnSettingsPage: false,
    isOnSettingsPage: false,
    path: null
};