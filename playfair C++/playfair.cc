#include <bits/stdc++.h>
using namespace std;

string prepareMessage(const string &message)
{
    string cleanedMessage;
    for (char ch : message)
    {
        if (isalpha(ch))
        {
            cleanedMessage += tolower(ch);
        }
    }
    return cleanedMessage;
}

string generateDigrams(const string &message)
{
    string digrams;
    for (size_t i = 0; i < message.size(); i += 2)
    {
        char firstChar = message[i];
        char secondChar = (i + 1 < message.size()) ? message[i + 1] : 'x';
        digrams += firstChar;
        digrams += secondChar;
    }
    return digrams;
}

string encryptDigram(const string &digram, const vector<vector<char>> &matrix)
{
    // Implement Playfair cipher rules for encrypting a digram
    char char1 = digram[0];
    char char2 = digram[1];

    size_t row1, col1, row2, col2;

    // Find positions of characters in the matrix
    for (size_t i = 0; i < matrix.size(); ++i)
    {
        for (size_t j = 0; j < matrix[i].size(); ++j)
        {
            if (matrix[i][j] == char1)
            {
                row1 = i;
                col1 = j;
            }
            if (matrix[i][j] == char2)
            {
                row2 = i;
                col2 = j;
            }
        }
    }

    if (row1 == row2)
    {
        // Same row, shift columns
        col1 = (col1 + 1) % 5;
        col2 = (col2 + 1) % 5;
    }
    else if (col1 == col2)
    {
        // Same column, shift rows
        row1 = (row1 + 1) % 5;
        row2 = (row2 + 1) % 5;
    }
    else
    {
        // Different row and column, swap columns
        swap(col1, col2);
    }

    char encryptedChar1 = matrix[row1][col1];
    char encryptedChar2 = matrix[row2][col2];

    return string(1, encryptedChar1) + string(1, encryptedChar2);
}

void printMatrix(const vector<vector<char>> &matrix)
{
    for (const auto &row : matrix)
    {
        for (char ch : row)
        {
            cout << ch << " ";
        }
        cout << endl;
    }
}

int main()
{
    string key;
    cout << "Enter the key (without spaces): ";
    cin >> key;

    // Create Playfair cipher matrix
    vector<vector<char>> matrix(5, vector<char>(5));
    unordered_set<char> uniqueChars;

    // Fill the matrix with the unique characters from the key
    size_t row = 0, col = 0;
    for (char ch : key)
    {
        if (uniqueChars.find(ch) == uniqueChars.end())
        {
            matrix[row][col] = ch;
            uniqueChars.insert(ch);
            col++;
            if (col == 5)
            {
                col = 0;
                row++;
            }
        }
    }

    // Fill the remaining matrix with the remaining alphabet (excluding 'j')
    for (char ch = 'a'; ch <= 'z'; ++ch)
    {
        if (ch != 'j' && uniqueChars.find(ch) == uniqueChars.end())
        {
            matrix[row][col] = ch;
            uniqueChars.insert(ch);
            col++;
            if (col == 5)
            {
                col = 0;
                row++;
            }
        }
    }

    // Print the Playfair cipher matrix
    cout << "Playfair Cipher Matrix:" << endl;
    printMatrix(matrix);

    string message;
    cout << "Enter the message: ";
    cin.ignore(); // Ignore newline from previous input
    getline(cin, message);

    // Step 1: Prepare the message
    string cleanedMessage = prepareMessage(message);

    // Step 2: Generate digrams from the prepared message
    string digrams = generateDigrams(cleanedMessage);

    // Step 3: Encrypt each digram using the Playfair cipher
    string encryptedMessage;
    for (size_t i = 0; i < digrams.size(); i += 2)
    {
        string digram = digrams.substr(i, 2);
        string encryptedDigram = encryptDigram(digram, matrix);
        encryptedMessage += encryptedDigram;
    }

    // Display the encrypted message
    cout << "Encrypted Message: " << encryptedMessage << endl;

    return 0;
}
