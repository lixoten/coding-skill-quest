export function arraysEqual(a, b) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }

    return true;
}


export function areInWordList(userCrap, solution) {
    const temp = userCrap.replace(/\s+/g, ' ').trim();
    const arr = temp.split(' ');
    const finalArray = arr.map(item => item.toLowerCase());
    //const strObj1 = finalArray;
    //const strObj2 = solution;

    return finalArray.every(word => solution.includes(word));

}



export function areWordEqual(obj1, obj2) {
    const normalizedInput = obj1.replace(/\s+/g, ' ').toLowerCase().trim();
    const strObj1 = JSON.stringify(normalizedInput);
    const strObj2 = JSON.stringify(obj2);

    return strObj1 === strObj2;
}



export function areObjectsEqualUsingStringify(obj1, obj2) {
    const strObj1 = JSON.stringify(obj1);
    const strObj2 = JSON.stringify(obj2);

    return strObj1 === strObj2;
}


export function areNumbersEqual(userSolution,  problemSolution) {
    if (typeof problemSolution !== "number") {
        return false
    }
    return userSolution === problemSolution;
}

export function areStringsEqual(userSolution,  problemSolution) {
    if (typeof problemSolution !== "string") {
        return false
    }
    return userSolution === problemSolution;
}

// 10