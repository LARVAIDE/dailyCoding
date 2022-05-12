//洗牌算法，随机解构
class SpuerArray extends Array {
    shuffle() {
        for(let i = this.length - 1; i>0;i--) {
            const j = Math.floor(Math.random() * (i+1));
            [this[i], this[j]] = [this[j], this[i]]
        }
    }
}

class Queue{
    constructor(){
        this.count = 0; //大小
        this.lowestCount = 0; //第一个元素的位置
        this.items = {}; //元素存储容器
    }

    //追加元素
    enQueue(el) {
        this.items[this.count] = el;
        this.count++;
    }

    //移除元素
    deQueue() {
        if(this.isEmpty()){
            return undefined;
        }
        const targetItem = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.count--;
        this.lowestCount++;
        return targetItem;
    }

    //查看队首元素
    peek() {
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
        
    }

    isEmpty() {
        return this.count - this.lowestCount === 0;
    }
}

class LinkedList {
    constructor() {
        this.count = 0; //元素数量
        this.head = null; //表头
    }

    push(el) { //向尾部添加元素
        const node = new LinkListNode(el);
        let current = null;
        if (this.head === null) {//链表为空，头为元素
            this.head = node;
        } else {//链表不为空，向后追加
            current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    }
    insert(el, index) {//向特定位置插入元素
        if(index >= 0 && index <= this.count){
            const node = new LinkListNode(el);
            if(index === 0){
                const current = this.head;
                node.next = current;
                this.head = node;
            }else{
                const prev = this.getEl(index - 1);
                const current = prev.next;
                node.next = current;
                prev.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
    remove(el) {//移除元素
        const index = this.indexOf(el);
        return this.removeAt(index);
    }
    indexOf(el) {//获取元素的索引
        let current = this.head;
        for (let index = 0; index < this.count && current != null; index++) {
            if(el === current.el){
                return i;
            }
            current = current.next;
        }
        return -1;
    }
    removeAt(index) {//移除特定位置的元素
        if(index >= 0 && index < this.count){//不越界才处理
            let current = this.head;
            if(index === 0){
                this.head = current.next;
            }else{
                let prev = this.getEl(index - 1);
                current = prev.next;
                prev.next = current.next;//把元素的上级指向元素的下级
            }
            this.count--;
            return current.el; //返回移除的元素
        }
        return undefined;
    }
    getEl(index){
        if(index >= 0 && index <= this.count){
            let node = this.head;
            for(let i = 0;i<index&&node!== null;i++){
                node = node.next;
            }
            return node;
        }
        return undefined;
    }
    isEmpty() {//链表判空
        return this.count === 0;
    }
    size() {
        return this.count;
    }
    toString() {

    }
}

class LinkListNode {
    constructor(el) {
        this.el = el;
        this.next = null;
    }
}

const _ = new LinkedList();
_.push(0);
_.push(1);
_.push(2);
_.removeAt(2);
console.log(_.getEl(0));

class DoublyLinkListNode extends LinkListNode{//双向链表节点
    constructor(el, index){
        super(el, index);
        this.prev = prev;
    }
}

class DoublyLinkList extends LinkedList{
    
}