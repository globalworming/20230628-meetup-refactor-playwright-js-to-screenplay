import {test} from "@playwright/test";

export class ProductSlider {
    constructor(page) {
        this.page = page;
    }

    selectItem = async name => await test.step(
        `select item ${name}`,
        async () => await this.page.click(`text=${name}`)
    );
}