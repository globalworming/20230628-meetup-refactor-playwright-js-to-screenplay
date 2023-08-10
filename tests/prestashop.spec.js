import {expect, test} from "@playwright/test";
import {
    AddressForm,
    ArticleDetail,
    BlockCartModal,
    CarrierSelection,
    Cart,
    Checkout,
    Home,
    PaymentSelection,
    PersonalDataForm,
    ProductSlider
} from "../page";

test.describe("e2e happy paths", async () => {
    let page;

    test.beforeAll(async ({browser}) => {
        page = await browser.newPage();
        await new Home(page).goTo()
    });


    test.describe("when ordering", async () => {
        test("should be able to buy a product", async () => {
            await new ProductSlider(page).selectItem('Hummingbird printed t-shirt')
            await new ArticleDetail(page).addToCart()
            await new BlockCartModal(page).goToCart()
            await expect(page.locator(".cart-products")).toContainText("Hummingbird printed t-shirt");

            await new Cart(page).continueToCheckout()
            await new PersonalDataForm(page).fillAndSubmit("Dora", "Rubio", randomEmail())

            await new AddressForm(page).fillAndSubmit()
            await new CarrierSelection(page).select('My carrier')
            await new PaymentSelection(page).selectFirst()

            await new Checkout(page).submitOrder()
            await expect(page).toHaveURL(/bestellbestaetigung/);
        });
    });

    test.afterAll(async () => {
        await page.close();
    });
});

function randomEmail() {
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