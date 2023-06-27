export class SelectItemInProductSlider {
    constructor(productName) {
        this.productName = productName;
    }

    performAs = async (actor) => await actor.page.click(`text=${this.productName}`)
}