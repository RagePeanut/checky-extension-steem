const html = {
    back: "<button name=\"checky__back\" class=\"button hollow no-border\" style=\"margin-bottom: 0\">Back</button>",
    base: "<div id=\"checky\" class=\"vframe__section--shrink\" style=\"display: none\">"
            + "<h6>Possibly wrong mentions</h6>"
            + "<table>"
                + "<thead>"
                    + "<th>Mention</th>"
                    + "<th>Actions</th>"
                + "</thead>"
                + "<tbody></tbody>"
            + "</table>"
        + "</div>",
    buttons: "<button name=\"checky__replace\" class=\"button\" style=\"margin-bottom: 0; font-size: 1rem\">Replace</button>"
            + "<button name=\"checky__suggestions\" class=\"button\" style=\"margin-bottom: 0; font-size: 1rem\">Suggestions</button>"
            + "<button name=\"checky__ignore\" class=\"button hollow no-border\" style=\"margin-bottom: 0\">Ignore</button>",
    change: "<button name=\"checky__change\" class=\"button\" style=\"margin-left: 1rem; margin-bottom: 0; font-size: 1rem\">Change</button>",
    option: (suggestion, disabled) => "<option value=\"" + suggestion + (disabled ? " disabled\">" : "\">") + suggestion + "</option>",
    replace: mention => html.userpic("null")
                        + "<input pattern=\"[A-Za-z][A-Za-z\\d.-]{1,}[A-Za-z\d]\" title=\"This username isn't valid.\" type=\"text\" style=\"display: inline-block; vertical-align: middle; width: 60%\" placeholder=\"Type what you want to replace " + mention + " by here.\" required>"
                        + html.change
                        + html.back,
    suggestions: (options, firstOption) => {
        let toReturn = "";
        if(firstOption) toReturn += html.userpic(firstOption);
        toReturn += "<select style=\"vertical-align: middle; width: 30%\">" + options + "</select>";
        if(firstOption) toReturn += html.change;
        toReturn += html.back;
        return toReturn;
    },
    suggestionsLoading: "<span>Please wait while the suggestions get generated...</span>",
    tr: mention => "<tr id=\"checky__row-" + mention + "\" style=\"height: 70px\"><td style=\"width: 15%\">" + mention + "</td><td>" + html.buttons + "</td></tr>",
    userpic: username => "<img class=\"Userpic\" src=\"https://steemitimages.com/u/" + username + "/avatar\" style=\"margin-right: 1rem\">"
}