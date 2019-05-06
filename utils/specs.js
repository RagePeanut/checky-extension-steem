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
        getInsertionLandmark: async app => {
            let settingsLandmark, appContent;
            switch(app) {
                case "busy":
                    settingsLandmark = document.getElementsByClassName("container")[0];
                    while(!appContent) {
                        await sleep(100);
                        appContent = settingsLandmark.getElementsByClassName("center")[0];
                    }
                    const rightContainer = document.getElementsByClassName("rightContainer")[0];
                    if(rightContainer) rightContainer.style.display = "none";
                    settingsLandmark.className = "settings-layout container";
                    return {settingsLandmark, appContent};
                case "steemit":
                    settingsLandmark = document.getElementsByClassName("UserProfile__tab_content")[0];
                    appContent = settingsLandmark.children[0];
                    return {settingsLandmark, appContent};
                case "steempeak":
                    while(!appContent) {
                        await sleep(100);
                        appContent = appContent || document.getElementsByClassName("tab-pane")[0];
                    }
                    const saveSettings = document.getElementsByClassName("pb-20")[0];
                    if(saveSettings) saveSettings.remove();
                    [...document.getElementsByClassName("panel")].slice(1).forEach(panel => panel.remove());
                    return {
                        settingsLandmark: appContent.parentElement,
                        appContent
                    };
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