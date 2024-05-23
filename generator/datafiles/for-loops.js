const problemSetName = 'JavaScript for loops';
let fooArr  = [];
//let instArr = [];
let argsArr = [];

const words     = ['toper', 'tophe', 'tophs', 'tuesday', 'topis', 'toped', 'tree', 'topes', 'tophi', 'togo', 'topic', 'topoi'];
const colors    = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
const myNumbers= [1, 2, 3, 4, 5, 6, 7,8 ,9, 10];
const inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
    { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
    { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
    { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
    { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
    { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

let i= 0

argsArr[i] = colors;
i[0] = ``;
fooArr[i] = function forOfLoop(words) {
    // for..Of Loop - get length of each words. return a number "array"
    // hint-for (_____of arr) {
    // hint-The for...of loop is a more modern and concise way to iterate over the elements of an array. It's particularly useful when you don't need to know the index of the current element.
    const outArr = [];
    for (const temp of words) {
        outArr.push(temp.length);
    }

    return outArr;
};


argsArr[++i] = myNumbers;
//instArr[i] = ``;
fooArr[i] = function forLoop(numbers) {
    // For Loop - add 5 to each number in array. return "array" with new values
    // hint-The traditional for loop is useful when you know the exact number of iterations you need to perform. It's straightforward and easy to understand.
    const outArr = [];
    for (let i = 0; i < numbers.length; i++) {
        outArr.push(numbers[i] + 5)
    }
    return outArr;
};


argsArr[++i] = myNumbers;
//instArr[i] = ``;
// console.log(sumOfNumbers([1, 2, 3, 4, 5])); // Output: 15
fooArr[i] = function sumOfNumbers(numbers) {
    // Sum of Numbers
    // Use a for loop. Write a JavaScript function that takes an array of numbers as input and returns the sum of all the numbers in the array.
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
}


argsArr[++i] = myNumbers;
//instArr[i] = ``;
fooArr[i] = function findLargestNumber(numbers) {
    // Finding the Largest Number
    // Use For loop - Write a JavaScript function that takes an array of numbers as input and returns the largest number in the array.
    let largest = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > largest) {
            largest = numbers[i];
        }
    }
    return largest;
}



argsArr[++i] = "hello world";
//instArr[i] = ``;
fooArr[i] = function countCharacters(string) {
    // Counting Characters
    // Write a JavaScript function that takes a string as input and returns the count of each character in the string.
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

// argsArr[++i] = [myNumbers];
// instArr[i] = ``;
// fooArr[i] =




argsArr[++i] = colors;
//instArr[i] = ``;
fooArr[i] = function forEachLoop(words) {
    // ForEach Loop - change to uppercase each word in array. return a "array"
    // hint-The forEach method is a higher-order function provided by JavaScript arrays. It executes a provided function once for each array element. It's a good choice when you want to perform an operation on each element of the array without needing to know the index.
    const outArr = []
    words.forEach(item => {
        outArr.push(item.toUpperCase())
    });

    return outArr;
};


argsArr[++i] = myNumbers;
//instArr[i] = ``;
fooArr[i] = function mapLoop(numbers) {
    // map Loop - add 10 to each number. return "array"
    // do not use an extra array as a bucket
    // hint-.....rn arr.map(.....
    // hint-it returns a NEW array -  It's a higher-order function that takes a callback function as an argument and returns a new array.
    // hint-The map method creates a new array with the results of calling a provided function on every element in the array. It's useful when you want to transform the elements of an array.
    return numbers.map(item => {
        return item + 10;
    })
};


argsArr[++i] = words;
//instArr[i] = ``;
fooArr[i] = function filterLoop(words) {
    // filter Loop - get words that start with "top". return array
    // do not use an extra array as a bucket
    // hint-...kinda like map....
    // hint-substring(start, end) - end is excluded
    // hint-The filter method creates a new array with all elements that pass the test implemented by the provided function. It's useful for filtering out elements based on a condition.
    return words.filter(word => word.substring(0,3) === "top" );
};


argsArr[++i] = inventors;
//instArr[i] = ``;
fooArr[i] = function filterLoop(inventors) {
    // filter Loop -  Filter the list of inventors for those who were born in the 1500's
    // hint-...kinda like map....
    // hint-The filter method creates a new array with all elements that pass the test implemented by the provided function. It's useful for filtering out elements based on a condition.
    return inventors.filter(inventor => (inventor.year >= 1500 && inventor.year <= 1599));
};



argsArr[++i] = myNumbers;
//instArr[i] = ``;
fooArr[i] = function reduceLoop(numbers) {
    // reduce Loop - sum all array numbers, but start with 101 in the bucket. return result
    // do not use an extra array as a bucket
    // hint-syntax: array.reduce(callback( accumulator, currentValue[, index[, array]] )[, initialValue])
    // hint-The reduce method applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single output value. It's useful for accumulating values or transforming the array into a single value.
    return numbers.reduce((acc, curVal) => acc + curVal, 101);
};


argsArr[++i] = '';
//instArr[i] = ``;
fooArr[i] = function helloWorld() {
    // return the string "Hello World!";
    // hint-REALLLY? do you reallyy need a hint? WTH!!!!
    return "Hello World!";
};


//------------------------------------------------------------------------//
//------------------------------------------------------------------------//
//------------------------------------------------------------------------//
//------------------------------------------------------------------------//
//------------------------------------------------------------------------//
//------------------------------------------------------------------------//
//module.exports = { fooArr, instArr, words, colors, myNumbers, argsArr };
//module.exports = { problemSetName, fooArr, instArr, argsArr };
module.exports = { problemSetName, fooArr, argsArr };