const { fooArr, argsArr, j, words, colors, myNumbers, inventors } = require('./data');
let i = j;
//-----------------------------------------------------------//
//-----------------------------------------------------------//
//-----------------------------------------------------------//
//-----------------------------------------------------------//
const problemSetName = 'JavaScript filter problems';


argsArr[++i] = 'Hi';
fooArr[i] = function justReturnTheWord(word) {
    // Just a word!!
    // return the word
    // hint-There is no need to know what the word is. just return it knucklehead
    // result-string
    return word;
};


argsArr[++i] = "";
fooArr[i] = function xxxxx(xx) {
    // CLI
    // What is CLI?
    // questionType-2
    // hint-Text based...
    // result-word
    // solution-Client Line Interface
    return xx;
};




argsArr[++i] = "";
fooArr[i] = function xxxxx(xx) {
    // yellow red blue, blue red yellow
    // return the word in the string zfsdfsdf
    // questionType-2
    // hint-There is ????
    // result-wordInList
    // solution-red orange yellow green blue violet indigo
    return xx;
};



argsArr[++i] = colors;
fooArr[i] = function getLengthOfWords(words) {
    // Get the length
    // questionType-1
    // for...js-for-loops.jsonOf Loop - get length of each word. Return a number "array"
    // hint-syntax:for...of
    // hint-The for...of loop is a more modern and concise way to iterate over the elements of an array. It's particularly useful when you don't need to know the index of the current element.
    // result-array
    const outArr = [];
    for (const temp of words) {
        outArr.push(temp.length);
    }

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


argsArr[++i] = myNumbers;
fooArr[i] = function addTenToNumbers(numbers) {
    // Add 10 Map Method
    // map Loop - Adds ten to each number in an array.
    // return: An array of numbers where each number has been increased by ten.
    // try not to use an extra array as a bucket
    // hint-syntax:map
    // hint-it returns a NEW array -  It's a higher-order function that takes a callback function as an argument and returns a new array.
    // hint-The map method creates a new array with the results of calling a provided function on every element in the array. It's useful when you want to transform the elements of an array.
    // result-array
    return numbers.map(item => {
        return item + 10;
    })
};


argsArr[++i] = words;
fooArr[i] = function getTopWords(words) {
    // Filter "top"
    // filter Loop - get words that start with "top". return array
    // do not use an extra array as a bucket
    // hint-syntax:filter
    // hint-...kinda like map....
    // hint-substring(start, end) - end is excluded
    // hint-The filter method creates a new array with all elements that pass the test implemented by the provided function. It's useful for filtering out elements based on a condition.
    // result-array
    return words.filter(word => word.substring(0,3) === "top" );
};


argsArr[++i] = inventors;
fooArr[i] = function getInventors(inventors) {
    // Get Filter Inventors
    // filter Loop -  Filters an array of inventors to return only those who lived between the years 1500 and 1599.
    // return: An array of inventor objects who lived between the years 1500 and 1599.
    // hint-syntax:filter
    // hint-The filter method creates a new array with all elements that pass the test implemented by the provided function. It's useful for filtering out elements based on a condition.
    // result-object
    return inventors.filter(inventor => (inventor.year >= 1500 && inventor.year <= 1599));
};


argsArr[++i] = inventors;
fooArr[i] = function getInventorsFullname(inventors) {
    // Get All Inventors Full names
    // filter Loop - Maps over an array of inventor objects and returns a new array containing full names of the inventors.
    // Each inventor object is expected to have `first` and `last` properties representing the inventor's first and last names.
    // return: A new array of strings, where each string is the full name of an inventor.
    // hint-syntax:map
    // hint-Concat with + " " + or use backticks '
    // result-array
    return inventors.map((inventor) => `${inventor.first} ${inventor.last}`);
};



argsArr[++i] = myNumbers;
fooArr[i] = function reduceLoop(numbers) {
    // Reduce Method
    // reduce Loop - sum all array **numbers**, but start with 101 in the bucket. return result
    // Result: The sum of the accumulator (initially 101) and all numbers in the array.
    // hint-syntax:reduce
    // hint-Always returns a single value
    // hint-The reduce method applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single output value. It's useful for accumulating values or transforming the array into a single value.
    // result-number
    return numbers.reduce((acc, curVal) => acc + curVal, 101);
};

argsArr[++i] = myNumbers;
fooArr[i] = function getEvenNumbers(numbers) {
    // Get even
    // Get the even numbers from the reduce Loop - sum all array numbers, but start with 101 in the bucket. return result
    // do not use an extra array as a bucket
    // hint-syntax:filter
    // result-array
    return numbers.filter((num) => num % 2 === 0);
};

argsArr[++i] = myNumbers;
fooArr[i] = function tripleNumbers(numbers) {
    // Triple Numbers
    // Triples each number in an array.
    // Result:  An array of numbers where each number has been multiplied by three.
    // hint-syntax:map
    // result-array
    return numbers.map((num) => num * 3);
};

argsArr[++i] = myNumbers;
fooArr[i] = function sumNumbers(numbers) {
    // Sum Numbers
    // Sums up all numbers in an array.
    // return: The sum of all numbers in the array.
    // do not use an extra array as a bucket
    // hint-syntax:reduce
    // result-number
    return numbers.reduce((acc, curVal) => acc + curVal);

};

argsArr[++i] = myNumbers;
fooArr[i] = function sumOfTripledEvens(numbers) {
    // Get Even-Triple-Sum Numbers
    // Calculates the sum of all even numbers in an array, after tripling each of them.
    // Result: The sum of all tripled even numbers in the array.
    // do not use an extra array as a bucket
    // hint-syntax:filter
    // hint-syntax:map
    // hint-syntax:reduce
    // result-number
    const evens = numbers.filter((num) => num % 2 === 0);
    const trippled = evens.map((num) => num * 3);
    const sum = trippled.reduce((acc, curVal) => acc + curVal);
    return sum;
};



argsArr[++i] = '';
fooArr[i] = function returnHelloWorld() {
    // Hello World!
    // Returns the string "Hello World!".
    // hint-REALLLY? do you reallyy need a hint? WTH!!!!
    // result-string
    return "Hello World!";
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