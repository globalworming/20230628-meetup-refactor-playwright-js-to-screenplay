import {expect} from "@playwright/test";
import {SelectItemInProductSlider} from "./selectItemInProductSlider";
import {ProductDetails} from "../page";

class AddItemAndGoToCart {

    performAs = async (actor) => {
        let page = actor.page;
        await page.click(ProductDetails.addToCart)
        await page.click(`#blockcart-modal > div > div > div.modal-footer > a`)
    }
}

export class AddProductToCart {
    constructor(productName) {
        this.productName = productName;
        this.args = {productName}
    }

    performAs = async (actor) => {
        const page = actor.page;
        await actor.attemptsTo(
            new SelectItemInProductSlider(this.productName),
            new AddItemAndGoToCart()
        )
        await expect(page.locator(".cart-products")).toContainText(this.productName);
    }
}