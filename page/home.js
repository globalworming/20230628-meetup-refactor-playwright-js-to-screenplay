export class Home {
    constructor(page) {
        this.page = page;
    }

    goTo = () => this.page.goto(process.env.BASE_URL);
}