export function arraysEqual(a, b) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }

    return true;
}


export function areObjectsEqualUsingStringify(obj1, obj2) {
    const strObj1 = JSON.stringify(obj1);
    const strObj2 = JSON.stringify(obj2);

    return strObj1 === strObj2;
}

// 10