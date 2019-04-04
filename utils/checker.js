const unallowedRegex = /(^|\.)[\d.-]|[.-](\.|$)|-{2}|.{17}|(^|\.).{0,2}(\.|$)/;

const checker = {
    suggestions
}

/**
 * Generates an array of valid usernames close to a wrong username.
 * 
 * @param {string} username The wrong username
 * @param {function} callback A function to call once all the suggestions have been found
 * @param {*} arg An optional argument for the callback
 */
async function suggestions(username, callback, arg) {
    const ed = [...edits(username)];
    const existing = [];
    for(let i = 0; i < ed.length; i += 10000) {
        const lookedUp = await steem.api.lookupAccountNamesAsync(ed.slice(i, i + 10000))
        for(let j = 0; j < lookedUp.length; j++) {
            if(lookedUp[j] != null) existing.push(lookedUp[j].name);
        }
    }
    callback(existing, arg);
}

/**
 * Generates all the strings that are one edit away from a username and that are allowed Steem usernames.
 * 
 * @param {string} username The username used
 */
function edits(username) {
    const characters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','.','-'];
    const set = new Set();
    deletes(username, set);
    inserts(username, characters, set);
    replaces(username, characters, set);
    transposes(username.split(""), set);
    return set;
}

/**
 * Generates all the strings that are one delete away from a username.
 * 
 * @param {string} username The username used
 * @param {Set} set The set to add the edits to
 */
function deletes(username, set) {
    for(let i = 0; i < username.length; i++) {
        const del = username.substr(0, i) + username.substr(i + 1, username.length);
        if(!unallowedRegex.test(del)) set.add(del);
    }
}

/**
 * Generates all the strings that are one insert away from a username.
 * 
 * @param {string} username The username used
 * @param {string[]} characters The characters to use for inserts
 * @param {Set} set The set to add the edits to
 */
function inserts(username, characters, set) {
    for(let i = 0; i <= username.length; i++) {
        const firstPart = username.substr(0, i);
        const lastPart = username.substr(i, username.length);
        for(let j = 0; j < characters.length; j++) {
            const insert = firstPart + characters[j] + lastPart;
            if(!unallowedRegex.test(insert)) set.add(insert);
        }
    }
}

/**
 * Generates all the string that are one replace away from a username.
 * 
 * @param {string} username The username used
 * @param {string[]} characters The characters to use for replaces
 * @param {Set} set The set to add the edits to
 */
function replaces(username, characters, set) {
    for(let i = 0; i < username.length; i++) {
        const firstPart = username.substr(0, i);
        const lastPart = username.substr(i + 1, username.length);
        for(let j = 0; j < characters.length; j++) {
            const replace = firstPart + characters[j] + lastPart;
            if(!unallowedRegex.test(replace)) set.add(replace);
        }
    }
}

/**
 * Generates all the strings that are one transpose away from a username.
 * 
 * @param {string[]} splits The username used split into characters
 * @param {Set} set The set to add the edits to
 */
function transposes(splits, set) {
    for(let i = 0; i < splits.length; i++) {
        if(splits[i] != splits[i + 1]) {
            const temp = splits.slice();
            temp[i] = splits[i + 1];
            temp[i + 1] = splits[i];
            const transpose = temp.join("");
            if(!unallowedRegex.test(transpose)) set.add(transpose);
        }
    }
}