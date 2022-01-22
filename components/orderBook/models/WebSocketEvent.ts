class WebSockerEvent {
    event: string;
    feed: string = "book_ui_1";
    product_ids: string[];

    constructor(event: string, productId: string) {
        this.product_ids = [productId];
        this.event = event;
    }

    toString() {
        return JSON.stringify(this);
    }
}

export default WebSockerEvent;