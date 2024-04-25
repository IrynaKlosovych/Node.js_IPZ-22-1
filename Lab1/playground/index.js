'use strict'
const ld = require('lodash');
// 1) new array of elements split into group of size 3
console.log("First method: ld.chunk()")
let arr1=ld.chunk(['a', 'b', 'c', 'd', 'e'], 3);
console.log(arr1);
// 2) fills elements of array with value(*) from start up(2) to, but not including, end(5).
console.log("Second method: ld.fill()")
let arr2=ld.fill([4, 6, 8, 10, 12, 14, 16], '*', 2, 5);
console.log(arr2)
// 3) recursively flattens array
console.log("Third method: ld.flattenDeep()")
let arr3=ld.flattenDeep([1, [2, [3, [4]], 5]]);
console.log(arr3);
// 4) converts all elements in array into a string separated by separator(~>).
console.log("Fourth method: ld.join()")
let str4=ld.join(['a', 'b', 'c'], '~>');
console.log(str4);
// 5) gets the last element of array(10)
console.log("Fifth method: ld.last()");
let elem5=ld.last([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(elem5);