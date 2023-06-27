import {test} from "@playwright/test";

export class ArticleDetail {
    constructor(page) {
        this.page = page;
    }

    addToCart = async () => test.step('add to cart', async () => await this.page.click(`.btn-primary`))
}