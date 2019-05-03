const html = {
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
    baseSettings: (ignored, app) => 
        attr[app].baseSettings.begin
        + html.ignoredAll(ignored, app)
        + attr[app].baseSettings.end,
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
    option: (suggestion, disabled) => "<option value=\"" + suggestion + (disabled ? " disabled\">" : "\">") + suggestion + "</option>",
    replace: app => 
        html.userpic("null", app)
        + "<input type=\"text\" pattern=\"[A-Za-z][A-Za-z\\d.-]{1,}[A-Za-z\d]\" title=\"This username isn't valid.\" placeholder=\"Type a username here.\" class=\""
            + attr[app].textInput.class + "\" style=\"display: inline-block; vertical-align: middle; width: 60%; " + attr[app].textInput.style + "\" required>"
        + html.change(app)
        + html.back(app),
    suggestions: (options, firstOption, app, isFirstSuggestions) => {
        let toReturn = "";
        if(firstOption) toReturn += html.userpic(firstOption, app);
        toReturn += "<select class=\"" + attr[app].select.class + "\" style=\"vertical-align: middle; width: 30%; " + attr[app].select.style + "\">" + options + "</select>";
        if(firstOption) toReturn += html.change(app);
        if(isFirstSuggestions) toReturn += "<button name=\"check__more-suggestions\" class=\"" + attr[app].button.class(false) + "\" style=\"" + attr[app].button.style + "\">More Suggestions</button>";
        toReturn += html.back(app);
        return toReturn;
    },
    suggestionsLoading: dots => "<span>Please wait while the suggestions get generated" + ".".repeat(dots) + "</span>",
    tr: (mention, app) => "<tr id=\"checky__row-" + mention + "\" style=\"" + attr[app].tr.style + "\"><td style=\"width: 15%\">" + mention + "</td><td>" + html.buttons(app) + "</td></tr>",
    userpic: (username, app) => "<img src=\"https://steemitimages.com/u/" + username + "/avatar\" class=\"" + attr[app].userpic.class + "\" style=\"" + attr[app].userpic.style +"\" onerror=\"this.src='https://steemitimages.com/u/null/avatar'\">"
}