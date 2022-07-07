export {}

const { log } = console;
abstract class Animal {//abstract抽象类只能被继承，不能实例化
    eat(food: string) {
        log('eat:' + food)
    }

    abstract run (distance: number): void; //abstract抽象方法
}

class Dog extends Animal{
    run (distance: number){
        log(    `run : ${distance}`);
    }
}

const dog = new Dog();
log(dog.run(12))