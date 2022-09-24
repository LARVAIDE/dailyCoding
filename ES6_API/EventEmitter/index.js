class MyEventEmitter { 
    constructor() { 
        this.events = {}
    }

    /**
     * 订阅
     * @param {*} name 
     * @param {*} event 
     */
    on(name, event) { 
        const eventList = this.events[name] || []
        this.events[name] = eventList.concat(event)
    }

    /**
     * 响应
     * @param {*} name 
     */
    emit(name, ...args) { 
        const eventList = this.events[name] || []
        eventList.forEach(item => item.apply(item, args));
    }

    /**
     * 取消
     * @param {*} name 
     * @param {*} event 
     */
    off(name, event) { 
        if(this.events[name]) { 
            this.events[name] = this.events[name].filter(item => item !== event)
        }
    }
}

class EventEmitter { 
    constructor() { 
        return EventEmitter.getInstance()
    }

    static instance = null;
    static getInstance() {
        if (!MyEventEmitter.instance) {
            MyEventEmitter.instance = new MyEventEmitter()
        }
        return MyEventEmitter.instance
    }
}


const eventBus = new EventEmitter()
const eventBus1 = new EventEmitter()
console.log(eventBus === eventBus1) // 打印输出: true
function handleClick(param1, param2) {
  console.log(param1, param2)
}
eventBus.on('click', handleClick)
eventBus.emit('click', 'foo', 'bar') // 打印输出: foo bar
