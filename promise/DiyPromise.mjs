/**
 * 1. promise是一个类，在执行时传递一个执行器进去，执行器会立即执行
 * 2. promise有三种状态，状态一旦发生了变化就不可逆：
 *      pending     ------> 初始状态
 *      fulfilled   ------> 成功状态
 *      rejected    ------> 失败状态
 * 3. resolve()，rejected()
 * 4. then判断状态，执行对应状态的回调函数
 * 5. resolve()，rejected()都有
 */

/**
 * 判断then方法的返回值，决定返回什么
 * */
const resolvePromise = (promise_then, res, resolve, reject) => {
    if (promise_then === res) { //自己返回自己
        return reject(new TypeError('自己返回自己'))
    }
    if (res instanceof DiyPromise) {//promise对象
        res.then(resolve, reject)
    } else {
        resolve(res)
    }
}

const PENDING = 'pending';
const FUFILLED = 'fufilled';
const REJECTED = 'rejected';
class DiyPromise {
    status = PENDING;
    res = undefined;//成功返回值
    err = undefined;//失败返回值
    resolveCallback = [];
    rejectCallback = [];
    constructor(exector) {
        exector(this.resolve, this.reject);
    }

    resolve = res => {
        if (this.status !== PENDING) return;//状态不可逆
        this.status = FUFILLED;
        this.res = res;
        // this.resolveCallback && this.resolveCallback(this.res);
        while (this.resolveCallback.length) this.resolveCallback.shift()(this.res)
    }

    reject = err => {
        if (this.status !== PENDING) return;//状态不可逆
        this.status = REJECTED;
        this.err = err;
        // this.rejectCallback && this.rejectCallback(this.err);
        while (this.rejectCallback.length) this.rejectCallback.shift()(this.err)
    }

    then = (resolveCallback, rejectCallback) => {
        const promise_then = new DiyPromise((resolve, reject) => {
            if (this.status === FUFILLED) {//成功回调
                try {
                    setTimeout(() => {
                        let result = resolveCallback(this.res);
                        /**
                         * result的返回值是普通值直接返回resolve()
                         * 是promise对象就判断状态，成功态调用resolve()，失败调用reject()
                        **/
                        resolvePromise(promise_then, result, resolve, reject)
                    }, 0)
                } catch (error) {
                    reject(error)
                }
            } else if (this.status === REJECTED) {//失败回调
                try {
                    setTimeout(() => {
                        let result = rejectCallback(this.res);
                        resolvePromise(promise_then, result, resolve, reject)
                    }, 0)
                } catch (error) {
                    reject(error)
                }
            } else {
                //等待状态，处理异步情况
                //存储回调函数
                this.resolveCallback.push(resolveCallback);
                this.rejectCallback.push(rejectCallback);
            }
        })
        return promise_then
    }

    /**
     * all()解决异步并发问题，接受一个promise组成的数组，返回一个promise结果组成的数组
     * 数组里某一项promise返回失败all就直接返回失败
     * @param {*} paramsList 
     * @returns 
     */
    static all(paramsList) {
        const resultList = []
        let currentIdx = 0
        return new DiyPromise((resolve, reject) => {
            /**
             * 保存paramsList的各项处理结果
             * @param {*} index 
             * @param {*} value 
             */
            function saveData(index, value) {
                resultList[index] = value
                currentIdx++
                if (paramsList.length === currentIdx) {// 等待所有行为都返回结果，再调用resolve完成all
                    resolve(resultList)
                }
            }
            for (let index = 0; index < paramsList.length; index++) {
                const element = paramsList[index];
                if (element instanceof DiyPromise) {// promise
                    element.then(res => {
                        saveData(index, res)
                    }, err => {
                        reject(err)
                    })
                } else {// 普通参数
                    saveData(index, element)
                }
            }
        })
    }

    static race(paramsList) {
        return new DiyPromise((resolve, reject) => {
            paramsList.forEach(promise => {
                if (promise instanceof DiyPromise) {
                    promise.then(resolve, reject)
                } else {
                    resolve(promise)
                }
            });
        })
    }

    /**
     * @param {*} param 
     * @returns 
     */
    static resolve(param) {
        if (param instanceof DiyPromise) return param
        return new DiyPromise(resolve => resolve(param))
    }
}

export default DiyPromise;