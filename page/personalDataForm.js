export class PersonalDataForm {
    constructor(page) {
        this.page = page;
    }

    fillAndSubmit = async (firstname, lastname, email) => {
        await this.page.locator('#customer-form .custom-control-label').nth(1).click();
        await this.page.locator("input[name='firstname']").fill(firstname);
        await this.page.locator("input[name='lastname']").fill(lastname);
        await this.page.locator("input[name='email']").first().fill(email);
        await this.page.locator('#customer-form .custom-control-label').nth(2).click();
        await this.page.locator('#customer-form .custom-control-label').nth(3).click();
        await this.page.locator('#customer-form .custom-control-label').nth(4).click();
        await this.page.locator('button:visible[type="submit"]').waitFor();
        await this.page.click('button:visible[type="submit"]');

    }
}