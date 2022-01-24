import { useState, useEffect, useCallback } from 'react';
import Order from '../models/Order';
import OrderType from '../models/OrderType';
import CONSTANTS from '../../../Constants';
import OrderBookWebSocket from './OrderBookWebSocket';
import { addOrdersToList } from './useOrderBookFeedHelpers';

const useOrderBookFeed = () => {
    const [asks, setAsks] = useState<Order[]>([]);
    const [bids, setBids] = useState<Order[]>([]);
    const [pair, setPair] = useState<string>("PI_XBTUSD");
    const [wasDisconnected, setWasDisconnected] = useState<boolean>(false);
    const [handleReconnect, setHandleReconnect] = useState<() => void>();

    const handleFeedToggle = useCallback((e) => {
        e.target.blur();
        setAsks([]);
        setBids([]);
        setPair(pair => pair === "PI_XBTUSD" ? "PI_ETHUSD" : "PI_XBTUSD")
    }, []);

    useEffect(() => {
        const onMessageHandler = (event) => {
            try {
                const eventData = JSON.parse(event.data);

                if (!!eventData.asks && !!eventData.bids) {
                    const isSnapshotData = eventData.feed === CONSTANTS.WEBSOCKET_SNAPSHOT_FEED;
                    const newAsks = eventData.asks.map((ask: number[]) => new Order(OrderType.ask, ask[0], ask[1]));
                    const newBids = eventData.bids.map((bid: number[]) => new Order(OrderType.bid, bid[0], bid[1]));

                    setAsks(existingAsks => addOrdersToList(existingAsks, newAsks, isSnapshotData));
                    setBids(existingBids => addOrdersToList(existingBids, newBids, isSnapshotData));
                }
            }
            catch (event) {
                console.log("There was an error with the websocket data parsing.");
                setWasDisconnected(true);
            }
        };

        const obws = new OrderBookWebSocket(CONSTANTS.WEBSOCKET_URL, pair, onMessageHandler, () => {
            setWasDisconnected(true);
        });

        window.onblur = () => {
            obws.close();
            setWasDisconnected(true);
        }

        window.onbeforeunload = () => {
            obws.close();
            setWasDisconnected(true);
        }

        const reconnect = () => {
            obws.init();
            setWasDisconnected(false);
        }

        setHandleReconnect(() => { return reconnect; });

        return () => obws.close();
    }, [pair]);

    return { asks, bids, pair, wasDisconnected, handleReconnect, handleFeedToggle };
}

export default useOrderBookFeed;