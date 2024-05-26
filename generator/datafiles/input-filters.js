const { fooArr, argsArr, j, words, colors, myNumbers, inventors } = require('./data');
let i = j;
//-----------------------------------------------------------//
//-----------------------------------------------------------//
//-----------------------------------------------------------//
//-----------------------------------------------------------//
const problemSetName = 'JavaScript filter problems';

// note-: Rewrire to use reduce
argsArr[++i] = myNumbers;
fooArr[i] = function sumOfNumbers(numbers) {
    // Filters.....................
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