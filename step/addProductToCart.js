import {expect, test} from "@playwright/test";
import {ArticleDetail, BlockCartModal, ProductSlider} from "../page";

export const addProductToCart = async (printedTShirt, page) => {
    await test.step(`put into cart "${printedTShirt}"`, async () => {
        await new ProductSlider(page).selectItem(printedTShirt)
        await new ArticleDetail(page).addToCart()
        await new BlockCartModal(page).goToCart()
        await expect(page.locator(".cart-products")).toContainText(printedTShirt);
    });
};