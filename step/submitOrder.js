export class SubmitOrder {
    performAs = async actor => {
        await actor.page.locator('button:visible[type="submit"]').waitFor();
        await actor.page.click('button:visible[type="submit"]')
    }
}