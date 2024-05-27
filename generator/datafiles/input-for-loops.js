const { fooArr, argsArr, j, words, colors, myNumbers, inventors } = require('./data');
let i = j;
//-----------------------------------------------------------//
//-----------------------------------------------------------//
//-----------------------------------------------------------//
//-----------------------------------------------------------//
const problemSetName = 'JavaScript for loops';



argsArr[++i] = words;
fooArr[i] = function getLengthOfWords(words) {
    // Get the length
    // Use traditional for-loop
    // Get length of each word. Return a number "array"
    // BUT, skip words that are 6 characters long.
    // And stop checking if you encounter the word "dang"
    // At end append 99 to that array
    // hint-syntax:for
    // hint-use break; continue;
    // result-array
    const outArr = [];
    for (let i = 0; i < words.length; i++) {
        if (words[i].length === 6) {
            continue;
        }
        if (words[i] === "dang") {
            break;
        }
        outArr.push(words[i].length);
    }

    outArr.push(99);
    return outArr;
};


argsArr[++i] = myNumbers;
fooArr[i] = function addFiveToNumbers(numbers) {
    // Add five
    // Use traditional for-loop
    // Add 5 to each number in the **numbers array**. Return an **array** with new values
    // hint-syntax:for
    // hint-The traditional for loop is useful when you know the exact number of iterations you need to perform. It's straightforward and easy to understand.
    // result-array
    const outArr = [];
    for (let i = 0; i < numbers.length; i++) {
        outArr.push(numbers[i] + 5)
    }
    return outArr;
};


argsArr[++i] = myNumbers;
fooArr[i] = function sumOfNumbers(numbers) {
    // Sum of Numbers
    // Use traditional for-loop
    // Take the values in **numbers array** and add them up. Return sum result.
    // hint-syntax:for
    // result-number
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
}


argsArr[++i] = myNumbers;
fooArr[i] = function findLargestNumber(numbers) {
    // Finding the Largest Number
    // Use traditional for-loop
    // Finds the largest number in an array of **numbers**.
    // return: The largest number in the array.
    // hint-syntax:for
    // result-number
    let largest = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > largest) {
            largest = numbers[i];
        }
    }
    return largest;
}



argsArr[++i] = "hello world";
fooArr[i] = function countCharacters(string) {
    // Counting Characters
    // Use traditional for-loop
    // Counts the occurrences of each character in a given **string**.
    // return: An object where each key is a unique character found in the input string, and each value is the count of that character.
    // hint-syntax:for
    // result-object
    let charCount = {};
    for (let i = 0; i < string.length; i++) {
        let char = string[i];
        if (charCount[char]) {
            charCount[char]++;
        } else {
            charCount[char] = 1;
        }
    }
    return charCount;
}

argsArr[++i] = colors;
fooArr[i] = function changeAllToUppercase(words) {
    // Change to Uppercase
    // Use traditional for-loop
    // Converts all **words** in an array to uppercase.
    // return: An array of strings where all characters are converted to uppercase.
    // hint-syntax:for
    // result-array
    const outArr = []
    for (let i = 0; i < words.length; i++) {
        outArr.push(words[i].toUpperCase())
    }

    return outArr;
};


console.log(`Total Problems: ${i}`);

//------------------------------------------------------------------------//
//------------------------------------------------------------------------//
//------------------------------------------------------------------------//
//------------------------------------------------------------------------//
//------------------------------------------------------------------------//
//------------------------------------------------------------------------//
//module.exports = { fooArr, instArr, words, colors, myNumbers, argsArr };
//module.exports = { problemSetName, fooArr, instArr, argsArr };
module.exports = { problemSetName, fooArr, argsArr };