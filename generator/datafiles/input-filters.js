const { fooArr, argsArr, j, words, colors, myNumbers, inventors } = require('./data');
let i = j;
//-----------------------------------------------------------//
//-----------------------------------------------------------//
//-----------------------------------------------------------//
//-----------------------------------------------------------//
const problemSetName = 'JavaScript filter problems';


argsArr[++i] = words;
fooArr[i] = function getTopWords(words) {
    // Filter "top"
    // Get words that start with "top". return array
    // do not use an extra array as a bucket
    // hint-syntax:filter
    // hint-substring or startWith - substring(start, end) - end is excluded
    // result-array
    return words.filter(word => word.substring(0,3) === "top" );
};

argsArr[++i] = inventors;
fooArr[i] = function getInventors(inventors) {
    // Get Filter Inventors
    // Get and return inventors who lived between the years 1500 and 1599.
    // return: An array of inventor objects
    // hint-syntax:filter
    // result-object
    return inventors.filter(inventor => (inventor.year >= 1500 && inventor.year <= 1599));
};



argsArr[++i] = myNumbers;
fooArr[i] = function getEvenNumbers(numbers) {
    // Get even
    // Take the values in the **numbers array** and return an array of even numbers
    // do not use an extra array as a bucket
    // hint-syntax:filter
    // result-array
    return numbers.filter((num) => num % 2 === 0);
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