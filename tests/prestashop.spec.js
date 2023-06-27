import {expect, test} from "@playwright/test";
import {
    AddressForm,
    ArticleDetail,
    BlockCartModal,
    CarrierSelection,
    Cart, Checkout,
    Home, PaymentSelection,
    PersonalDataForm,
    ProductSlider
} from "../page";

class Actor {
    page;

    constructor(name) {
        this.name = name;
    }

    attemptsTo = async (task) => {
        const transform = str => str.replace(/[A-Z]/g, letter => ` ${letter.toLowerCase()}`);
        return test.step(transform(task.constructor.name) + " " + JSON.stringify(task.args), async () => await task.performAs(this))
    }

}

class AddProductToCart {
    constructor(productName) {
        this.productName = productName;
        this.args = {productName}
    }

    performAs = async (actor) => {
        const page = actor.page;
        await new ProductSlider(page).selectItem(this.productName)
        await new ArticleDetail(page).addToCart()
        await new BlockCartModal(page).goToCart()
        await expect(page.locator(".cart-products")).toContainText(this.productName);
    }
}

class FinishOrder {
    performAs = async (actor) => {
        const page = actor.page;
        await test.step(`finish order`, async () => {
            await new Cart(page).continueToCheckout()
            await new PersonalDataForm(page).fillAndSubmit("Dora", "Rubio", this.randomEmail())
            await new AddressForm(page).fillAndSubmit()
            await new CarrierSelection(page).select('My carrier')
            await new PaymentSelection(page).selectFirst()
            await new Checkout(page).submitOrder()
        });
    }


    randomEmail() {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 5) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result + "@gmail.com";
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
    });

    test.describe("when ordering", async () => {
        test("should be able to buy a product", async () => {
            const printedTShirt = 'Hummingbird printed t-shirt';
            await actor.attemptsTo(new AddProductToCart(printedTShirt))
            await actor.attemptsTo(new FinishOrder())
            await expect(page).toHaveURL(/bestellbestaetigung/);
        });
    });

    test.afterAll(async () => {
        await page.close();
    });
});
