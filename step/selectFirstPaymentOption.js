import {Checkout} from "../page";

export class SelectFirstPaymentOption {
    performAs = async actor => {
        await actor.page.locator(Checkout.paymentOption).nth(0).click();
    }
}