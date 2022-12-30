const fs = require('fs');

alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
reverseAlphanumeric = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
// create the dictionary to map the characters
var dictionary = {};

function mapDictionary() {
    for (var i = 0; i < alphanumeric.length; i++) {
        // add the character to the dictionary
        dictionary[alphanumeric[i]] = reverseAlphanumeric[i];
    }
}

function lengthOfString(string) {
    return string.length;
}

// generate an encoded string with atbash cipher with a provided string
function encode(string) {
    // map the dictionary
    mapDictionary();
    //create a variable to store the new cipher
    var cipherText = '';
    // loop through the string
    for (var i = 0; i < lengthOfString(string); i++) {
        // get the opposite character from the dictionary
        var char = dictionary[string[i]];
        // add the new character to the global variable cipherText
        cipherText += char;
    }
    // return the new cipher and original string when the function is called
    return cipherText;
}

// export the function as compliant with the CommonJS module system
module.exports = { encode };