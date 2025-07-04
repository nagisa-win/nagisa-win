/**
 * 深拷贝与浅拷贝
 * 浅拷贝比较常见而且也不怎么考，所以也写在这里
 */

interface LoopObj {
    name: string;
    id: number;
    self: any;
}

// 设置一个循环对象
const loopObj: LoopObj = {
    name: 'loop',
    id: 100,
    self: null,
};
loopObj.self = loopObj;
// 一个对象
const obj = {
    name: 'object',
    id: 555,
    say: function (something: string) {
        console.log(something + this.name);
    },
    peer: ['number', 'string', 'boolean', loopObj],
    max: Infinity,
    min: -Infinity,
    test: /^object$/,
    loop: loopObj,
    date: new Date(),
    bigInt: 1888n,
};

// 浅拷贝
console.log('shadow copy');

// 1. Object.assign
const obj1 = Object.assign({}, obj);
// 1. add id number
obj.loop.self!.id++;
// 1. print
console.log(obj1.loop.id === obj.loop.id);

// 2. 展开运算符
function shadowExpand(obj: any) {
    if (typeof obj === 'object') {
        return { ...obj };
    }
    return obj;
}
const obj2 = shadowExpand(obj);
obj.loop.self!.id++;
console.log(obj1.loop.id === obj.loop.id);

// 3. 循环赋值
function shadowCopy(obj: Object) {
    const newObj: any = {};
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            newObj[prop] = obj[prop];
        }
    }
    return newObj;
}
const obj3 = shadowCopy(obj);
obj.loop.self!.id++;
console.log(obj3.loop.id === obj.loop.id);

// 深拷贝
console.log('deep copy');

/**
 * 深拷贝函数
 *
 * @param obj 要深拷贝的对象
 * @param cache 用于存储已拷贝对象的缓存，避免循环引用。默认为一个新的WeakMap实例
 * @returns 深拷贝后的对象
 */
function deepClone(obj: any, cache = new WeakMap()) {
    // 基本类型直接返回
    if (obj === null || typeof obj !== 'object') return obj;

    // 循环引用处理：如果已缓存则直接返回缓存副本
    if (cache.has(obj)) return cache.get(obj);

    // 处理Date对象
    if (obj instanceof Date) return new Date(obj);

    // 处理RegExp对象（修复flags丢失问题）
    if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);

    // 处理Set对象
    if (obj instanceof Set) {
        const clone = new Set();
        cache.set(obj, clone);
        obj.forEach((value) => clone.add(deepClone(value, cache)));
        return clone;
    }

    // 处理Map对象
    if (obj instanceof Map) {
        const clone = new Map();
        cache.set(obj, clone);
        obj.forEach((value, key) => clone.set(key, deepClone(value, cache)));
        return clone;
    }

    // 初始化克隆对象（数组或普通对象）
    const clone = Array.isArray(obj) ? [] : {};

    // 缓存当前对象，用于后续循环引用检测
    cache.set(obj, clone);

    // 复制Symbol类型键（修复Symbol键丢失问题）
    const symKeys = Object.getOwnPropertySymbols(obj);
    for (const symKey of symKeys) {
        clone[symKey] = deepClone(obj[symKey], cache);
    }

    // 复制字符串键（包括可枚举属性）
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key], cache);
        }
    }

    return clone;
}
const obj4 = deepClone(obj);
obj.loop.self!.id++;
console.log(obj4.loop.id === obj.loop.id);
obj.bigInt++;
console.log(obj4.bigInt === obj.bigInt);
obj.loop.self = {name: 'new object'};
console.log(obj4.loop.self === obj.loop.self, obj4.loop.self, obj.loop.self);
