import {expect, test} from "@playwright/test";

test.describe("e2e happy paths", async () => {
    let page;

    test.beforeAll(async ({browser}) => {
        page = await browser.newPage();
        await page.goto(`${process.env.BASE_URL}`);
    });

    test.afterAll(async () => {
        await page.close();
    });

    test.describe("when ordering", async () => {
        test("should be able to buy a product", async () => {
            await page.click(`text=Hummingbird printed t-shirt`);
            await page.click(`.btn-primary`);
            await page.click(`#blockcart-modal > div > div > div.modal-footer > a`)
            await expect(page.locator(".cart-products")).toContainText("Hummingbird printed t-shirt");
            await page.click(".card-body .btn-primary");
            await page.locator('#customer-form .custom-control-label').nth(1).click();
            await page.locator("input[name='firstname']").fill("Dora");
            await page.locator("input[name='lastname']").fill("Rubio");
            await page.locator("input[name='email']").first().fill(randomEmail());
            await page.locator('#customer-form .custom-control-label').nth(2).click();
            await page.locator('#customer-form .custom-control-label').nth(3).click();
            await page.locator('#customer-form .custom-control-label').nth(4).click();
            await page.locator('button:visible[type="submit"]').waitFor();
            await page.click('button:visible[type="submit"]');
            await page.locator("input[name='postcode']").fill("12345");
            await page.locator("input[name='address1']").waitFor();
            await page.locator("input[name='address1']").fill("Albanistr. 10b");
            await page.locator("input[name='city']").fill("Munich");
            await page.locator('button:visible[type="submit"]').waitFor();
            await page.click('button:visible[type="submit"]');
            await page.click(`text=My carrier`);
            await page.locator('button:visible[type="submit"]').waitFor();
            await page.click('button:visible[type="submit"]');
            await page.locator('input[name="payment-option"] + label').nth(0).click();
            await page.locator('#conditions-to-approve div').click();
            await page.locator('button:visible[type="submit"]').waitFor();
            await page.click('button:visible[type="submit"]');
            await expect(page).toHaveURL(/bestellbestaetigung/);
        });
    });
});


function randomEmail() {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 5) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result + "@gmail.com";
}