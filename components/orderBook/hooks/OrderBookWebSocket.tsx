import WebSocketOutMessage from "./WebSocketOutMessage";
import Constants from "../../../Constants";

export default class OrderBookWebSocket {
    private url: string;
    private productId: string;
    private ws: WebSocket;
    private onMessageHandler;
    private onError;

    constructor(url: string, productId: string, onMessageHandler, onError) {
        this.url = url;
        this.productId = productId;
        this.onMessageHandler = onMessageHandler;
        this.onError = onError;

        this.init();
    }

    public init = () => {
        if (!this.ws || (this.ws.readyState !== WebSocket.OPEN && this.ws.readyState !== WebSocket.CONNECTING)) {
            this.ws = new WebSocket(this.url);
            this.ws.onopen = () => {
                const subEvent = new WebSocketOutMessage("subscribe", this.productId, Constants.WEBSOCKET_FEED);
                this.ws.send(subEvent.toString());
                console.log('WS connection opened')
            };

            this.ws.onmessage = this.onMessageHandler;

            this.ws.onerror = (event) => {
                this.onError();
                console.log(`There was an error with the websocket: ${event}`);
            };
        }
    }

    public close = () => {
        if (this.ws && this.ws.readyState !== WebSocket.CLOSED && this.ws.readyState !== WebSocket.CLOSING) {
            if (this.ws.readyState !== WebSocket.CONNECTING) {
                const unsubEvent = new WebSocketOutMessage("unsubscribe", this.productId, Constants.WEBSOCKET_FEED);
                this.ws.send(unsubEvent.toString())
            }
            this.ws.close();
            console.log('WS connection closed')
        }
    }
}

