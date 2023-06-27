export class CarrierSelection {
    constructor(page) {
        this.page = page;
    }

    select = async carrier => {
        await this.page.click(`text=${carrier}`);
        await this.page.locator('button:visible[type="submit"]').waitFor();
        await this.page.click('button:visible[type="submit"]');
    };
}