import {test} from "@playwright/test";
import {AddressForm, CarrierSelection, Cart, Checkout, PaymentSelection} from "../page";
import {FillPersonalData} from "./fillPersonalData";

export class FinishOrder {
    performAs = async (actor) => {
        const page = actor.page;
        await test.step(`finish order`, async () => {
            await new Cart(page).continueToCheckout()
            await actor.attemptsTo(new FillPersonalData());
            await new AddressForm(page).fillAndSubmit()
            await new CarrierSelection(page).select('My carrier')
            await new PaymentSelection(page).selectFirst()
            await new Checkout(page).submitOrder()
        });
    }
}