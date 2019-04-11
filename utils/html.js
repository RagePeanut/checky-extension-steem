const html = {
    back: "<button name=\"checky__back\" class=\"button hollow no-border\" style=\"margin-bottom: 0\">Back</button>",
    baseEditor: "<div id=\"checky\" class=\"vframe__section--shrink\" style=\"display: none\">"
                    + "<h6>Possibly wrong mentions</h6>"
                    + "<table>"
                        + "<thead>"
                            + "<th>Mention</th>"
                            + "<th>Actions</th>"
                        + "</thead>"
                        + "<tbody></tbody>"
                    + "</table>"
                + "</div>",
    baseSettings: ignored => "<div class=\"row\">"
                                + "<div class=\"small-12 medium-6 large-4 columns\">"
                                    + "<br>"
                                    + "<br>"
                                    + "<h4>Checky Preferences</h4>"
                                    + "<div id=\"checky\" class=\"row\">"
                                        + "<div class=\"small-12 medium-6 large-12 columns\">"
                                            + "<label>Ignored usernames</label>"
                                            + "<form id=\"checky__ignored\" method=\"post\">"
                                                + html.ignoredAll(ignored)
                                            + "</form>"
                                        + "</div>"
                                    + "</div>"
                                + "</div>"
                            + "</div>",
    buttons: "<button name=\"checky__replace\" class=\"button\" style=\"margin-bottom: 0; font-size: 1rem\">Replace</button>"
            + "<button name=\"checky__suggestions\" class=\"button\" style=\"margin-bottom: 0; font-size: 1rem\">Suggestions</button>"
            + "<button name=\"checky__ignore\" class=\"button hollow no-border\" style=\"margin-bottom: 0\">Ignore</button>",
    change: "<button name=\"checky__change\" class=\"button\" style=\"margin-left: 1rem; margin-bottom: 0; font-size: 1rem\">Change</button>",
    ignored: username => "<label id=\"checky__ignored-" + username + "\" style=\"margin: 0.5rem 0\">"
                            + "<input type=\"checkbox\" value=\"" + username + "\" name=\"checky__ignored[]\" style=\"vertical-align: middle\">"
                            + html.userpic(username)
                            + "<span style=\"margin-left: 0.5rem; font-size: 1rem\">" + username + "</span>"
                        + "</label>",
    ignoredAll: usernames => {
        let toReturn = "";
        for(const username of usernames) {
            toReturn += html.ignored(username);
        }
        if(usernames.length > 0) {
            toReturn += "<button type=\"submit\" class=\"button\">Remove</button>"
                    + "<button id=\"checky__ignored-removeAll\" type=\"button\" class=\"button\">Remove All</button>";
        } else {
            toReturn += "<p style=\"margin-top: 1rem\">No ignored usernames.</p>";
        }
        return toReturn;
    },
    option: (suggestion, disabled) => "<option value=\"" + suggestion + (disabled ? " disabled\">" : "\">") + suggestion + "</option>",
    replace: mention => html.userpic("null")
                        + "<input pattern=\"[A-Za-z][A-Za-z\\d.-]{1,}[A-Za-z\d]\" title=\"This username isn't valid.\" type=\"text\" style=\"display: inline-block; vertical-align: middle; width: 60%; margin-left: 1rem\" placeholder=\"Type what you want to replace " + mention + " by here.\" required>"
                        + html.change
                        + html.back,
    suggestions: (options, firstOption) => {
        let toReturn = "";
        if(firstOption) toReturn += html.userpic(firstOption);
        toReturn += "<select style=\"vertical-align: middle; width: 30%; margin-left: 1rem\">" + options + "</select>";
        if(firstOption) toReturn += html.change;
        toReturn += html.back;
        return toReturn;
    },
    suggestionsLoading: "<span>Please wait while the suggestions get generated...</span>",
    tr: mention => "<tr id=\"checky__row-" + mention + "\" style=\"height: 70px\"><td style=\"width: 15%\">" + mention + "</td><td>" + html.buttons + "</td></tr>",
    userpic: username => "<img class=\"Userpic\" src=\"https://steemitimages.com/u/" + username + "/avatar\" onerror=\"this.src='https://steemitimages.com/u/null/avatar'\">"
}