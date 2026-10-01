export function unique(arr) {
if (!Array.isArray(arr)) throw new TypeError("unique expects an array");
return [...new Set(arr)];
}

export function groupBy(arr, keyFn) {
if (!Array.isArray(arr)) throw new TypeError("groupBy expects an array");
if (typeof keyFn !== "function") {
throw new TypeError("groupBy expects a function");
}

return arr.reduce((groups, item) => {
const key = keyFn(item);

if (!groups[key]) {
groups[key] = [];
}

groups[key].push(item);
return groups;
}, {});
}

export function chunk(arr, size) {
if (!Array.isArray(arr)) throw new TypeError("chunk expects an array");

if (!Number.isInteger(size) || size <= 0) {
throw new RangeError("size must be a positive integer");
}

const result = [];

for (let i = 0; i < arr.length; i += size) {
result.push(arr.slice(i, i + size));
}

return result;
}

export function deepClone(obj) {
if (obj === null || typeof obj !== "object") {
return obj;
}

if (obj instanceof Date) {
return new Date(obj.getTime());
}

if (Array.isArray(obj)) {
return obj.map(item => deepClone(item));
}

const clone = {};

Object.entries(obj).forEach(([key, value]) => {
clone[key] = deepClone(value);
});

return clone;
}

export function memoize(fn) {
if (typeof fn !== "function") {
throw new TypeError("memoize expects a function");
}

const cache = new Map();

return function (...args) {
const key = JSON.stringify(args);

if (cache.has(key)) {
return cache.get(key);
}

const result = fn(...args);
cache.set(key, result);

return result;
};
}

export function counter(start = 0) {
if (typeof start !== "number" || Number.isNaN(start)) {
throw new TypeError("start must be a number");
}

let value = start;

return {
inc() {
value += 1;
return value;
},

dec() {
value -= 1;
return value;
},

get value() {
return value;
}
};
}
