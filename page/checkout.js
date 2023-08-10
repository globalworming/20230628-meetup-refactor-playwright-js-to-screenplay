export class Checkout {
    constructor(page) {
        this.page = page;
    }

    submitOrder = async () => await this.page.click('button:visible[type="submit"]');
}