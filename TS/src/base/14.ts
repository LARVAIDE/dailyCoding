export { }

const { log } = console;
interface Eat {
    eat(food: string): void
}
interface Run {
    run(distance: number): void
}

class Person implements Eat, Run {
    eat(food: string) {
        log('eat:' + food)
    }

    run(distance: number) {
        log(`run: ${distance}`)
    }
}

class Animal implements Eat, Run {
    eat(food: string) {
        log('eat:' + food)
    }

    run(distance: number) {
        log(`run: ${distance}`)
    }
}