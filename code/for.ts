/**
 * for..in for..of
 */

// for..in
console.log('for..in');
// 遍历可枚举属性，包括原型链上的可枚举属性
const arr = ['a', 'b', 1, 2, , ,];
for (const key in arr) {
    console.log(key, arr[key]);
}

// for..of
console.log('for..of');
// 遍历可迭代对象
for (const value of arr) {
    console.log(value);
}