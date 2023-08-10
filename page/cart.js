import {test} from "@playwright/test";

export class Cart {
    constructor(page) {
        this.page = page;
    }

    continueToCheckout  = async () => test.step(
        'continue to checkout',
        async () => await this.page.click(".card-body .btn-primary"))
}