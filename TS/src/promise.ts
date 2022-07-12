export {}


// new Promise((resolve, reject) => {});

interface Resolve<T> {
    (reason: T): void
}

interface Reject {
    (error?: any): void
}

interface PromiseExcutor<T> {
    (resolve: Resolve<T>, reject: Reject): void
}

type PromiseCallback = undefined | Function

const enum PromiseState {
    INIT = 'PENDING',
    SUCCESSED = 'FULFILLED',
    FAILED = 'REJECTED'
}

class MyPromise<T> {
    private state: PromiseState = PromiseState.INIT
    private reason?: T
    private error: any 
    private resolveCallback?: PromiseCallback;
    private rejectCallback?: PromiseCallback;
    constructor(excutor: PromiseExcutor<T>){
        excutor(this.resolve, this.reject);
    }

    resolve = (reason) => {
        if(this.state === PromiseState.INIT){
            this.state = PromiseState.SUCCESSED
            this.reason = reason
            !!this.resolveCallback && this.resolveCallback(reason)
        }
    }

    reject = (error) => {
        if(this.state === PromiseState.INIT){
            this.state = PromiseState.FAILED
            this.error = error
            !!this.rejectCallback && this.rejectCallback(error)
        }
    }

    then = (resolveCallback, rejectCallback): any => {
        if(this.state === PromiseState.SUCCESSED){
            resolveCallback(this.reason);
        }
        if(this.state === PromiseState.FAILED){
            rejectCallback(this.error)
        }
    }
}

new MyPromise((resolve, reject) => {
    resolve('aaaa')
})