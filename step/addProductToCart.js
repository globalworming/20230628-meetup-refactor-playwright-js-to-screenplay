import {ArticleDetail, BlockCartModal, ProductSlider} from "../page";
import {expect} from "@playwright/test";

export class AddProductToCart {
    constructor(productName) {
        this.productName = productName;
        this.args = {productName}
    }

    performAs = async (actor) => {
        const page = actor.page;
        await new ProductSlider(page).selectItem(this.productName)
        await new ArticleDetail(page).addToCart()
        await new BlockCartModal(page).goToCart()
        await expect(page.locator(".cart-products")).toContainText(this.productName);
    }
}