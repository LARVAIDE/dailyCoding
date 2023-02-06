//洗牌算法，随机解构
class SpuerArray extends Array {
    shuffle() {
        for(let i = this.length - 1; i>0;i--) {
            const j = Math.floor(Math.random() * (i+1));
            [this[i], this[j]] = [this[j], this[i]]
        }
    }
}