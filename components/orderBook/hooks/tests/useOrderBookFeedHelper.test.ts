import { addOrdersToList } from '../useOrderBookFeedHelpers';
import Order from '../../models/Order';
import OrderType from '../../models/OrderType';

describe('addOrdersToList', () => {

    const existingOrders = [
        new Order(OrderType.ask, 17, 9),
        new Order(OrderType.ask, 15, 11),
        new Order(OrderType.ask, 14, 1),
        new Order(OrderType.ask, 13, 3),
        new Order(OrderType.ask, 12, 3),
        new Order(OrderType.ask, 11, 3),
        new Order(OrderType.ask, 10, 3)
    ];

    const newOrders = [
        new Order(OrderType.ask, 16, 3),
        new Order(OrderType.ask, 15, 3),
        new Order(OrderType.ask, 14, 0)
    ];

    it('returns the correct Orders with correct values when message is not Snapshot', () => {
        const resetList = false;
        const result = addOrdersToList(existingOrders, newOrders, resetList);

        const existingUntouchedOrder = result.find(o => o.price === 17);
        expect(existingUntouchedOrder).toBeTruthy();
        expect(existingUntouchedOrder.quantity).toBe(9);

        const newOrder = result.find(o => o.price === 16);
        expect(newOrder).toBeTruthy();
        expect(newOrder.quantity).toBe(3);

        const existingUpdatedOrder = result.find(o => o.price === 15);
        expect(existingUpdatedOrder).toBeTruthy();
        expect(existingUpdatedOrder.quantity).not.toBe(11);

        const deletedOrder = result.find(o => o.price === 14);
        expect(deletedOrder).toBeFalsy();
    });

    it('returns the correct Orders with correct values message is Snapshot', () => {
        const resetList = true;
        const result = addOrdersToList(existingOrders, newOrders, resetList);

        expect(result.length).toBe(2)

        const deletedOrder = result.find(o => o.price === 14);
        expect(deletedOrder).toBeFalsy();

        const newOrder = result.find(o => o.price === 16);
        expect(newOrder).toBeTruthy();
        expect(newOrder.quantity).toBe(3);
    });
});
