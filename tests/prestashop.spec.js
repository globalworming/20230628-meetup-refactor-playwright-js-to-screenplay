import {test} from "@playwright/test";
import {Home} from "../page";
import {AddProductToCart, EnsureTheOrderIsConfirmed, FinishOrder} from "../step";
import {randomEmail} from "../util";
import {Actor} from "../model/actor";

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
                new FinishOrder());
            await actor.attemptsTo(new EnsureTheOrderIsConfirmed());
        });
    });

    test.afterAll(async () => {
        await page.close();
    });
});