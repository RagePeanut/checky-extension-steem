const specs = {
    editor: {
        getInsertionLandmark: async app => {
            switch(app) {
                case "busy":
                    return document.getElementsByClassName("Editor__bottom")[0];
                case "steemit":
                    return document.getElementsByClassName("vframe")[0].lastElementChild.previousElementSibling;
                case "steempeak":
                    let panelFooter;
                    while(!panelFooter) {
                        await sleep(100);
                        panelFooter = document.getElementsByClassName("panel-footer")[0];
                    }
                    return panelFooter;
            }
        }
    },
    menu: {
        getActiveLink: app => {
            switch(app) {
                case "busy":
                    return document.getElementsByClassName("Sidenav__item--active")[0];
                case "steemit":
                    return document.querySelector(".UserProfile a.active");
                case "steempeak":
                    return document.querySelector("li.active > a");
            }
        },
        getInsertionLandmarkAndMenu: async app => {
            let linkLandmark, appMenu;
            switch(app) {
                case "busy":
                    linkLandmark = document.getElementsByClassName("Sidenav")[0];
                    return {linkLandmark, appMenu: linkLandmark};
                case "steemit":
                    linkLandmark = document.querySelector(".UserProfile__top-menu > .columns.shrink > ul");
                    appMenu = document.getElementsByClassName("UserProfile__top-menu")[0];
                    return {linkLandmark, appMenu};
                case "steempeak":
                    while(!document.body.contains(linkLandmark)) {
                        await sleep(1);
                        linkLandmark = document.getElementsByClassName("nav-tabs")[0];
                    }
                    return {linkLandmark, appMenu: linkLandmark};
            }
        }
    },
    settings: {
        getIgnoredInsertionLandmark: app => {
            switch(app) {
                case "busy":
                    return;
                case "steemit":
                    return;
                case "steempeak":
                    return document.getElementsByClassName("col-lg-offset-3 col-lg-6")[0];
            }
        },
        getInsertionLandmark: async app => {
            let settingsLandmark;
            const appContents = [];
            switch(app) {
                case "busy":
                    settingsLandmark = document.getElementsByClassName("container")[0];
                    while(!appContents[0]) {
                        await sleep(100);
                        appContents[0] = settingsLandmark.getElementsByClassName("center")[0];
                    }
                    const rightContainer = document.getElementsByClassName("rightContainer")[0];
                    if(rightContainer) appContents.push(rightContainer);
                    return {settingsLandmark, appContents};
                case "steemit":
                    settingsLandmark = document.getElementsByClassName("UserProfile__tab_content")[0];
                    appContents.push(settingsLandmark.children[0]);
                    return {settingsLandmark, appContents};
                case "steempeak":
                    while(!appContents[0]) {
                        await sleep(100);
                        appContents[0] = document.getElementsByClassName("tab-pane")[0];
                    }
                    const saveSettings = document.getElementsByClassName("pb-20")[0];
                    if(saveSettings) appContents.push(saveSettings);
                    [...document.getElementsByClassName("panel")].slice(1).forEach(panel => {
                        if(!panel.classList.contains("checky-content")) {
                            appContents.push(panel);
                        }
                    });
                    return {
                        settingsLandmark: appContents[0].parentElement,
                        appContents
                    };
            }
        },
        getUsername: async app => {
            switch(app) {
                case "busy":
                    return document.getElementsByClassName("Topnav__user")[0].getAttribute("href").slice(2);
                case "steemit":
                    return document.querySelector(".Header__userpic > span").getAttribute("title");
                case "steempeak":
                    let usernameElt;
                    while(!usernameElt) {
                        await sleep(1);
                        usernameElt = document.getElementsByClassName("avatar-name")[0];
                    }
                    return usernameElt.innerText;
            }
        }
    }
}

/**
 * Sleeps for `ms` milliseconds.
 * 
 * @param {number} ms The milliseconds to sleep
 */
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}