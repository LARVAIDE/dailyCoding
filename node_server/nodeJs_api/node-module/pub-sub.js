class PubSub{
    constructor(){
        this._events = {}
    }

    /**
     * 注册
     */
    subscribe(event, cb){
        if (this._events[event]) {
            //当前event存在，向队列里添加
            this._events[event].push(cb)
        } else {
            //之前未订阅
            this._events[event] = [cb]
        }
    }

    /**
     * 发布
     */
    publish(event, ...args){
        const items = this._events[event]
        if(items && items.length){
            items.forEach(function(cb){
                cb.call(this, ...args)
            });
        }
    }
}

let ps = new PubSub()
ps.subscribe('事件1', ()=>{
    console.log('事件1执行了')
})

ps.publish('事件1')