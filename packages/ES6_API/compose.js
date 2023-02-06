//把一个字符串数组的最后一个值格式化为大写
const array = ['aaa', 'bbb', 'ccc'];
const reverse = array => array.reverse();
const first = array => array[0]
const toUpper = value => value.toUpperCase();

const compose = (...arg) => value => arg.reverse().reduce((acc, cur) => cur(acc), value);
const handle = compose(toUpper, compose(first, reverse));
console.log(handle(array));