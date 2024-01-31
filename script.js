function encrypt() {
  // Get key and message from user input
  var key = document
    .getElementById("key")
    .value.toLowerCase()
    .replace(/[^a-z]/g, "");
  var message = document
    .getElementById("message")
    .value.toLowerCase()
    .replace(/[^a-z]/g, "");

  // Check if key and message are provided
  if (key.length === 0 || message.length === 0) {
    alert("Please enter both key and message.");
    return;
  }

  // Create Playfair cipher matrix
  var matrix = createMatrix(key);

  // Encrypt the message using Playfair cipher
  var encryptedMessage = playfairEncrypt(message, matrix);

  // Display the encrypted message
  document.getElementById("cipher").value = encryptedMessage;
}

function createMatrix(key) {
  var alphabet = "abcdefghiklmnopqrstuvwxyz";
  var matrix = [];

  // Create matrix with unique characters from the key
  for (var i = 0; i < key.length; i++) {
    if (!matrix.includes(key[i])) {
      matrix.push(key[i]);
    }
  }

  // Fill the matrix with remaining characters from the alphabet
  for (var j = 0; j < alphabet.length; j++) {
    if (!matrix.includes(alphabet[j])) {
      matrix.push(alphabet[j]);
    }
  }

  return matrix;
}

function playfairEncrypt(message, matrix) {
    // Step 1: Prepare the message by removing non-alphabetic characters and grouping letters
    var cleanedMessage = prepareMessage(message);

    // Step 2: Generate pairs of digrams from the prepared message
    var digrams = generateDigrams(cleanedMessage);

    // Step 3: Encrypt each digram using the Playfair cipher rules
    var encryptedMessage = "";
    for (var i = 0; i < digrams.length; i++) {
        var digram = digrams[i];
        var encryptedDigram = encryptDigram(digram, matrix);
        encryptedMessage += encryptedDigram;
    }

    return encryptedMessage;
}

function prepareMessage(message) {
    // Remove non-alphabetic characters and convert to lowercase
    return message.replace(/[^a-z]/g, '').toLowerCase();
}

function generateDigrams(message) {
    var digrams = [];
    for (var i = 0; i < message.length; i += 2) {
        var firstChar = message[i];
        var secondChar = (i + 1 < message.length) ? message[i + 1] : 'x';
        digrams.push(firstChar + secondChar);
    }
    return digrams;
}

function encryptDigram(digram, matrix) {
    // Implement the Playfair cipher rules for encrypting a digram
    var char1 = digram[0];
    var char2 = digram[1];

    var index1 = matrix.indexOf(char1);
    var index2 = matrix.indexOf(char2);

    var row1 = Math.floor(index1 / 5);
    var col1 = index1 % 5;

    var row2 = Math.floor(index2 / 5);
    var col2 = index2 % 5;

    if (row1 === row2) {
        // Same row, shift columns
        col1 = (col1 + 1) % 5;
        col2 = (col2 + 1) % 5;
    } else if (col1 === col2) {
        // Same column, shift rows
        row1 = (row1 + 1) % 5;
        row2 = (row2 + 1) % 5;
    } else {
        // Different row and column, swap columns
        var temp = col1;
        col1 = col2;
        col2 = temp;
    }

    var encryptedChar1 = matrix[row1 * 5 + col1];
    var encryptedChar2 = matrix[row2 * 5 + col2];

    return encryptedChar1 + encryptedChar2;
}

