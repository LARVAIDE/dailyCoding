/*
* 双端队列，可以同时从队首和队尾添加或移除元素的特殊队列。
* 同时遵循了先进先出和后进先出的原则，相当于结合了队列和栈。
*/
class Deque {
    constructor(){
        this.count = 0; //累计索引
        this.lowestCount = 0; //队首位置
        this.items = {}; //容器
    }

    addFront() {
        if(this.isEmpty()){

        }
        if(this.lowestCount > 0){

        }
        if(this.lowestCount == 0){
            
        }
    }

    addBack() {

    }

    removeFront() {

    }

    removeBack() {

    }

    peekFront() {

    }

    peekBack() {

    }

    clear() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }

    toString() {
        if(this.isEmpty()){
            return undefined;
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`
        }
        return objString;
    }

    size() {
        return this.count - this.lowestCount;
    }

    isEmpty() {
        return this.count - this.lowestCount === 0;
    }
}