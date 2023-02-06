export {}

const nums: number[] = [1,2,3,4,5];

const res = nums.find(i=> i>2);
const res_ = res as number;

console.log(res_)