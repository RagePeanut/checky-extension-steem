const attr = {
    busy: {
        authorizationCheckbox: (name, text, checked) =>
            "<label class=\"ant-radio-button-wrapper" + (checked ? " ant-radio-button-wrapper-checked" : "") + "\">"
                + "<span class=\"ant-radio-button ant-radio-button-checked\">"
                    + "<input type=\"checkbox\" name=\"checky__" + name + "\" class=\"checky__authorization-checkbox ant-radio-button-input\"" + (checked ? " checked" : "") + ">"
                    + "<span class=\"ant-radio-button-inner\"></span>"
                + "</span>"
                + "<span>" + text + "</span>"
            + "</label>",
        authorizationSetting: () =>
            "<div class=\"Settings__section\">"
                + "<h3><span>Authorized apps</span></h3>"
                + "<p><span>You can select the apps you want Checky to operate on.</span></p>"
                + "<div class=\"RawSlider__presets\" style=\"padding: 0\">"
                    + "<div class=\"ant-radio-group ant-radio-group-large\">"
                        + attr.busy.authorizationCheckbox("busy", "Busy", authorizations.busy)
                        + attr.busy.authorizationCheckbox("steemit", "Steemit", authorizations.steemit)
                        + attr.busy.authorizationCheckbox("steempeak", "SteemPeak", authorizations.steempeak)
                    + "</div>"
                + "</div>"
            + "</div>",
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
                "<div id=\"checky checky__settings\" class=\"center checky-content\">"
                    + "<h1><span>Checky Settings</span></h1>"
                    + "<div class=\"Settings\">",
            end:        "<button id=\"checky__save-settings\" class=\"Action Action--big Action--primary\"><span>Save</span></button>"
                        + "<div class=\"Settings__version\">"
                            + "<p><span>Version: " + chrome.runtime.getManifest().version + "</span></p>"
                        + "</div>"
                    + "</div>"
                    + "<h1><span>Ignored usernames</span></h1>"
                    + "<div id=\"checky__settings\" class=\"Settings\"></div>"
                + "</div>"
        },
        baseSettingsIgnored: {
            begin:
                "<div class=\"Settings__section checky-content\">"
                    + "<h3><span>Ignored usernames</span></h3>"
                    + "<p><span>You can remove usernames from the ignored usernames by checking the corresponding boxes and clicking on the Remove button, or remove all the ignored usernames by clicking on the Remove All button.</span></p>"
                    + "<form id=\"checky__ignored\" class=\"Settings__section\" method=\"post\">",
            end:    "</form>"
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
        caseSensitivitySetting: () =>
            "<div class=\"Settings__section\">"
                + "<h3><span>Case sensitivity</span></h3>"
                + "<p><span>You can enable this option to make the mention checking case sensitive.</span></p>"
                + "<div class=\"Settings__section__checkbox\">"
                    + "<label class=\"ant-checkbox-wrapper\">"
                        + "<span class=\"ant-checkbox" + (isCaseSensitive ? " ant-checkbox-checked" : "") + "\">"
                            + "<input id=\"checky__case-sensitivity\" type=\"checkbox\" class=\"ant-checkbox-input\"" + (isCaseSensitive ? " selected" : "") + " onchange=\"this.checked ? this.parentElement.classList.add('ant-checkbox-checked') : this.parentElement.classList.remove('ant-checkbox-checked')\">"
                            + "<span class=\"ant-checkbox-inner\"></span>"
                        + "</span>"
                        + "<span>"
                            + "<span>Enable case sensitivity</span>"
                        + "</span>"
                    + "</label>"
                + "</div>"
            + "</div>",
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
        sortingSetting: selectedValue =>
            "<div class=\"Settings__section\">"
                + "<h3><span>Suggestions order</span></h3>"
                + "<p><span>You can pick the suggestions order that fits your needs the most.</span></p>"
                + "<select id=\"checky__sorting-order\" name=\"select\">"
                    + html.option("alphabetical+", "Alphabetical+", false, selectedValue === "alphabetical+")
                    + html.option("alphabetical", "Alphabetical", false, selectedValue === "alphabetical")
                    + html.option("most-mentioned", "Most mentioned (Coming soon)", true, selectedValue === "most-mentioned")
                    + html.option("most-mentioned-by-account", "Most mentioned by account (Coming soon)", true, selectedValue === "most-mentioned-by-account")
                + "</select>"
            + "</div>",
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
        authorizationCheckbox: (name, text, checked) =>
            "<label>"
                + "<input type=\"checkbox\" name=\"checky__" + name + "\" class=\"checky__authorization-checkbox\" onchange=\"document.getElementById('checky__save-settings').click()\" style=\"vertical-align: middle\"" + (checked ? " checked" : "") + ">"
                + "<span style=\"font-size: 1rem; vertical-align: middle\">" + text + "</span>"
            + "</label>",
        authorizationSetting: () =>
            "<div class=\"row\">"
                + "<div class=\"small-12 medium-6 large-12 columns\">"
                    + "<label>Authorized apps</label>"
                    + attr.steemit.authorizationCheckbox("busy", "Busy", authorizations.busy)
                    + attr.steemit.authorizationCheckbox("steemit", "Steemit", authorizations.steemit)
                    + attr.steemit.authorizationCheckbox("steempeak", "SteemPeak", authorizations.steempeak)
                + "</div>"
            + "</div>"
            + "<br>",
        baseEditor: {
            begin: "<div id=\"checky\" class=\"vframe__section--shrink\" style=\"display: none\">"
                    + "<h6>Possibly wrong mentions</h6>",
            end: "</div>"
        },
        baseSettings: {
            begin:  
                "<article id=\"checky\" class=\"articles checky-content\">"
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
                        + "<div class=\"row\">"
                            + "<div class=\"small-12 medium-6 large-4 columns\">"
                                + "<br>"
                                + "<br>"
                                + "<h4>Preferences</h4>",
            end:            "</div>"
                            + "<button id=\"checky__save-settings\" style=\"display: none\"></button>"
                        + "</div>"
                        + "<div class=\"row\">"
                            + "<div id=\"checky__settings\" class=\"small-12 medium-6 large-4 columns\">"
                                + "<br>"
                                + "<br>"
                                + "<h4>Ignored usernames</h4>"
                            + "</div>"
                        + "</div>"
                    + "</div>"
                + "</article>"
        },
        baseSettingsIgnored: {
            begin:
                "<div class=\"row checky-content\">"
                    + "<div class=\"small-12 medium-6 large-12 columns\">"
                        + "<form id=\"checky__ignored\" method=\"post\">",
            end:        "</form>"
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
        caseSensitivitySetting: () =>
            "<div class=\"row\">"
                + "<div class=\"small-12 medium-6 large-12 columns\">"
                    + "<label>Case sensitivity</label>"
                    + "<label>"
                        + "<input id=\"checky__case-sensitivity\" type=\"checkbox\" onchange=\"document.getElementById('checky__save-settings').click()\" style=\"vertical-align: middle\"" + (isCaseSensitive ? " checked" : "") + ">"
                        + "<span style=\"font-size: 1rem; vertical-align: middle\">Enable case sensitivity</span>"
                    + "</label>"
                + "</div>"
            + "</div>",
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
        sortingSetting: selectedValue =>
            "<div class=\"row\">"
                + "<div class=\"small-12 medium-6 large-12 columns\">"
                    + "<label>"
                        + "Suggestions order"
                        + "<select id=\"checky__sorting-order\" name=\"select\" onchange=\"document.getElementById('checky__save-settings').click()\">"
                            + html.option("alphabetical+", "Alphabetical+", false, selectedValue === "alphabetical+")
                            + html.option("alphabetical", "Alphabetical", false, selectedValue === "alphabetical")
                            + html.option("most-mentioned", "Most mentioned (Coming soon)", true, selectedValue === "most-mentioned")
                            + html.option("most-mentioned-by-account", "Most mentioned by account (Coming soon)", true, selectedValue === "most-mentioned-by-account")
                        + "</select>"
                    + "</label>"
                + "</div>"
            + "</div>"
            + "<br>",
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
        authorizationCheckbox: (name, text, checked) => 
        "<div class=\"col-md-4\">"
            + "<span class=\"text-semibold pl-10 pr-10\">"
                + "<div class=\"p-default p-fill p-smooth p-bigger pretty\">"
                    + "<input type=\"checkbox\" name=\"checky__" + name + "\" class=\"checky__authorization-checkbox\"" + (checked ? " checked" : "") + ">"
                    + "<div class=\"state p-primary\">"
                        + "<label></label>"
                    + "</div>"
                + "</div>"
                + text
            + "</span>"
        + "</div>",
        authorizationSetting: () => 
            "<tr>"
                + "<td colspan=\"2\">"
                    + "<div class=\"text-semibold\">"
                        + "<h5>Authorize Checky</h5>"
                    + "</div>"
                    + "<div class=\"text-muted\">Authorize Checky to operate on the apps of your choosing.</div>"
                + "</td>"
            + "</tr>"
            + "<tr>"
                + "<td colspan=\"2\" class=\"no-padding-top no-border-top\">"
                    + "<div class=\"panel panel-flat border-left-xlg border-left-info no margin-top no-margin-bottom\">"
                        + "<div class=\"panel-body\">"
                            + "<div class=\"row\">"
                                + attr.steempeak.authorizationCheckbox("busy", "Busy", authorizations.busy)
                                + attr.steempeak.authorizationCheckbox("steemit", "Steemit", authorizations.steemit)
                                + attr.steempeak.authorizationCheckbox("steempeak", "SteemPeak", authorizations.steempeak)
                            + "</div>"
                        + "</div>"
                    + "</div>"
                + "</td>"
            + "</tr>",
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
                "<div id=\"checky\" class=\"tab-pane active checky-content\">"
                    + "<table class=\"table tasks-list table-lg\">"
                        + "<tbody>",      
            end:        "</tbody>"
                    + "</table>"
                    + "<div class=\"text-center pb-10 pt-10\">"
                        + "<button id=\"checky__save-settings\" data-style=\"slide-right\" class=\"btn btn-primary btn-ladda btn-ladda-spinner ladda-button\">"
                            + "<span class=\"ladda-label\">"
                                + "<span>Save Settings</span>"
                            + "</span>"
                            + "<span class=\"ladda-spinner\">"
                        + "</button>"
                    + "</div>"
                + "</div>"
        },
        baseSettingsIgnored: {
            begin:
                "<div class=\"panel panel-flat checky-content\">"
                    + "<div class=\"panel-body no-padding-top\">"
                        + "<table class=\"table tasks-list table-lg\">"
                            + "<tbody>"
                                + "<tr>"
                                    + "<td class=\"no-border-top no-padding-bottom\">"
                                        + "<div class=\"text-semibold\">"
                                            + "<h5>Ignored usernames</h5>"
                                        + "</div>"
                                        + "<div class=\"text-muted pb-10\">Check the ignored usernames you want to remove from the list.</div>"
                                        + "<form id=\"checky__ignored\" method=\"post\">",
             end:                       "</form>"
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
        caseSensitivitySetting: () =>
            "<tr>"
                + "<td>"
                    + "<div class=\"text-semibold\">"
                        + "<h5>Use case sensitive matching</h5>"
                    + "</div>"
                    + "<div class=\"text-muted\">Enable case sensitivity for the mention matching</div>"
                + "</td>"
                + "<td data-v-4c63a4f7 class=\"text-center\">"
                    + "<label class=\"pt-15 vue-switcher" + (isCaseSensitive ? "" : " vue-switcher--unchecked") + " vue-switcher-theme--bootstrap vue-switcher-color--primary\">"
                        + "<input id=\"checky__case-sensitivity\" type=\"checkbox\"" + (isCaseSensitive ? " checked" : "") + " onchange=\"this.checked ? this.parentElement.classList.remove('vue-switcher--unchecked') : this.parentElement.classList.add('vue-switcher--unchecked')\">"
                        + "<div></div>"
                    + "</label>"
                + "</td>"
            + "</tr>",
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
        sortingSetting: selectedValue =>
            "<tr>"
                + "<td class=\"no-border-top\">"
                    + "<div class=\"text-semibold\">"
                        + "<h5>Suggestions Order</h5>"
                    + "</div>"
                    + "<div class=\"text-muted\">Choose the way suggestions should be ordered.</div>"
                + "</td>"
                + "<td data-v-4c63a4f7 class=\"text-center no-padding-left no-border-top pr-10\" width=\"230px\">"
                    + "<select id=\"checky__sorting-order\" name=\"select\" class=\"form-control\">"
                        + html.option("alphabetical+", "Alphabetical+ (Default)", false, selectedValue === "alphabetical+")
                        + html.option("alphabetical", "Alphabetical", false, selectedValue === "alphabetical")
                        + html.option("most-mentioned", "Most mentioned (Coming soon)", true, selectedValue === "most-mentioned")
                        + html.option("most-mentioned-by-account", "Most mentioned by account (Coming soon)", true, selectedValue === "most-mentioned-by-account")
                    + "</select>"
                + "</td>"
            + "</tr>",
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
            style: "height: 65px"
        },
        userpic: {
            class: "avatar",
            style: "min-width: 40px; width: 40px; height: 40px"
        }
    }
}