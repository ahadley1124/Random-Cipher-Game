const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const fs = require('fs');
const rateLimit = require('express-rate-limit');
const atBash = require('./ciphers/atbash.js');
const ceaserCipher = require('./ciphers/ceaser.js');

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.enable('Content-Security-Policy');
// implement a rate limiter
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 50 // limit each IP to 50 requests per windowMs
});
app.use(limiter);

app.get('/', (req, res) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://unpkg.com/axios/dist/axios.min.js");
    res.setHeader("Cross-Origin-Embedder-Policy", "coss-origin")
    res.sendFile(__dirname + '/site/index.html');
});
app.get('/main.js', (req, res) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://unpkg.com/axios/dist/axios.min.js");
    res.sendFile(__dirname + '/site/main.js');
});

//generate a random string to pass to the functions
function randomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

// create a function to randomly choose a cipher
function randomCipher() {
    var cipher = Math.floor(Math.random() * 2);
    if (cipher == 0) {
        return "atbash";
    } else {
        return "ceaser";
    }
}

// create a function to save the originalString and encodedString to a file
function saveToFile(originalString, encodedString, cipher) {
    var data = {
        originalString: originalString,
        encodedString: encodedString,
        cipher: cipher
    }
    fs.writeFile('data/cipher.json', JSON.stringify(data), (err) => {
        if (err) throw err;
        //console.log the current date and time and 'Data written to file' to the console
        console.log(Date(Date.now()) + ' Data written to file');
    });
}

// create a function to get the data from the file
function getData() {
    const data = fs.readFileSync('data/cipher.json');
    const originalString = JSON.parse(data).originalString;
    return originalString;
}

function isCorrect(submittedString) {
    var originalString = getData();
    if (originalString == submittedString) {
        return true;
    } else {
        return false;
    }
}

app.get('/api/newcipher', (req, res) => {
    var originalString = randomString();
    var cipher = randomCipher();
    if (cipher == "atbash") {
        var encodedString = atBash.encode(originalString);
    } else if (cipher == "ceaser") {
        var encodedString = ceaserCipher.encode(originalString);
    }
    saveToFile(originalString, encodedString, cipher);
    res.send(encodedString);
});

app.post('/api/decode', (req, res) => {
    var submittedString = req.body.originalString;
    var result = isCorrect(submittedString);
    res.send(result);
});


app.listen(9900, () => {
    console.log('listening on port 9900');
});