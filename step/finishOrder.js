import {
    AcceptConditions,
    SelectCarrier,
    SelectFirstPaymentOption,
    SubmitAddress,
    SubmitOrder,
    SubmitPersonalData
} from ".";

export class FinishOrder {
    performAs = async actor => {
        await actor.page.click(".card-body .btn-primary")
        await actor.attemptsTo(
            new SubmitPersonalData(),
            new SubmitAddress(),
            new SelectCarrier('My carrier'),
            new SelectFirstPaymentOption(),
            new AcceptConditions(),
            new SubmitOrder());
    }
}