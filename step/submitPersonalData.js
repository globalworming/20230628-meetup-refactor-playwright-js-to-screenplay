export class SubmitPersonalData {

    performAs = async actor => {
        const page = actor.page;
        await page.locator('#customer-form .custom-control-label').nth(1).click();
        await page.locator("input[name='firstname']").fill(actor.notepad.firstName);
        await page.locator("input[name='lastname']").fill(actor.notepad.lastName);
        await page.locator("input[name='email']").first().fill(actor.notepad.email);
        await page.locator('#customer-form .custom-control-label').nth(2).click();
        await page.locator('#customer-form .custom-control-label').nth(3).click();
        await page.locator('#customer-form .custom-control-label').nth(4).click();
        await page.locator('button:visible[type="submit"]').waitFor();
        await page.click('button:visible[type="submit"]')
    }

}