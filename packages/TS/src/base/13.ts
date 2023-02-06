export { }

class Person {
    public name: string
    private age: number //私有，只能内部访问
    protected readonly sex: string //protected只允许在子类中访问，readonly只读

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        this.sex = 'man';
    }

    sayHi(msg: string): void{
        console.log(`${this.name} say: ${msg}`);
    }
}

class Student extends Person {
    private constructor(name: string, age: number) {
        super(name, age);
    }

    static create(name: string, age: number){
        return new Student(name, age);
    }
}

const Tom = new Person('tom', 18);
Tom.name