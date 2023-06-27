import {expect} from "@playwright/test";

export class EnsureTheOrderIsConfirmed {
    performAs = async (actor) => {
        await expect(actor.page).toHaveURL(/bestellbestaetigung/);
    }
}