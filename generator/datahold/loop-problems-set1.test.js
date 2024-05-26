// Note-: Recap of loops
/*
1) for Loop - The traditional for loop is a versatile method that allows you to iterate over an array by index.
2) forEach Method - The forEach method executes a provided function once for each array element. It's a higher-order function that takes a callback function as an argument.
3) for...of Loop - The for...of loop iterates over the values of an iterable object, such as an array.
4) map Method - The map method creates a new array populated with the results of calling a provided function on every element in the calling array. It's useful when you want to transform each element in the array.
5) filter Method - The filter method creates a new array with all elements that pass the test implemented by the provided function.
6) reduce Method - The reduce method executes a reducer function on each element of the array, resulting in a single output value.
7) for...in loop - Can be, but should not be used with Arrays. iterate over the enumerable properties of an object. However, when used with arrays, it iterates over the array indices rather than the array elements themselves. This behavior is different from the for...of loop, which iterates over the values of the array.
*/

// Notes-:
// for..Of Loop - get length of each string. return a number "array"
// for (_____of arr) {
function forOfLoop (arr) {
}

// Notes-:
// For Loop - add 5 to each number in array. return "array" with new values
function forLoop (arr) {
}

// Notes-:
// ForEach Loop - change to uppercase each string in array. return a "array"
function forEachLoop (arr) {
}

// Notes-:
// ForEach Loop - change the 3rd char to uppercase in each string
//                also add the index to the end of the string. return a array
//                sample: ["hello"] would be [`heLlo0`]
// hint#1
function forEachLoop2 (arr) {
}

// Notes-:
// map Loop - add 10 to each number. return "array"
// do not use an extra array as a bucket
// hint#2
// .....rn arr.map(.....
function mapLoop (arr) {
}

// Notes-:
// filter Loop - get words that start with "top". return array
// do not use an extra array as a bucket
// hint#3 - word
// ...kinda like map....
function filterLoop (arr) {
}

// Notes-:
// reduce Loop - sum all array items, but start with 101 in the bucket. return result
// do not use an extra array as a bucket
// ...kinda like map....
function reduceLoop (arr) {
}


const words = ['toper', 'tophe', 'tophs', 'tuesday', 'topis', 'toped', 'tree', 'topes', 'tophi', 'togo', 'topic', 'topoi'];
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
const myNumbers = [1, 2, 3, 4, 5, 6, 7,8 ,9, 10];


test('for..of Loop', () => {
    // const outArr = [];
    // for (const temp of arr) {
    //     outArr.push(temp.length);
    // }
    // return outArr;
    expect(forOfLoop(colors)).toEqual([3,6,6,5,4,6,6]);
});


test('for Loop', () => {
    // const outArr = [];
    // for (let i = 0; i < arr.length; i++) {
    //     outArr.push(arr[i] + 5)
    // }
    // return outArr;
    expect(forLoop(myNumbers)).toEqual([6,7,8,9,10,11,12,13,14,15]);
});


test('forEach Loop', () => {
    // const outArr = []
    // arr.forEach(item => {
    //     outArr.push(item.toUpperCase())
    // });
    // return outArr;
    expect(forEachLoop(colors)).toEqual(['RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'INDIGO', 'VIOLET']);
});


test('forEach Loop2', () => {
    // const outArr = []
    // arr.forEach((item, index) => {
    //     outArr.push(item.slice(0, 2) + item.charAt(2).toUpperCase() + item.slice(3) +index)
    // });
    // return outArr;
    expect(forEachLoop2(colors)).toEqual(['reD0', 'orAnge1', 'yeLlow2', 'grEen3', 'blUe4', 'inDigo5', 'viOlet6']);
});


test('map Loop', () => {
    // return arr.map(item => {
    //     return item + 10;
    // })
    expect(mapLoop(myNumbers)).toEqual([11, 12, 13, 14, 15, 16, 17,18 ,19, 20]);
});


test('filter Loop', () => {
    // return arr.filter(word => word.substring(0,3) === "top" );
    expect(filterLoop(words)).toEqual(['toper', 'tophe', 'tophs', 'topis', 'toped', 'topes', 'tophi', 'topic', 'topoi']);
});


test('reduce Loop', () => {
    // return arr.reduce((acc, curVal) => acc + curVal, 101);
    expect(reduceLoop(myNumbers)).toEqual(156);
});


























// // Export the functions
// module.exports = {
//     syntaxCreateEmptyLiteralArray,
// };



//hint#1 - chatAt(), slice(start, end), slice end is exclusive. meaning up to not including

//hint#2 - it returns a NEW array -  It's a higher-order function that takes a callback function as an argument and returns a new array.

//hint#3 - substring(start, end) - end is excluded