//create a DOM listener to listen for the Generate button to be clicked
document.getElementById('GenerateCipher').addEventListener('click', function() {
    // submit a POST request to the server to generate a new cipher
    fetch('/api/newcipher', {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain'
        }
    }).then(async function(response) {
        // if the response is good, grab the encoded string from the response
        if (response.ok) {
            // take the response html/text and display it to the client
            const ciphertext = await response.text();
            // display the encoded string to the client
            document.getElementById('cipher').innerHTML = ciphertext;
        }
    }).catch(function(error) {
        alert('Unable to connect to the server:1 ' + error);
    }).catch(function(error) {
        alert('Unable to connect to the server:2 ' + error);
    });
});
//create a DOM listener to listen for the Check Answer button to be clicked
document.getElementById('checkAnswer').addEventListener('click', function() {
    // grab the answer from the client
    var answer = document.getElementById('answer').value;
    // submit a POST request to the server to check the answer
    fetch('/api/decode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            originalString: answer
        })
    }).then(async function(response) {
        // if the response is good, grab the result from the response
        if (response.ok) {
            const result = await response.text();
            // display the result to the client
            document.getElementById('result').innerHTML = result;
        }
    }).catch(function(error) {
        alert('Unable to connect to the server:3 ' + error);
    }).catch(function(error) {
        alert('Unable to connect to the server:4 ' + error);
    });
});