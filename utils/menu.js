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
            } else if(event.target.innerText === "Checky") {
                await settings.init(menu.app, menu.path, true);
                elements.appContent.style.display = "none";
                elements.checkyContent.style.display = "block";
                const currentPageLink = document.querySelector("a.active");
                currentPageLink.className = "";
                currentPageLink.parentElement.className = "";
                elements.checkyLink.className = attr[menu.app].settingsLink.liClassActive;
                elements.checkyLink.children[0].className = attr[menu.app].settingsLink.aClassActive;
            }
        }
    },
    init: async (app, path, isOnSettingsPage) => {
        menu.path = path;
        menu.isOnSettingsPage = isOnSettingsPage;
        if(!elements.checkyLink) {
            menu.app = app;
            const {linkLandmark, appMenu} = await specs.menu.getInsertionLandmarkAndMenu(app);
            linkLandmark.insertAdjacentHTML("beforeend", html.settingsLink(app, isOnSettingsPage));
            if(isOnSettingsPage) document.querySelector(".UserProfile a[href=\"" + path + "\"]").className = "";
            elements.checkyLink = document.getElementById("checky__link");
            elements.appMenu = appMenu;
            elements.appMenu.addEventListener("click", menu.changeLinkState);
        }
    },
    isOnSettingsPage: false,
    path: null
};