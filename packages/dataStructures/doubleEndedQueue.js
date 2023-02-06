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

    addFront(el) {
        if(this.isEmpty()){
            this.addBack(el);
        }
        if(this.lowestCount > 0){
            this.lowestCount--;
            this.items[lowestCount] = el;
        }
        if(this.lowestCount === 0){
            for(let i=0;i<this.count;i++){
                this.items[i] = this.items[i-1];
            }
            this.count++;
            this.lowestCount = 0;
            this.items[0] = el;
        }
    }

    addBack() {
        this.items[this.count] = el;
        this.count++;
    }

    removeFront() {
        if(this.isEmpty()){
            return undefined;
        }
        const targetItem = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return targetItem;
    }

    removeBack() {
        if(this.isEmpty()){
            return undefined;
        }
        this.count--;
        const targetItem = this.items[this.count];
        delete this.items[this.count];
        return targetItem;
    }

    peekFront() {
        if(this.isEmpty()){
            return undefined;
        }
        return this.items[this.lowestCount];
    }

    peekBack() {
        if(this.isEmpty()){
            return undefined;
        }
        return this.items[this.count - 1];
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