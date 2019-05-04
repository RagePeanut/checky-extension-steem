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
            switch(app) {
                case "steemit":
                    const linkLandmark = document.querySelector(".UserProfile__top-menu > .columns.shrink > ul");
                    const appMenu = document.getElementsByClassName("UserProfile__top-menu")[0];
                    return {linkLandmark, appMenu};
            }
        }
    },
    settings: {
        getInsertionLandmark: async app => {
            switch(app) {
                case "busy":
                    let settingsElt;
                    while(!settingsElt) {
                        await sleep(100);
                        settingsElt = document.getElementsByClassName("Settings")[0];
                    }
                    return settingsElt.parentElement;
                case "steemit":
                    return document.getElementsByClassName("UserProfile__tab_content")[0];
                case "steempeak":
                    let panel;
                    while(!panel) {
                        await sleep(100);
                        panel = document.getElementsByClassName("panel")[0];
                    }
                    return panel.parentElement;
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