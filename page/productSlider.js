import {test} from "@playwright/test";

export class ProductSlider {
    constructor(page) {
        this.page = page;
    }

    selectItem = name => this.page.click(`text=${name}`);
}