class Queue{
    constructor(){
        this.count = 0; //累计索引
        this.lowestCount = 0; //队首位置
        this.items = {}; //容器
    }

    enQueue(el) {
        this.items[this.count] = el;
        this.count++;
    }

    deQueue() {
        if(this.isEmpty()){
            return undefined;
        }
        const targetItem = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return targetItem;
    }

    front() {
        if(this.isEmpty()){
            return undefined;
        }
        return this.items[this.lowestCount];
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

const queue = new Queue();
queue.enQueue('bo');
queue.enQueue('qian');
console.log(queue.toString());
console.log(queue.size());
queue.deQueue();
queue.enQueue('peng');
console.log(queue.front());
console.log(queue.toString());