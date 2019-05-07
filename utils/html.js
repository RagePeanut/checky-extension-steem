const html = {
    authorizationCheckbox: (name, text, checked) => 
        "<div class=\"col-md-4\">"
            + "<span class=\"text-semibold pl-10 pr-10\">"
                + "<div class=\"p-default p-fill p-smooth p-bigger pretty\">"
                    + "<input type=\"checkbox\" name=\"" + name + "\"" + (checked ? " checked" : "") + ">"
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
                + "<div class=\"text-muted\">Authorize Checky to work on the apps of your choosing.</div>"
            + "</td>"
        + "</tr>"
        + "<tr>"
            + "<td colspan=\"2\" class=\"no-padding-top no-border-top\">"
                + "<div class=\"panel panel-flat border-left-xlg border-left-info no margin-top no-margin-bottom\">"
                    + "<div class=\"panel-body\">"
                        + "<div class=\"row\">"
                            + html.authorizationCheckbox("busy", "Busy", authorizations.busy)
                            + html.authorizationCheckbox("steemit", "Steemit", authorizations.steemit)
                            + html.authorizationCheckbox("steempeak", "SteemPeak", authorizations.steempeak)
                        + "</div>"
                    + "</div>"
                + "</div>"
            + "</td>"
        + "</tr>",
    back: app => "<button name=\"checky__back\" class=\"" + attr[app].buttonBack.class + "\" style=\"" + attr[app].buttonBack.style + "\">Back</button>",
    baseEditor: app => 
        attr[app].baseEditor.begin
        + "<table style=\"width: 100%\" class=\"" + attr[app].table.class + "\">"
            + "<thead class=\"" + attr[app].thead.class + "\">"
                + "<tr>"
                    + "<th><span>Mention</span></th>"
                    + "<th><span>Actions</span></th>"
                + "</tr>"
            + "</thead>"
            + "<tbody class=\"" + attr[app].tbody.class + "\"></tbody>"
        + "</table>"
        + attr[app].baseEditor.end,
    baseSettings: (selectedValue, app) => 
        attr[app].baseSettings.begin
        + html.sortingSetting(selectedValue)
        + html.authorizationSetting()
        + attr[app].baseSettings.end,
    baseSettingsIgnored: (ignored, app) => 
        attr[app].baseSettingsIgnored.begin
        + html.ignoredAll(ignored, app)
        + attr[app].baseSettingsIgnored.end,
    buttons: app => 
        "<button name=\"checky__replace\" class=\"" + attr[app].button.class(false) + "\" style=\"" + attr[app].button.style + "\">Replace</button>"
        + "<button name=\"checky__suggestions\" class=\"" + attr[app].button.class(false) + "\" style=\"" + attr[app].button.style + "\">Suggestions</button>"
        + "<button name=\"checky__ignore\" class=\"" + attr[app].buttonBack.class + "\" style=\"" + attr[app].buttonBack.style + "\">Ignore</button>",
    change: app => "<button name=\"checky__change\" class=\"" + attr[app].button.class(false) + "\" style=\"" + attr[app].button.style + "\">Change</button>",
    ignored: (username, app) => 
        attr[app].checkbox.begin(username)
        + html.userpic(username, app)
        + attr[app].checkbox.end(username),
    ignoredAll: (usernames, app) => {
        let toReturn = "";
        for(const username of usernames) {
            toReturn += html.ignored(username, app);
        }
        if(usernames.length > 0) {
            toReturn += "<div class=\"" + attr[app].removeButtons.class +"\">"
                        + "<button type=\"submit\" class=\"" + attr[app].button.class(true) + "\" style=\"" + attr[app].button.style + "\">Remove</button>"
                        + "<button id=\"checky__ignored-removeAll\" type=\"button\" class=\"" + attr[app].button.class(true) + "\" style=\"" + attr[app].button.style + "\">Remove All</button>"
                    + "</div>";
        } else {
            toReturn += html.noIgnored;
        }
        return toReturn;
    },
    noIgnored: "<p style=\"margin-top: 1rem\"><span>No ignored usernames.</span></p>",
    option: (value, text, disabled, selected) => "<option value=\"" + value + "\"" + (disabled ? " disabled" : "") + (selected ? " selected" : "") + ">" + text + "</option>",
    replace: app => 
        html.userpic("null", app)
        + "<input type=\"text\" pattern=\"[A-Za-z][A-Za-z\\d.-]{1,}[A-Za-z\d]\" title=\"This username isn't valid.\" placeholder=\"Type a username here.\" class=\""
            + attr[app].textInput.class + "\" style=\"display: inline-block; vertical-align: middle; width: 60%; " + attr[app].textInput.style + "\" required>"
        + html.change(app)
        + html.back(app),
    settingsLink: app => 
        "<li id=\"checky__link\">"
            + "<a href=\"#checky-settings\">"
                + attr[app].settingsLink.icon + "Checky"
            + "</a>"
        + "</li>",
    sortingSetting: selectedValue =>
        "<tr>"
            + "<td class=\"no-border-top\">"
                + "<div class=\"text-semibold\">"
                    + "<h5>Suggestions Order</h5>"
                + "</div>"
                + "<div class=\"text-muted\">Choose the way suggestions should be ordered.</div>"
            + "</td>"
            + "<td data-v-4c63a4f7 class=\"text-center no-padding-left no-border-top pr-10\" width=\"25%\">"
                + "<select name=\"select\" class=\"form-control\">"
                    + html.option("alphabetical+", "Alphabetical+ (Default)", false, selectedValue === "alphabetical+")
                    + html.option("alphabetical", "Alphabetical", false, selectedValue === "alphabetical")
                    + html.option("most-mentioned", "Most mentioned (Coming soon)", true, selectedValue === "most-mentioned")
                    + html.option("most-mentioned-by-account", "Most mentioned by account (Coming soon)", true, selectedValue === "most-mentioned-by-account")
                + "</select>"
            + "</td>"
        + "</tr>",
    suggestions: (options, firstOption, app, isFirstSuggestions) => {
        let toReturn = "";
        if(firstOption) toReturn += html.userpic(firstOption, app);
        toReturn += "<select class=\"" + attr[app].select.class + "\" style=\"vertical-align: middle; width: 30%; " + attr[app].select.style(!firstOption) + "\">" + options + "</select>";
        if(firstOption) toReturn += html.change(app);
        if(isFirstSuggestions) toReturn += "<button name=\"check__more-suggestions\" class=\"" + attr[app].button.class(false) + "\" style=\"" + attr[app].button.style + "\">More Suggestions</button>";
        toReturn += html.back(app);
        return toReturn;
    },
    suggestionsLoading: dots => "<span>Please wait while the suggestions get generated" + ".".repeat(dots) + "</span>",
    tr: (mention, app) => "<tr id=\"checky__row-" + mention + "\" style=\"" + attr[app].tr.style + "\"><td style=\"width: 15%\">" + mention + "</td><td>" + html.buttons(app) + "</td></tr>",
    userpic: (username, app) => "<img src=\"https://steemitimages.com/u/" + username + "/avatar\" class=\"" + attr[app].userpic.class + "\" style=\"" + attr[app].userpic.style +"\" onerror=\"this.src='https://steemitimages.com/u/null/avatar'\">"
}