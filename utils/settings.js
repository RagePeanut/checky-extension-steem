const settings = {
    /**
     * Initializes the extension settings variables and DOM elements.
     */
    init: () => {
        const baseSettings = html.baseSettings(ignored.sort());
        document.getElementsByClassName("Settings")[0].insertAdjacentHTML("beforeend", baseSettings);
        elements.checkySettings = document.getElementById("checky");
    }
}