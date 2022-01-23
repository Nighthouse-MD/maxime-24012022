class WebSocketOutMessage {
    event: string;
    feed: string;
    product_ids: string[];

    constructor(event: string, productId: string, feed: string) {
        this.product_ids = [productId];
        this.event = event;
        this.feed = feed;
    }

    toString() {
        return JSON.stringify(this);
    }
}

export default WebSocketOutMessage;