export class PaymentSelection {
    constructor(page) {
        this.page = page;
    }

    selectFirst = async () => {
        await this.page.locator('input[name="payment-option"] + label').nth(0).click();
        await this.page.locator('#conditions-to-approve div').click();
        await this.page.locator('button:visible[type="submit"]').waitFor();
    };
}