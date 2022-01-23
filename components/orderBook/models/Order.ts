import OrderType from "./OrderType";

class Order {
    type: OrderType;
    price: number;
    quantity: number;
    cumulativeVolume: number;
    volumePercentage: number;

    constructor(type: OrderType, price: number, quantity: number) {
        this.type = type;
        this.price = price;
        this.quantity = quantity;
        this.cumulativeVolume = 0;
        this.volumePercentage = 0;
    }
}

export default Order;
