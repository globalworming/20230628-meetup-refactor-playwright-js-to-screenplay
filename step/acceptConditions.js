import {Checkout} from "../page";

export class AcceptConditions {
    performAs = async actor => {
        await actor.page.locator(Checkout.acceptCondtions).click();
    }
}