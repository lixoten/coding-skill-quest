// generator-json-file.js
// node generator-json-file.js filters
// node generator-json-file.js filters
const fs = require('fs');

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let DATASET_NAME;

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, ans => resolve(ans)));
}

async function main() {
    let fileName = process.argv[2]; //

    if (!fileName) {
        fileName = await askQuestion('Please enter the file name: ');
    }

    // if (fileName === "forloops" ||
    //     fileName === "forloop") {
    //     DATASET_NAME = 'for-loops';
    // } else if (fileName === "forof" || fileName === "for..of" || fileName === "for of"){
    //     DATASET_NAME = 'for-of-loops';
    // } else if (fileName === "filters" || fileName === "filter"){
    //     DATASET_NAME = 'filters';
    // } else if (fileName === "misc"){
    //     DATASET_NAME = 'misc';
    // } else if (fileName === "misc"){
    //     DATASET_NAME = 'misc';
    // } else if (fileName === "misc"){
    //     DATASET_NAME = 'misc';
    // } else{
    //     //DATASET_NAME = 'for-loops';
    //     DATASET_NAME = fileName;
    // }
    // @formatter:off
    const fileNameMap = {
        "forloops": "for-loops",
        "forloop":  "for-loops",

        "forof":    "for-of-loops",
        "for...of":  "for-of-loops",
        "for of":   "for-of-loops",

        "forin":    "for-in-loops",
        "for...in":  "for-in-loops",
        "for in":   "for-in-loops",

        "filters":  "filters",
        "filter":   "filters",
        "misc":     "misc"
    };
    // @formatter:on

    DATASET_NAME = fileNameMap[fileName] || fileName;


    //const OUTPUT_JSON_FILE = "../generator/data/js-" + DATASET_NAME + ".json";
    const path = require('path');
    //const OUTPUT_JSON_FILE = "js-" + DATASET_NAME + ".json";
    const OUTPUT_JSON_FILE = path.join(__dirname, '..', 'data', `js-${DATASET_NAME}.json`);

    //const INPUT_DATA_FILE = "input-" + DATASET_NAME + ".js";
    const INPUT_DATA_FILE = path.join(__dirname, 'datafiles', `input-${DATASET_NAME}.js`);

    // ... rest of your code ...
// const OUTPUT_JSON_FILE = "../data/js-" + DATASET_NAME + ".json";
// const INPUT_DATA_FILE = DATASET_NAME + ".js";
//const DATASET_NAME = process.argv[2] || 'for-loops'; // Use default value if no argument is provided
// const OUTPUT_JSON_FILE = "../data/js-" + DATASET_NAME + ".json";
// const INPUT_DATA_FILE = DATASET_NAME + ".js";

    let sourceCode = ``;
    let data;
    try {
        data = require(INPUT_DATA_FILE);
    } catch (error) {
        console.error('Error:', error.message);
        //throw new Error('Error: ' + error.message);
        console.error('Failed to load data. Please check the file path and try again.');
        //alert(error);
        process.exit(1);
    }

    let formattedFunction = data.fooArr.map((item, index) => {
        let formattedFunc = formatFunctionForJSON(item);
        sourceCode = formattedFunc;
        const fullFunction = extractFunctionBody(sourceCode)
        const comments = extractInstructionsAndHints(sourceCode, index);

        let solution;
        try {
            //if (comments.resultType === "wordInList") {
            if (comments.solutionList) {
                let userCrap = comments.solutionList;
                const temp = userCrap.replace(/\s+/g, ' ').trim();
                if (comments.resultType === "word") {
                    solution = temp.toLowerCase();
                } else { //word in list
                    const arr = temp.split(' ');
                    solution = arr.map(item => item.toLowerCase());
                }

            } else {
                //console.log(data.argsArr[index]);
                console.log(data.argsArr[index]);
                console.log([...data.argsArr[index]]);

                let x = data.argsArr[index];

                if (isPrimitive(x)) {
                    solution = eval(`(${formattedFunc})(x)`);
                } else {
                    solution = eval(`(${formattedFunc})([...x])`);
                }
            }


            //let x = [...data.argsArr[index]];
            //solution = eval(`(${formattedFunc})(x)`); // Use eval to execute the function with arguments

            //console.log(`Function ${index} executed successfully. Result: ${solution}`); // Debug log
        } catch (error) {
            solution = 'Error: Function execution failed';
            //console.log(`Error executing function ${index}: ${error.message}`); // Debug log
        }

        return {
            prob_id: index + 1,
            prob_type: comments.questionType,
            prob_name: comments.problemName,
            prob_problem: fullFunction,
            prob_args: data.argsArr[index],
            prob_solution: solution,
            prob_resultType: comments.resultType,
            prob_instructions: comments.instructions,
            prob_hints: comments.hints
        };
    });

    function isPrimitive(test) {
        return (test !== Object(test));
    }

    let date = new Date();
    let myTimestamp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let outputData = {
        name: myTimestamp + " " + data.problemSetName,
        data: formattedFunction
    };

    //fs.writeFile(`data/` + OUTPUT_JSON_FILE, JSON.stringify(outputData, "WTF", 2), (err) => {
    fs.writeFile(OUTPUT_JSON_FILE, JSON.stringify(outputData, null, 2), (err) => {
        if (err) {
            console.log("Danger danger will robinson!!!")
            throw err;
        } else {
            console.log("Written!!!: " + OUTPUT_JSON_FILE)
        }
    });

    function formatFunctionForJSON(func) {
        //let funcString = func.toString();
        //return funcString;
        return func.toString();
    }

    function extractInstructionsAndHints(sourceCode, index) {
        // First we split the source code into lines
        const lines = sourceCode.split('\n');


        // First line
        let problemName = "";


        // questionType are comments with // questionType-
        let questionType = 1;

        // Instruction are comments with //
        let instructions = [];

        // Instruction are comments with // hint-
        let hints = [];

        // ResultType are comments with // result-
        let resultType = "unknown";

        // ResultType are comments with // result-
        let solutionList = "";

        let foundQuestionType = false;
        let foundResultType = false;

        lines.forEach((line, idx) => {
            if (!line.trim().startsWith('//')) {
                return;
            }

            //console.log("xxx " +idx)

            if (idx === 1) { // note-: We assume the line 1, is always the problem name
                problemName = line.replace('//', '').trim();
            } else if (line.trim().startsWith('// hint-syntax')) { // Check if the line starts with a comment for hints
                let strippedLine = line.replace('// hint-syntax:', '').trim();//Hint: Syntax:
                strippedLine = getSyntax(strippedLine);
                hints.push(strippedLine);
            } else if (line.trim().startsWith('// hint-')) {
                const strippedLine = line.replace('// hint-', '').trim();
                hints.push(strippedLine);
            } else if (line.trim().startsWith('// questionType-')) { // Check if the line starts with a comment for questionType
                const strippedLine = line.replace('// questionType-', '').trim();
                questionType = parseInt(strippedLine);
                foundQuestionType = true;
            } else if (line.trim().startsWith('// result-')) { // Check if the line starts with a comment for result
                resultType = line.replace('// result-', '').trim();
                foundResultType = true;
            } else if (line.trim().startsWith('// solution-')) {
                solutionList = line.replace('// solution-', '').trim();
            } else if (line.trim().startsWith('//')) {
                const strippedLine = line.replace('//', '').trim();
                instructions.push(strippedLine);
            }
        });

        if (!foundQuestionType) console.error(`questionType is missing for ID: ${index}`)
        if (!foundResultType) console.error(`resultType is missing for ID: ${index}`)
        // Return the extracted details, instructions, and hints
        return {problemName, instructions, hints, resultType, questionType, solutionList};
    }

    function getSyntax(term) {

        let syntax;
        //let isFound = line.includes(term);
        switch (term) {
            case "for":
                syntax = "for (initialization; condition; iteration) {";
                break;
            case "for...of":
                syntax = "for (item of itemList {";
                break;
            case "foreach":
                syntax = "array.forEach(function(currentValue, index, arr), thisValue)";
                break;
            case "map":
                syntax = "array.map(callback(currentValue[, index[, array]])[, thisArg])";
                break;
            case "filter":
                syntax = "array.filter(callback(element[, index[, array]])[, thisArg])";
                break;
            case "reduce":
                syntax = `array.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue]);
            array.reduce((acc, curValue) => acc + num, 0);`;
                break;
            case "for...in":
                syntax = "for (property in object) {";
                break;
            case "do...while":
                syntax = `do {
  // Code to be executed
} while (condition);`;
                break;
            case "while":
                syntax = `while (condition) {
  // Code to be executed
}`;
                break;
            default:
                syntax = "Not found...";
                break;
        }

        return "Syntax: " + syntax;
    }


    function extractFunctionBody(sourceCode) {
        // Step 1: Remove comments from the source code
        return sourceCode
            .replace(/\/\*[\s\S]*?\*\//gm, '') // Remove /* */ comments
            .replace(/\/\/.*/gm, '') // Remove // comments
            .replace(/^\s*[\r\n]/m, ''); // Remove the first blank line
        // .replace(/^\s*[\r\n]/gm, ''); // Remove blank lines
        //return cleanedSourceCode;
    }

    rl.close();
}


main();

