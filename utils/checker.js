const unallowedRegex = /(^|\.)[\d.-]|[.-](\.|$)|-{2}|.{17}|(^|\.).{0,2}(\.|$)/;

const checker = {
    suggestions,
    moreSuggestions
}

/**
 * Generates an array of valid usernames one edit away from a wrong username.
 * 
 * @param {string} username The wrong username
 * @param {function} callback A function to call once all the suggestions have been found
 * @param {*} arg An optional argument for the callback
 */
async function suggestions(username, callback, arg) {
    const ed = [...edits(username, true)];
    const ex = await existing(ed);
    callback(ex, arg, true);
}

/**
 * Generates an array of valid usernames one to two edits away from a wrong username.
 * 
 * @param {string} username The wrong username
 * @param {function} callback A function to call once all the suggestions have been found
 * @param {*} arg An optional argument for the callback
 */
async function moreSuggestions(username, callback, arg) {
    const ed1 = [...edits(username, false)];
    const set = new Set();
    ed1.forEach(edit => {
        edits(edit, true).forEach(username => set.add(username));
    });
    const ed2 = [...set];
    const ex = await existing(ed2);
    callback(ex, arg, false);
}

/**
 * Tests edits against the Steem blockchain usernames to filter the ones that exist.
 * 
 * @param {string} edits The edits to lookup
 * @returns {string[]} The existing usernames
 */
async function existing(edits) {
    const ex = [];
    for(let i = 0; i < edits.length; i += 10000) {
        try {
            const lookedUp = await steem.api.lookupAccountNamesAsync(edits.slice(i, i + 10000));
            for(let j = 0; j < lookedUp.length; j++) {
                if(lookedUp[j] != null) ex.push(lookedUp[j].name);
            }
        } catch(e) {
            i -= 10000; 
        }
    }
    return ex;
}

/**
 * Generates all the strings that are one edit away from a base string.
 * 
 * @param {string} base The base string
 * @param {boolean} mustBeValid Whether or not the generated strings must be valid usernames
 * @returns {Set} The set of edits
 */
function edits(base, mustBeValid) {
    const characters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','.','-'];
    const set = new Set();
    deletes(base, set, mustBeValid);
    inserts(base, characters, set, mustBeValid);
    replaces(base, characters, set, mustBeValid);
    transposes(base.split(""), set, mustBeValid);
    return set;
}

/**
 * Generates all the strings that are one delete away from a username.
 * 
 * @param {string} username The username used
 * @param {Set} set The set to add the edits to
 * @param {boolean} mustBeValid Whether or not the generated strings must be valid usernames
 */
function deletes(username, set, mustBeValid) {
    for(let i = 0; i < username.length; i++) {
        const del = username.substr(0, i) + username.substr(i + 1, username.length);
        if(!mustBeValid || !unallowedRegex.test(del)) set.add(del);
    }
}

/**
 * Generates all the strings that are one insert away from a username.
 * 
 * @param {string} username The username used
 * @param {string[]} characters The characters to use for inserts
 * @param {Set} set The set to add the edits to
 * @param {boolean} mustBeValid Whether or not the generated strings must be valid usernames
 */
function inserts(username, characters, set, mustBeValid) {
    for(let i = 0; i <= username.length; i++) {
        const firstPart = username.substr(0, i);
        const lastPart = username.substr(i, username.length);
        for(let j = 0; j < characters.length; j++) {
            const insert = firstPart + characters[j] + lastPart;
            if(!mustBeValid || !unallowedRegex.test(insert)) set.add(insert);
        }
    }
}

/**
 * Generates all the string that are one replace away from a username.
 * 
 * @param {string} username The username used
 * @param {string[]} characters The characters to use for replaces
 * @param {Set} set The set to add the edits to
 * @param {boolean} mustBeValid Whether or not the generated strings must be valid usernames
 */
function replaces(username, characters, set, mustBeValid) {
    for(let i = 0; i < username.length; i++) {
        const firstPart = username.substr(0, i);
        const lastPart = username.substr(i + 1, username.length);
        for(let j = 0; j < characters.length; j++) {
            const replace = firstPart + characters[j] + lastPart;
            if(!mustBeValid || !unallowedRegex.test(replace)) set.add(replace);
        }
    }
}

/**
 * Generates all the strings that are one transpose away from a username.
 * 
 * @param {string[]} splits The username used split into characters
 * @param {Set} set The set to add the edits to
 * @param {boolean} mustBeValid Whether or not the generated strings must be valid usernames
 */
function transposes(splits, set, mustBeValid) {
    for(let i = 0; i < splits.length; i++) {
        if(splits[i] != splits[i + 1]) {
            const temp = splits.slice();
            temp[i] = splits[i + 1];
            temp[i + 1] = splits[i];
            const transpose = temp.join("");
            if(!mustBeValid || !unallowedRegex.test(transpose)) set.add(transpose);
        }
    }
}