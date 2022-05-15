class Stack {
    constructor() {
        this.count = 0;
        this.items = {};
    }

    push(el) {
        this.items[this.count] = el;
        this.count++;
    }

    pop() {
        if(this.isEmpty()){
            return undefined;
        }
        this.count--;
        const targetItem = this.items[this.count];
        delete this.items[this.count];
        return targetItem;
    }

    front() {
        if(this.isEmpty()){
            return undefined;
        }
        return this.items[this.count-1];
    }

    toString() {
        if(this.isEmpty()){
            return '';
        }
        let objString = `${this.items[0]}`;
        for (let index = 0; index < this.count; index++) {
            objString= `${objString},${this.items[index]}`;
        }
        return objString;
    }

    clear() {
        this.count = 0;
        this.items = {};
    }

    isEmpty() {
        return this.count === 0;
    }

    size() {
        return this.count;
    }
}

