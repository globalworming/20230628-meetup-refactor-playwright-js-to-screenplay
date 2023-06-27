import {test} from "@playwright/test";

export class AddressForm {
    constructor(page) {
        this.page = page;
    }

    fillAndSubmit = async () => test.step('fill and submit address', async () => {
        await this.page.locator("input[name='postcode']").fill("12345");
        await this.page.locator("input[name='address1']").waitFor();
        await this.page.locator("input[name='address1']").fill("Albanistr. 10b");
        await this.page.locator("input[name='city']").fill("Munich");
        await this.page.locator('button:visible[type="submit"]').waitFor();
        await this.page.click('button:visible[type="submit"]');
    })
}