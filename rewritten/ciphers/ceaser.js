function randShift() {
    //return a random integer between 1 and 25
    return Math.floor(Math.random() * 25) + 1;
}

function stringLength(string) {
    //return the length of the string
    return string.length;
}

function shiftValue(shiftValue, character) {
    // return the character after it has been shifted by the shift value
    var charCode = character.charCodeAt(0);
    // shift the character by the shift value
    if (charCode >= 65 && charCode <= 90) {
        return String.fromCharCode(((charCode - 65 + shiftValue) % 26) + 65);
    }
    // if the character is a space or '' return a space
    if (character == ' ' || character == '') {
        return ' ';
    }
}

function encode(origString) {
    // create a variable to store the new cipher
    var newCipher = '';
    // create a variable to store the shift value
    var shift = randShift();
    // take each character in the string and shift it by the shift value
    for (var i = 0; i < stringLength(origString); i++) {
        // if the character is a space, add a space to the new cipher
        if (origString[i] == ' ' || origString[i] == '') {
            newCipher += ' ';
        } else {
            // if the character is not a space, shift it by the shift value
            newCipher += shiftValue(shift, origString[i]);
        }
    }
    // return the new cipher and original string when the function is called
    return newCipher;
}

// export the function as compliant with the CommonJS module system
module.exports = { encode };