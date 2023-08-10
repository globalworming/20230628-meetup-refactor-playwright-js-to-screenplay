import {test} from "@playwright/test";
import {AddressForm, CarrierSelection, Cart, Checkout, PaymentSelection, PersonalDataForm} from "../page";

export class FinishOrder {
    performAs = async (actor) => {
        const page = actor.page;
        await test.step(`finish order`, async () => {
            await new Cart(page).continueToCheckout()
            await new PersonalDataForm(page).fillAndSubmit("Dora", "Rubio", this.randomEmail())
            await new AddressForm(page).fillAndSubmit()
            await new CarrierSelection(page).select('My carrier')
            await new PaymentSelection(page).selectFirst()
            await new Checkout(page).submitOrder()
        });
    }


    randomEmail() {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 5) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result + "@gmail.com";
    }
}