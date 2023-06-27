import {test} from "@playwright/test";

export class BlockCartModal {
    constructor(page) {
        this.page = page;
    }

    goToCart = async () => test.step(
        "continue to cart",
        async () => await this.page.click(`#blockcart-modal > div > div > div.modal-footer > a`))
}