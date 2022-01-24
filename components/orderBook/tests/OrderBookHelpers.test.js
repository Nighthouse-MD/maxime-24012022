import { addCumulativeVolumes, addVolumePercentage, calculateSpreadInfo } from '../OrderBookHelpers';
import Order from '../models/Order';
import OrderType from '../models/OrderType';

describe('addCumulativeVolumes', () => {
    describe('for asks', () => {
        const depth = 7;

        const askOrders = [
            new Order(OrderType.ask, 16, 3),
            new Order(OrderType.ask, 15, 3),
            new Order(OrderType.ask, 14, 3),
            new Order(OrderType.ask, 13, 3),
            new Order(OrderType.ask, 12, 3),
            new Order(OrderType.ask, 11, 3),
            new Order(OrderType.ask, 10, 3)
        ]

        const expectedCumulativeVolumesAsks = [
            { price: 16, cumulativeVolume: 21 },
            { price: 15, cumulativeVolume: 18 },
            { price: 14, cumulativeVolume: 15 },
            { price: 13, cumulativeVolume: 12 },
            { price: 12, cumulativeVolume: 9 },
            { price: 11, cumulativeVolume: 6 },
            { price: 10, cumulativeVolume: 3 }
        ]

        const resultForAsks = addCumulativeVolumes(askOrders, false, depth);

        it('returns all the Orders', () => {
            expect(resultForAsks).toBeTruthy();
            expect(resultForAsks.length).toBe(7);
        });

        it('returns the Orders with identical price and quantity', () => {
            resultForAsks.forEach((order) => {
                const original = askOrders.find(o => o.price === order.price);
                expect(order.price).toBe(original.price);
                expect(order.quantity).toBe(original.quantity);
            });
        });

        it('returns the Orders with correct cumulativeVolume for descending cumulative volume', () => {

            expectedCumulativeVolumesAsks.forEach(expected => {
                const order = resultForAsks.find(o => o.price === expected.price);
                expect(order.cumulativeVolume).toBe(expected.cumulativeVolume);
            });
        });

        it('returns the Orders with cumulativeVolume greated then 0', () => {
            resultForAsks.forEach((order, i) => {
                if (i > 0)
                    expect(order.cumulativeVolume).toBeGreaterThan(0);
            });
        });

        it('returns all the Orders without crashing when the amount of orders is less than the desired depth', () => {
            const resultForHigherDepth = addCumulativeVolumes(askOrders, false, 30);

            expect(resultForHigherDepth).toBeTruthy();
            expect(resultForHigherDepth.length).toBe(7);
        });
    });

    describe('for bids', () => {
        const depth = 7;

        const bidOrders = [
            new Order(OrderType.bid, 9, 3),
            new Order(OrderType.bid, 8, 3),
            new Order(OrderType.bid, 7, 3),
            new Order(OrderType.bid, 6, 6),
            new Order(OrderType.bid, 5, 3),
            new Order(OrderType.bid, 4, 3),
            new Order(OrderType.bid, 3, 3)
        ]

        const expectedCumulativeVolumesBids = [
            { price: 9, cumulativeVolume: 3 },
            { price: 8, cumulativeVolume: 6 },
            { price: 7, cumulativeVolume: 9 },
            { price: 6, cumulativeVolume: 15 },
            { price: 5, cumulativeVolume: 18 },
            { price: 4, cumulativeVolume: 21 },
            { price: 3, cumulativeVolume: 24 }
        ]

        const resultForBids = addCumulativeVolumes(bidOrders, true, depth);

        it('returns all the Orders', () => {
            expect(resultForBids).toBeTruthy();
            expect(resultForBids.length).toBe(7);
        });

        it('returns the Orders with identical price and quantity', () => {
            resultForBids.forEach((order) => {
                const original = bidOrders.find(o => o.price === order.price);
                expect(order.price).toBe(original.price);
                expect(order.quantity).toBe(original.quantity);
            });
        });

        it('returns the Orders with cumulativeVolume greated then 0', () => {
            resultForBids.forEach((order) => {
                expect(order.cumulativeVolume).toBeGreaterThan(0);
            });
        });

        it('returns the Orders with correct cumulativeVolume for ascending cumulative volume', () => {
            expectedCumulativeVolumesBids.forEach(expected => {
                const order = resultForBids.find(o => o.price === expected.price);
                expect(order.cumulativeVolume).toBe(expected.cumulativeVolume);
            });
        });

        it('returns all the Orders without crashing when the amount of orders is less than the desired depth', () => {
            const resultForHigherDepth = addCumulativeVolumes(bidOrders, true, 30);

            expect(resultForHigherDepth).toBeTruthy();
            expect(resultForHigherDepth.length).toBe(7);
        });
    });
});

describe('addVolumePercentage', () => {
    const depth = 7;

    const askOrders = [
        new Order(OrderType.ask, 16, 3),
        new Order(OrderType.ask, 15, 3),
        new Order(OrderType.ask, 14, 3),
        new Order(OrderType.ask, 13, 3),
        new Order(OrderType.ask, 12, 3),
        new Order(OrderType.ask, 11, 3),
        new Order(OrderType.ask, 10, 3)
    ]

    const expectedVolumePercentageAsks = [
        { price: 16, volumePercentage: 87.5 },
        { price: 15, volumePercentage: 75 },
        { price: 14, volumePercentage: 62.5 },
        { price: 13, volumePercentage: 50 },
        { price: 12, volumePercentage: 37.5 },
        { price: 11, volumePercentage: 25 },
        { price: 10, volumePercentage: 12.5 }
    ]

    const bidOrders = [
        new Order(OrderType.bid, 9, 3),
        new Order(OrderType.bid, 8, 3),
        new Order(OrderType.bid, 7, 3),
        new Order(OrderType.bid, 6, 6),
        new Order(OrderType.bid, 5, 3),
        new Order(OrderType.bid, 4, 3),
        new Order(OrderType.bid, 3, 3)
    ]

    const expectedCumulativePercentageBids = [
        { price: 9, volumePercentage: 12.5 },
        { price: 8, volumePercentage: 25 },
        { price: 7, volumePercentage: 37.5 },
        { price: 6, volumePercentage: 62.5 },
        { price: 5, volumePercentage: 75 },
        { price: 4, volumePercentage: 87.5 },
        { price: 3, volumePercentage: 100 }
    ]

    const asksWithCVolume = addCumulativeVolumes(askOrders, false, depth);
    const bidsWithCVolume = addCumulativeVolumes(bidOrders, true, depth);

    const largestCumulativeTestVolume =
        asksWithCVolume[0].cumulativeVolume > bidsWithCVolume[bidsWithCVolume.length - 1].cumulativeVolume ?
            asksWithCVolume[0].cumulativeVolume :
            bidsWithCVolume[bidsWithCVolume.length - 1].cumulativeVolume;

    describe('for asks', () => {
        const resultsWithCPercentage = addVolumePercentage(asksWithCVolume, largestCumulativeTestVolume);

        it('returns all the Orders', () => {
            expect(resultsWithCPercentage).toBeTruthy();
            expect(resultsWithCPercentage.length).toBe(7);
        });

        it('returns the Orders with identical price, quantity, and cumulativeVolume', () => {
            resultsWithCPercentage.forEach((order) => {
                const original = askOrders.find(o => o.price === order.price);
                expect(order.price).toBe(original.price);
                expect(order.quantity).toBe(original.quantity);
                expect(order.cumulativeVolume).toBe(original.cumulativeVolume);
            });
        });

        it('returns the Orders with volumePercentage greated then 0', () => {
            resultsWithCPercentage.forEach((order) => {
                expect(order.volumePercentage).toBeGreaterThan(0);
            });
        });

        it('returns the Orders with correct volumePercentage for descending cumulative volume', () => {
            expectedVolumePercentageAsks.forEach(expected => {
                const order = resultsWithCPercentage.find(o => o.price === expected.price);
                expect(order.volumePercentage).toBe(expected.volumePercentage);
            });
        });
    });

    describe('for bids', () => {
        const resultsWithCPercentage = addVolumePercentage(bidsWithCVolume, largestCumulativeTestVolume);

        it('returns all the Orders', () => {
            expect(resultsWithCPercentage).toBeTruthy();
            expect(resultsWithCPercentage.length).toBe(7);
        });

        it('returns the Orders with identical price, quantity, and cumulativeVolume', () => {
            resultsWithCPercentage.forEach((order) => {
                const original = bidOrders.find(o => o.price === order.price);
                expect(order.price).toBe(original.price);
                expect(order.quantity).toBe(original.quantity);
                expect(order.cumulativeVolume).toBe(original.cumulativeVolume);
            });
        });

        it('returns the Orders with volumePercentage greated then 0', () => {
            resultsWithCPercentage.forEach((order) => {
                expect(order.volumePercentage).toBeGreaterThan(0);
            });
        });

        it('returns the Orders with correct volumePercentage for ascending cumulative volume', () => {
            expectedCumulativePercentageBids.forEach(expected => {
                const order = resultsWithCPercentage.find(o => o.price === expected.price);
                expect(order.volumePercentage).toBe(expected.volumePercentage);
            });
        });
    });
});

describe('calculateSpreadInfo', () => {
    describe('When no valid data is passed', () => {
        it('returns a Spread object with zero numbers', () => {
            const result = calculateSpreadInfo(null, undefined);
            expect(result.amount).toBe(0);
            expect(result.percent).toBe(0);
        });
    });

    describe('When two empty lists are passed', () => {
        it('returns a Spread object with zero numbers', () => {
            const result = calculateSpreadInfo([], []);
            expect(result.amount).toBe(0);
            expect(result.percent).toBe(0);
        });
    });

    describe('When on empty list and one valid list is passed', () => {
        it('returns a Spread object with zero numbers', () => {
            const asks = [];

            const bids = [
                new Order(OrderType.bid, 13, 3),
                new Order(OrderType.bid, 12, 3),
                new Order(OrderType.bid, 10, 3)
            ];

            const result = calculateSpreadInfo(asks, bids);
            expect(result.amount).toBe(0);
            expect(result.percent).toBe(0);
        });
    });

    describe('When two valid lists are passed', () => {
        it('returns a Spread object with zero numbers', () => {

            const asks = [
                new Order(OrderType.ask, 30, 3),
                new Order(OrderType.ask, 29, 3),
                new Order(OrderType.ask, 28, 3),
                new Order(OrderType.ask, 27, 3),
                new Order(OrderType.ask, 26, 3),
                new Order(OrderType.ask, 25, 3),
                new Order(OrderType.ask, 24, 3),
                new Order(OrderType.ask, 23, 3),
                new Order(OrderType.ask, 22, 3),
                new Order(OrderType.ask, 21, 3),
                new Order(OrderType.ask, 20, 3),
                new Order(OrderType.ask, 19, 3),
                new Order(OrderType.ask, 18, 3),
                new Order(OrderType.ask, 17, 3),
                new Order(OrderType.ask, 16, 3)
            ];

            const bids = [
                new Order(OrderType.bid, 15, 3),
                new Order(OrderType.bid, 14, 3),
                new Order(OrderType.bid, 13, 3),
                new Order(OrderType.bid, 12, 3),
                new Order(OrderType.bid, 11, 3),
                new Order(OrderType.bid, 10, 3),
                new Order(OrderType.bid, 9, 3),
                new Order(OrderType.bid, 8, 3),
                new Order(OrderType.bid, 7, 3),
                new Order(OrderType.bid, 6, 6),
                new Order(OrderType.bid, 5, 3),
                new Order(OrderType.bid, 4, 3),
                new Order(OrderType.bid, 3, 3),
                new Order(OrderType.bid, 2, 3),
                new Order(OrderType.bid, 1, 3)
            ];

            const result = calculateSpreadInfo(asks, bids);
            expect(result.amount).toBe(1);
            expect(result.percent).toBe(6.67);
        });
    });
});
