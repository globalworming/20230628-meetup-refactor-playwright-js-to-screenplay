import {test} from "@playwright/test";

export class Checkout {
    constructor(page) {
        this.page = page;
    }

    submitOrder = async () => test.step(
        "submit order",
        async () => await this.page.click('button:visible[type="submit"]'));
}