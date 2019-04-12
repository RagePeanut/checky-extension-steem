const attr = {
    busy: {
        baseEditor: {
            begin: 
                "<div id=\"checky\" class=\"ant-row ant-form-item\" style=\"display: none\">"
                    + "<div class=\"ant-form-item-label\">"
                        + "<label>"
                            + "<span class=\"Editor__label\">"
                                + "<span>Possibly wrong mentions</span>"
                            + "</span>"
                        + "</label>"
                    + "</div>"
                    + "<div class=\"ant-form-item-control-wrapper\">"
                        + "<div class=\"ant-form-item-control\">"
                            + "<span class=\"ant-form-item-children\">"
                                + "<div class=\"ant-table ant-table-default ant-table-bordered\">"
                                    + "<div class=\"ant-table-content\">"
                                        + "<div class=\"ant-table-body\">",
            end:                        "</div>"
                                    + "</div>"
                                + "</div>"
                            + "</span>"
                        + "</div>"
                    + "</div>"
                + "</div>"
        },
        baseSettings: {
            begin: 
                "<div id=\"checky\">"
                    + "<h1><span>Checky Settings</span></h1>"
                    + "<div class=\"Settings\">"
                        + "<h3><span>Ignored usernames</span></h3>"
                        + "<p><span>You can remove usernames from the ignored usernames by checking the corresponding boxes and clicking on the Remove button, or remove all the ignored usernames by clicking on the Remove All button.</span></p>"
                        + "<form id=\"checky__ignored\" class=\"Settings__section\" method=\"post\">",
            end:        "</form>"
                    + "</div>"
                + "</div>"
        },
        button: {
            class: isBig => isBig ? "Action Action--primary Action--big" : "Action Action--primary",
            style: "vertical-align: middle; margin-right: 10px"
        },
        buttonBack: {
            class: "Action",
            style: "vertical-align: middle"
        },
        checkbox: {
            begin: username => 
                "<div id=\"checky__ignored-" + username + "\" class=\"Settings__section__checkbox\">"
                    + "<label class=\"ant-checkbox-wrapper\">"
                        + "<span class=\"ant-checkbox\">"
                            + "<input type=\"checkbox\" name=\"checky__ignored[]\" value=\"" + username + "\" class=\"ant-checkbox-input\" onchange=\"this.checked ? this.parentElement.classList.add('ant-checkbox-checked') : this.parentElement.classList.remove('ant-checkbox-checked')\">"
                            + "<span class=\"ant-checkbox-inner\"></span>"
                        + "</span>"
                        + "<span>",
            end: username =>
                        "</span>"
                        + "<span>" + username + "</span>"
                    + "</label>"
                + "</div>"
        },
        select: {
            style: "margin: 0 10px"
        },
        tbody: {
            class: "ant-table-tbody"
        },
        textInput: {
            class: "ant-input ant-select-search__field",
            style: "margin: 0 10px"
        },
        thead: {
            class: "ant-table-thead"
        },
        tr: {
            style: "height: 73px"
        },
        userpic: {
            class: "Avatar",
            style: "display: inline-block !important; min-width: 40px; width: 40px; height: 40px"
        }
    },
    steemit: {
        baseEditor: {
            begin: "<div id=\"checky\" class=\"vframe__section--shrink\" style=\"display: none\">"
                    + "<h6>Possibly wrong mentions</h6>",
            end: "</div>"
        },
        baseSettings: {
            begin: "<div class=\"row\">"
                    + "<div class=\"small-12 medium-6 large-4 columns\">"
                        + "<br>"
                        + "<br>"
                        + "<h4>Checky Preferences</h4>"
                        + "<div id=\"checky\" class=\"row\">"
                            + "<div class=\"small-12 medium-6 large-12 columns\">"
                                + "<label>Ignored usernames</label>"
                                + "<form id=\"checky__ignored\" method=\"post\">",
            end:                  "</form>"
                            + "</div>"
                        + "</div>"
                    + "</div>"
                + "</div>"
        },
        button: {
            class: _isBig => "button",
            style: "margin-bottom: 0; font-size: 1rem"
        },
        buttonBack: {
            class: "button hollow no-border",
            style: "margin-bottom: 0"
        },
        checkbox: {
            begin: username => 
                "<label id=\"checky__ignored-" + username + "\" style=\"margin: 0.5rem 0\">"
                    + "<input type=\"checkbox\" value=\"" + username + "\" name=\"checky__ignored[]\" style=\"vertical-align: middle\">",
            end: username => 
                    "<span style=\"margin-left: 0.5rem; font-size: 1rem\">" + username + "</span>"
                + "</label>"
        },
        select: {
            style: "margin: 0 1rem"
        },
        tbody: {
            class: ""
        },
        textInput: {
            class: "",
            style: "margin: 0 1rem"
        },
        thead: {
            class: ""
        },
        tr: {
            style: "height: 70px"
        },
        userpic: {
            class: "Userpic",
            style: ""
        }
    }
}