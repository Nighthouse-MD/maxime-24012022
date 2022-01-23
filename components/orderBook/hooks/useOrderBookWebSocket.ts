import { useState, useEffect, SetStateAction } from 'react';
import Order from '../models/Order';
import OrderType from '../models/OrderType';
import Constants from '../Constants';
<<<<<<< HEAD
import OrderBookWebSocket from './OrderBookWebSocket';
=======
import OrderBookWebSocket from './orderBookWebSocket';
>>>>>>> 2635e92b849628933d4c84050fb808fb4e8cf7d0
export const isBrowser = typeof window !== "undefined";

const addOrdersToList = (orders: Order[], setList: { (value: SetStateAction<Order[]>): void; (value: SetStateAction<Order[]>): void; (arg0: (existingOrders: Order[]) => Order[]): void; }, renewList: boolean) => {
    setList((existingOrders: Order[]) => {
        let updatedOrders = renewList ? [] : [...existingOrders];
        orders.forEach(order => {
            updatedOrders = [...updatedOrders.filter(x => x.price !== order.price)];
            if (order.quantity > 0) {
                updatedOrders.push(order);
            }
        });
        return updatedOrders;
    });
}

export default function useOrderBookWebSocket() {
    const [asks, setAsks] = useState<Order[]>([]);
    const [bids, setBids] = useState<Order[]>([]);
    const [pair, setPair] = useState<string>('PI_XBTUSD');

    const handleFeedToggle = (e) => {
        e.target.blur();
        setAsks([]);
        setBids([]);
        setPair(pair => pair === "PI_XBTUSD" ? "PI_ETHUSD" : "PI_XBTUSD")
    }

    // if (isBrowser) {
    useEffect(() => {
        const onMessageHandler = (event) => {
            const eventData = JSON.parse(event.data);

            if (!!eventData.asks && !!eventData.bids)
                try {
                    const isSnapshotData = eventData.feed === "book_ui_1_snapshot";
                    const newAsks = eventData.asks.map(ask => new Order(OrderType.ask, ask[0], ask[1]));
                    const newBids = eventData.bids.map(bid => new Order(OrderType.bid, bid[0], bid[1]));

                    addOrdersToList(newAsks, setAsks, isSnapshotData);
                    addOrdersToList(newBids, setBids, isSnapshotData);
                } catch (err) {
                    console.log(err);
                }
        };

        const obws = new OrderBookWebSocket(Constants.WEBSOCKET_URL, pair, onMessageHandler);

        window.onfocus = () => obws.init();
        window.onblur = () => obws.close();
        window.onbeforeunload = () => obws.close();

        return () => obws.close();
    }, [pair]);

    return { asks, bids, pair, handleFeedToggle };
<<<<<<< HEAD
}
=======
}
>>>>>>> 2635e92b849628933d4c84050fb808fb4e8cf7d0
