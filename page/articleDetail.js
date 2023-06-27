export class ArticleDetail {
    constructor(page) {
        this.page = page;
    }

    addToCart = () => this.page.click(`.btn-primary`);
}