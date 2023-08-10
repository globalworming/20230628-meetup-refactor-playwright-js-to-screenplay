export class SelectCarrier {
    constructor(carrier) {
        this.carrier = carrier;
        this.args = {carrier}
    }

    performAs = async actor => {
        await actor.page.click(`text=${this.carrier}`);
        await actor.page.locator('button:visible[type="submit"]').waitFor();
        await actor.page.click('button:visible[type="submit"]');
    }

}