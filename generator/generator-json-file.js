const fs = require('fs');
const DATASET_NAME = process.argv[2] || 'for-loops'; // Use default value if no argument is provided
const OUTPUT_JSON_FILE = "../data/js-" + DATASET_NAME + ".json";
const INPUT_DATA_FILE = 'for-loops' + ".js";

let sourceCode = ``;
const data = require('./datafiles/'+INPUT_DATA_FILE);

let formattedFuncs = data.fooArr.map((item, index) => {
    let formattedFunc = formatFunctionForJSON(item);
    sourceCode = formattedFunc;
    const fullFunction = extractFunctionBody(sourceCode)
    const comments = extractInstructionsAndHints(sourceCode);
    //console.log(formattedFunc);
    //console.log(fullFunction);
    //console.log(comments);

    let solution;
    try {
        //console.log(data.argsArr[index]);
        let x = [...data.argsArr[index]];
        //solution = eval(`(${formattedFunc})(...data.argsArr[index])`); // Use eval to execute the function with arguments
        solution = eval(`(${formattedFunc})(x)`); // Use eval to execute the function with arguments

        //console.log(`Function ${index} executed successfully. Result: ${solution}`); // Debug log
    } catch (error) {
        solution = 'Error: Function execution failed';
        //console.log(`Error executing function ${index}: ${error.message}`); // Debug log
    }

    return {
        id: index + 1,
        instructions: comments.instructions,
        hints: comments.hints,
        problem: fullFunction,
        arguments: data.argsArr[index],
        solution: solution

    };
});

let outputData = {
    name: data.problemSetName,
    data: formattedFuncs
};

fs.writeFile(`./data/` + OUTPUT_JSON_FILE, JSON.stringify(outputData, null, 2), (err) => {
    if (err) throw err;
});

function formatFunctionForJSON(func) {
    //let funcString = func.toString();
    //return funcString;
    return func.toString();
}

function extractInstructionsAndHints(sourceCode) {
    // First we split the source code into lines
    const lines = sourceCode.split('\n');

    // Instruction are comments with //
    let instructions = [];

    // Instruction are comments with // hint-
    let hints = [];

    lines.forEach(line => {
        if (line.trim().startsWith('// hint-')) { // Check if the line starts with a comment
            const strippedLine = line.replace('// hint-', 'Hint: ').trim();
            hints.push(strippedLine);
        } else if (line.trim().startsWith('//')) {
            const strippedLine = line.replace('//', '').trim();
            instructions.push(strippedLine);
        }
    });

    // Return the extracted details, instructionnnnnnns, and hints
    return { instructions, hints};
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