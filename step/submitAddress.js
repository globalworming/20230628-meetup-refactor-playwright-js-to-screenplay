export class SubmitAddress {
    performAs = async actor => {
        const page = actor.page;
        await page.locator("input[name='postcode']").fill("12345");
        await page.locator("input[name='address1']").waitFor();
        await page.locator("input[name='address1']").fill("Albanistr. 10b");
        await page.locator("input[name='city']").fill("Munich");
        await page.locator('button:visible[type="submit"]').waitFor();
        await page.click('button:visible[type="submit"]');
    }
}