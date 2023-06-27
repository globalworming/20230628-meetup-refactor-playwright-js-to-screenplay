export class BlockCartModal {
    constructor(page) {
        this.page = page;
    }

    goToCart = () => this.page.click(`#blockcart-modal > div > div > div.modal-footer > a`)
}