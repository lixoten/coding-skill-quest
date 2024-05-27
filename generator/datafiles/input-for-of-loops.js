const { fooArr, argsArr, j, words, colors, myNumbers, inventors } = require('./data');
let i = j;
//-----------------------------------------------------------//
//-----------------------------------------------------------//
//-----------------------------------------------------------//
//-----------------------------------------------------------//
const problemSetName = 'JavaScript for..of loops';



argsArr[++i] = words;
fooArr[i] = function getLengthOfWords(words) {
    // Get the length
    // Use for...of loop
    // Get length of each word. Return a number "array"
    // BUT, skip words that are 6 characters long.
    // And stop checking if you encounter the word "dang"
    // At end append 99 to that array
    // hint-syntax:for...of
    // hint-use break; continue; push()
    // hint-The for...of loop is a more modern and concise way to iterate over the elements of an array. It's particularly useful when you don't need to know the index of the current element.
    // result-array
    const outArr = [];
    for (const word of words) {
        if (word.length === 6) {
            continue;
        }
        if (word === "dang") {
            break;
        }
        outArr.push(word.length);
    }

    outArr.push(99);
    return outArr;
};


argsArr[++i] = myNumbers;
fooArr[i] = function addFiveToNumbers(numbers) {
    // Add five
    // Use for...of loop
    // Add 5 to each number in the **numbers array**. Return an **array** with new values
    // hint-syntax:for...of
    // use push()
    // result-array
    const outArr = [];
    for (const number of numbers) {
        outArr.push(number + 5)
    }
    return outArr;
};


argsArr[++i] = myNumbers;
fooArr[i] = function sumOfNumbers(numbers) {
    // Sum of Numbers
    // Use for...of loop
    // Take the values in **numbers array** and add them up. Return sum result.
    // hint-syntax:for...of
    // result-number
    let sum = 0;
    for (const number of numbers) {
        sum += number;
    }
    return sum;
}


argsArr[++i] = myNumbers;
fooArr[i] = function findLargestNumber(numbers) {
    // Finding the Largest Number
    // Use for...of loop
    // Finds the largest number in the array of **numbers**.
    // return: The largest number in the array.
    // hint-syntax:for..of
    // result-number
    let largest = numbers[0];
    for (const number of numbers) {
        if (number > largest) {
            largest = number;
        }
    }
    return largest;
}



argsArr[++i] = "hello world";
fooArr[i] = function countCharacters(string) {
    // Counting Characters
    // Use for...of loop
    // Counts the occurrences of each character in a given **string**.
    // return: An object where each key is a unique character found in the input string, and each value is the count of that character.
    // with for..off it gets even smaller
    // hint-syntax:for...of
    // result-object
    let charCount = {};
    for (const char of string) {
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
    // Use for...of loop
    // Converts all **words** in an array to uppercase.
    // return: An array of strings where all characters are converted to uppercase.
    // hint-syntax:for...of
    // result-array
    const outArr = []
    for (const word of words) {
        outArr.push(word.toUpperCase())
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