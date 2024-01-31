
function encrypt() {
    // Get key and message from user input
    var key = document.getElementById("key").value.toLowerCase().replace(/[^a-z]/g, '');
    var message = document.getElementById("message").value.toLowerCase().replace(/[^a-z]/g, '');

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