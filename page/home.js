import {test} from "@playwright/test";

export class Home {
    constructor(page) {
        this.page = page;
    }

    goTo = async () => {
        const url = process.env.BASE_URL;
        return test.step("navigate to " + url, async () => await this.page.goto(url));
    }
}