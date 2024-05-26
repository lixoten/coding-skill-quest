const { fooArr, argsArr, j, words, colors, myNumbers, inventors } = require('./data');
let i = j;
//-----------------------------------------------------------//
//-----------------------------------------------------------//
//-----------------------------------------------------------//
//-----------------------------------------------------------//
const problemSetName = 'JavaScript for misc';


argsArr[++i] = 'Hi';
fooArr[i] = function justReturnTheWord(word) {
    // Misc.....................
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