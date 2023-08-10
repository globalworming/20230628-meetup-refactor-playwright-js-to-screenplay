import {test} from "@playwright/test";
import {Home} from "../page";
import {AddProductToCart, EnsureTheOrderIsConfirmed, FinishOrder} from "../step";
import {randomEmail} from "../util";

class Actor {
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

test.describe("e2e happy paths", async () => {
    let page;
    let actor;

    test.beforeAll(async ({browser}) => {
        page = await browser.newPage();
        await new Home(page).goTo()
        actor = new Actor("globalworming")
        actor.page = page;
        actor.notepad = {
            firstName: "Dora", lastName: "Rubio", email: randomEmail(),
            order: {
                productName: 'Hummingbird printed t-shirt'
            }
        }
    });

    test.describe("when ordering", async () => {
        test("should be able to buy a product", async () => {
            await actor.attemptsTo(
                new AddProductToCart(actor.notepad.order.productName),
                new FinishOrder())
            await actor.attemptsTo(new EnsureTheOrderIsConfirmed());
        });
    });

    test.afterAll(async () => {
        await page.close();
    });
});