const menu = {
    app: null,
    /**
     * @param {Event} event
     */
    changeLinkState: async (event) => {
        if(event.target.innerText !== "Rewards" && event.target.getAttribute("target") !== "_blank") {
            if(menu.isOnSettingsPage) {
                if(event.target.innerText !== "Checky" && !/\n/.test(event.target.innerText)) {
                    elements.checkyContent.style.display = "none";
                    elements.appContent.style.display = "block";
                    elements.checkyLink.className = "";
                    elements.checkyLink.children[0].className = "";
                    event.target.parentElement.className = attr[menu.app].settingsLink.liClassActive;
                    event.target.className = attr[menu.app].settingsLink.aClassActive;
                }
            } else if(event.target.innerText.toLowerCase() === "checky") {
                if(menu.app === "steemit") {
                    if(menu.hasBeenOnSettingsPage) {
                        elements.appContent.style.display = "none";
                        elements.checkyContent.style.display = "block";
                    }
                    const currentPageLink = document.querySelector("a.active");
                    currentPageLink.className = "";
                    currentPageLink.parentElement.className = "";
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
                document.querySelector(attr[app].menuLink.selector(path)).className = "";
                elements.checkyLink.className = attr[app].settingsLink.liClassActive;
                elements.checkyLink.children[0].className = attr[app].settingsLink.aClassActive;
            }
        }
    },
    hasBeenOnSettingsPage: false,
    isOnSettingsPage: false,
    path: null
};