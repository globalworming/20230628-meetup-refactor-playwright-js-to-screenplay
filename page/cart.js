export class Cart {
    constructor(page) {
        this.page = page;
    }

    continueToCheckout = () => this.page.click(".card-body .btn-primary");
}