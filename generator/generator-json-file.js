// generator-json-file.js
// generator-json-file filters
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

    if (fileName === "forloops"){
        DATASET_NAME = 'for-loops';
    } else if (fileName === "filters"){
        DATASET_NAME = 'filters';
    } else{
        DATASET_NAME = 'for-loops';
    }

    const OUTPUT_JSON_FILE = "../data/js-" + DATASET_NAME + ".json";
    const INPUT_DATA_FILE = "input-" + DATASET_NAME + ".js";

    // ... rest of your code ...
// const OUTPUT_JSON_FILE = "../data/js-" + DATASET_NAME + ".json";
// const INPUT_DATA_FILE = DATASET_NAME + ".js";
//const DATASET_NAME = process.argv[2] || 'for-loops'; // Use default value if no argument is provided
// const OUTPUT_JSON_FILE = "../data/js-" + DATASET_NAME + ".json";
// const INPUT_DATA_FILE = DATASET_NAME + ".js";

    let sourceCode = ``;
    const data = require('./datafiles/'+INPUT_DATA_FILE);

    let formattedFuncs = data.fooArr.map((item, index) => {
        let formattedFunc = formatFunctionForJSON(item);
        sourceCode = formattedFunc;
        const fullFunction = extractFunctionBody(sourceCode)
        const comments = extractInstructionsAndHints(sourceCode, index);
        //console.log(formattedFunc);
        //console.log(fullFunction);
        //console.log(comments);



        let solution;
        try {
            //if (comments.resultType === "wordInList") {
            if (comments.solutionList) {
                let userCrap  = comments.solutionList;
                const temp = userCrap.replace(/\s+/g, ' ').trim();
                if (comments.resultType === "word") {
                    solution = temp.toLowerCase();
                } else { //word in lisr
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
    let myTimestamp = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    let outputData = {
        name: myTimestamp + "-" + data.problemSetName,
        data: formattedFuncs
    };

    fs.writeFile(`./data/` + OUTPUT_JSON_FILE, JSON.stringify(outputData, "WTF", 2), (err) => {
        if (err) {
            console.log("Danger danger will robinson!!!")
            throw err;
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

            //console.log("dddddddddddddddddddddddddddd : " +idx)

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
                const strippedLine = line.replace('// result-', '').trim();
                resultType = strippedLine;
                foundResultType = true;
            } else if (line.trim().startsWith('// solution-')) {
                const strippedLine = line.replace('// solution-', '').trim();
                solutionList = strippedLine;
            } else if (line.trim().startsWith('//')) {
                const strippedLine = line.replace('//', '').trim();
                instructions.push(strippedLine);
            }
        });

        if (!foundQuestionType) console.error(`questionType is missing for ID: ${index}`)
        if (!foundResultType) console.error(`resultType is missing for ID: ${index}`)
        // Return the extracted details, instructionnnnnnns, and hints
        return { problemName,  instructions, hints, resultType, questionType, solutionList};
    }

    function getSyntax(term) {

        let syntax = "";
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
        const cleanedSourceCode = sourceCode
            .replace(/\/\*[\s\S]*?\*\//gm, '') // Remove /* */ comments
            .replace(/\/\/.*/gm, '') // Remove // comments
            .replace(/^\s*[\r\n]/m, ''); // Remove the first blank line
        // .replace(/^\s*[\r\n]/gm, ''); // Remove blank lines
        return cleanedSourceCode;
    }

    rl.close();
}


main();

