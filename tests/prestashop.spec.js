import {test} from "@playwright/test";
import {Home} from "../page";
import {finishOrder} from "../step/finishOrder";
import {addProductToCart} from "../step/addProductToCart";

test.describe("e2e happy paths", async () => {
    let page;

    test.beforeAll(async ({browser}) => {
        page = await browser.newPage();
        await new Home(page).goTo()
    });

    test.describe("when ordering", async () => {
        test("should be able to buy a product", async () => {
            const printedTShirt = 'Hummingbird printed t-shirt';
            await addProductToCart(printedTShirt, page);
            await finishOrder(page);
        });
    });

    test.afterAll(async () => {
        await page.close();
    });
});
