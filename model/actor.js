import {test} from "@playwright/test";

export class Actor {
    page;

    constructor(name) {
        this.name = name;
    }

    attemptsTo = async (...tasks) => {
        for (const task of tasks) {
            const transform = str => str.replace(/[A-Z]/g, letter => ` ${letter.toLowerCase()}`);
            let title = this.name + " attempts to " + (task.args !== undefined ?
                transform(task.constructor.name) + " " + JSON.stringify(task.args) :
                transform(task.constructor.name));
            await test.step(title, async () => await task.performAs(this))
        }
    }

}