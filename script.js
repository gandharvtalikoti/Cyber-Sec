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

    return "Encrypted: " + encryptedMessage;
}
