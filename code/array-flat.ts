/**
 * 实现数组扁平化
 */

const arr = [1, [2, [3, [4, [5]], 6]], 7];

// 1. ES6 自带
const arr1 = arr.flat(Infinity);
console.log(arr1);

// 2. 递归
function flatten<T>(arr: T[]): T[] {
    let result: T[] = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i] as T[]));
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}
const arr2 = flatten(arr);
console.log(arr2);

// 3. reduce
const arr3 = arr.reduce(
    (pre: any[], cur: any | any[]) =>
        Array.isArray(cur) ? [...pre, ...flatten(cur)] : [...pre, cur],
    []
);
console.log(arr3);

// 4. 使用正则
const arr4 = JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']');
console.log(arr4);

// 5. 使用栈
function stackFlat<T>(arr: T[]): T[] {
    const newArr: T[] = [];
    const stack = ([] as T[]).concat(arr);

    while (stack.length > 0) {
        const val = stack.pop() as T;
        if (Array.isArray(val)) {
            stack.push(...val);
        } else {
            newArr.unshift(val);
        }
    }
    return newArr;
}

const arr5 = stackFlat(arr);
console.log(arr5);
