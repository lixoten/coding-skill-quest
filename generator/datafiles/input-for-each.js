const { fooArr, argsArr, j, words, colors, myNumbers, inventors } = require('./data');
let i = j;
//-----------------------------------------------------------//
//-----------------------------------------------------------//
//-----------------------------------------------------------//
//-----------------------------------------------------------//
const problemSetName = 'JavaScript for each';



argsArr[++i] = words;
fooArr[i] = function getLengthOfWords(words) {
    // Get the length
    // questionType-1
    // for...js-for-loops.jsonOf Loop - get length of each word. Return a number "array"
    // BUT, skip words that are 6 characters long.
    // And stop checking if you encounter the word "dang"
    // At end append 99 to that array
    // hint-syntax:for...of
    // hint-use break; continue;
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
    // For Loop - add 5 to each number in the **numbers array**. Return an **array** with new values
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
    // For loop. Take the values in **numbers array** and add them up. Return sum result.
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
    // Use For loop - Finds the largest number in an array of **numbers**.
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
    // Counts the occurrences of each character in a given **string**.
    // return: An object where each key is a unique character found in the input string, and each value is the count of that character.
    // with for..off it gets even smaller
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
    // ForEach Loop - Converts all **words** in an array to uppercase.
    // return: An array of strings where all characters are converted to uppercase.
    // hint-syntax:foreach
    // hint-The forEach method is a higher-order function provided by JavaScript arrays. It executes a provided function once for each array element. It's a good choice when you want to perform an operation on each element of the array without needing to know the index.
    // result-array
    const outArr = []
    words.forEach(item => {
        outArr.push(item.toUpperCase())
    });

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