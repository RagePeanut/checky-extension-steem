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
                "<div id=\"checky\" class=\"center\">"
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
        removeButtons: {
            class: ""
        },
        select: {
            class: "",
            style: isFirstChild => isFirstChild ? "margin-right: 10px" : "margin: 0 10px"
        },
        settingsLandmark: {
            appClass: "",
            checkyClass: "settings-layout container"
        },
        settingsLink: {
            aClassActive: "Sidenav__item--active",
            icon: "<i class=\"iconfont icon-setup\"></i>",
            liClassActive: ""
        },
        table: {
            class: ""
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
            begin:  "<article id=\"checky\" class=\"articles\">"
                        + "<div>"
                            + "<div class=\"articles__header\">"
                                + "<div class=\"articles__header-col\">"
                                    + "<h1 class=\"articles__h1\">Checky Settings</h1>"
                                + "</div>"
                                + "<div class=\"articles__header-col articles__header-col--right\">"
                                    + "<div class=\"articles__layout-selector\">"
                                        + "<svg class=\"articles__icon--layout\">"
                                            + "<g id=\"svg-icon-symbol-layout\" viewBox=\"0 0 24 24\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">"
                                                + "<rect class=\"icon-svg icon-svg--accent icon-svg--layout-line1\" x=\"6\" y=\"16\" width=\"12\" height=\"2\"></rect><rect class=\"icon-svg icon-svg--accent icon-svg--layout-line2\" x=\"6\" y=\"11\" width=\"12\" height=\"2\"></rect>"
                                                + "<rect class=\"icon-svg icon-svg--accent icon-svg--layout-line3\" x=\"6\" y=\"6\" width=\"12\" height=\"2\"></rect>"
                                                + "<path d=\"M2,2 L2,22 L22,22 L22,2 L2,2 Z M1,1 L23,1 L23,23 L1,23 L1,1 Z\" id=\"icon-svg__border\" class=\"icon-svg icon-svg--accent\" fill-rule=\"nonzero\"></path>"
                                            + "</g>"
                                        + "</svg>"
                                    + "</div>"
                                + "</div>"
                            + "</div>"
                            + "<hr class=\"articles__hr\">"
                        + "</div>"
                        + "<div class=\"Settings\">"
                            +"<div class=\"row\">"
                                + "<div class=\"small-12 medium-6 large-4 columns\">"
                                    + "<br>"
                                    + "<br>"
                                    + "<h4>Preferences</h4>"
                                    + "<div class=\"row\">"
                                        + "<div class=\"small-12 medium-6 large-12 columns\">"
                                            + "<label>Ignored usernames</label>"
                                            + "<form id=\"checky__ignored\" method=\"post\">",
            end:                            "</form>"
                                        + "</div>"
                                    + "</div>"
                                + "</div>"
                            + "</div>"
                        + "</div>"
                    + "</article>"
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
        removeButtons: {
            class: ""
        },
        select: {
            class: "",
            style: isFirstChild => isFirstChild ? "margin-right: 1rem" : "margin: 0 1rem"
        },
        settingsLandmark: {
            appClass: "",
            checkyClass: "UserProfile__tab_content column layout-list settings"
        },
        settingsLink: {
            aClassActive: "active",
            icon: "",
            liClassActive: ""
        },
        table: {
            class: ""
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
    },
    steempeak: {
        baseEditor: {
            begin: 
                "<div id=\"checky\" class=\"panel-body\" style=\"display: none; border-top: 0\">"
                    + "<div class=\"form-group\">"
                        + "<label class=\"text-semibold\">Possibly wrong mentions</label>"
                        + "<div class=\"table-responsive\">",
            end: "</div></div></div>"
        },
        baseSettings: {
            begin:
                "<div id=\"checky\" class=\"tab-pane active\">"
                    + "<div class=\"panel-body no-padding-top\">"
                        + "<table class=\"table tasks-list table-lg\">"
                            + "<tbody>"
                                + "<tr>"
                                    + "<td class=\"no-border-top no-padding-bottom\">"
                                        + "<div class=\"text-semibold\">"
                                            + "<h5>Checky ignored usernames</h5>"
                                        + "</div>"
                                        + "<div class=\"text-muted pb-10\">Check the ignored usernames you want to remove from the list.</div>"
                                        + "<form id=\"checky__ignored\" method=\"post\">",
            end:                        "</form>"
                                    + "</td>"
                                + "</tr>"
                            + "</tbody>"
                        + "</table>"
                    + "</div>"
                + "</div>"
        },
        button: {
            class: _isBig => "btn btn-sm btn-primary mr-10",
            style: ""
        },
        buttonBack: {
            class: "btn btn-sm",
            style: ""
        },
        checkbox: {
            begin: username =>
                "<label id=\"checky__ignored-" + username + "\" style=\"display: block\">"
                    + "<div class=\"p-default p-fill p-smooth p-bigger pretty\">"
                        + "<input type=\"checkbox\" value=\"" + username + "\" name=\"checky__ignored[]\" style=\"vertical-align: middle\">"
                        + "<div class=\"state p-info\">"
                            + "<label></label>"
                        + "</div>"
                    + "</div>",
            end: username => 
                    "<span class=\"ml-10\">" + username + "</span>"
                + "</label>"
        },
        removeButtons: {
            class: "text-center"
        },
        select: {
            class: "form-control mr-10 ml-10",
            style: _isFirstChild => "display: inline-block"
        },
        settingsLandmark: {
            appClass: "tab-content",
            checkyClass: "tab-content"
        },
        settingsLink: {
            aClassActive: "router-link-exact-active router-link-active",
            icon: "",
            liClassActive: "active"
        },
        table: {
            class: "table table-striped"
        },
        tbody: {
            class: ""
        },
        textInput: {
            class: "form-control mr-10 ml-10",
            style: ""
        },
        thead: {
            class: ""
        },
        tr: {
            style: ""
        },
        userpic: {
            class: "avatar",
            style: "min-width: 40px; width: 40px; height: 40px"
        }
    }
}