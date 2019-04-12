const specs = {
    editor: {
        getInsertionLandmark: app => {
            switch(app) {
                case "busy":
                    return document.getElementsByClassName("Editor__bottom")[0];
                case "steemit":
                    return document.getElementsByClassName("vframe")[0].lastElementChild.previousElementSibling;
            }
        }
    },
    settings: {
        getInsertionLandmark: app => {
            switch(app) {
                case "busy":
                    return document.getElementsByClassName("Loading")[0];
                case "steemit":
                    return document.getElementsByClassName("Settings")[0];
            }
        }
    }
}