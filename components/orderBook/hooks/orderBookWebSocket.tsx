import WebSocketEvent from "../models/WebSocketEvent";

class OrderBookWebSocket {
    private url: string;
    private productId: string;
    private ws: WebSocket;
    private onMessageHandler;

    constructor(url: string, productId: string, onMessageHandler) {
        this.url = url;
        this.productId = productId;
        this.onMessageHandler = onMessageHandler;

        this.init();
    }

    public init = () => {
        if ((!this.ws || (this.ws.readyState !== WebSocket.OPEN && this.ws.readyState !== WebSocket.CONNECTING)) && document.hasFocus()) {
            this.ws = new WebSocket(this.url);
            this.ws.onopen = (event) => {
                const subEvent = new WebSocketEvent("subscribe", this.productId);
                this.ws.send(subEvent.toString());
                console.log('WS connection opened')
            };

            this.ws.onmessage = this.onMessageHandler;

            this.ws.onerror = (event) => {
                console.log(`There was an error with the websocket: ${event}`);
            };
        }
    }

    public close = () => {
        if (this.ws.readyState !== WebSocket.CONNECTING) {
            const unsubEvent = new WebSocketEvent("unsubscribe", this.productId);
            this.ws.send(unsubEvent.toString())
        }
        this.ws.close();
        console.log('WS connection closed')
    }
}

export default OrderBookWebSocket;