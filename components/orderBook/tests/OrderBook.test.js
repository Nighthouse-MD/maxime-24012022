import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals'

import OrderBook from '../OrderBook';
import Order from '../models/Order';
import OrderType from '../models/OrderType';
import hooks from '../hooks';

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

describe('When rendering the OrderBook component', () => {
    describe('without a websocket connection', () => {
        it('shows the OrderBook title, Depth, Render throttle and Toggle Feed elements', () => {
            render(<OrderBook defaultDepth={15} throttle={350} showDevTools={false} />);

            // query* functions will return the element or null if it cannot be found
            // get* functions will return the element or throw an error if it cannot be found
            expect(screen.queryByText('XBTUSD')).toBeInTheDocument();
            expect(screen.queryByText('Depth')).not.toBeInTheDocument();
            expect(screen.queryByText('Render throttle')).not.toBeInTheDocument();
            expect(screen.queryByText('Toggle Feed')).toBeInTheDocument();

            expect(screen.queryByRole("button", { id: /toggleFeed/i })).toBeInTheDocument();
            expect(screen.queryAllByRole('slider').length).toBe(0);

            expect(screen.queryByText('Spread')).not.toBeInTheDocument();
        });

        it('shows the No websocket connection', () => {
            render(<OrderBook defaultDepth={15} throttle={350} />);

            expect(screen.queryByText('No websocket connection')).not.toBeNull();
        });

        it('renders correctly for OrderType.ask', () => {
            const tree = renderer
                .create(<OrderBook defaultDepth={15} throttle={350} showDevTools={false} />)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });
    });


    describe('with a websocket connection', () => {
        it('shows the OrderBook title and Toggle Feed elements', () => {
            jest.spyOn(hooks, "useOrderBookFeed").mockImplementation(() => {
                return {
                    wasDisconnected: false,
                    reconnectHandler: jest.fn(),
                    asks: asks,
                    bids: bids,
                    pair: "PI_XBTUSD",
                    handleFeedToggle: jest.fn()
                };
            });

            render(<OrderBook defaultDepth={15} throttle={350} showDevTools={false} />);

            expect(screen.queryByText('XBTUSD')).toBeInTheDocument();
            expect(screen.queryByText('Depth')).not.toBeInTheDocument();
            expect(screen.queryByText('Render throttle')).not.toBeInTheDocument();
            expect(screen.queryByText('Toggle Feed')).toBeInTheDocument();

            expect(screen.getByRole("button", { id: /toggleFeed/i })).toBeInTheDocument();
            expect(screen.queryAllByRole('slider').length).toBe(0);
        });

        it('shows the OrderBook Depth, Render throttle elements when showDevTools === true ', () => {
            jest.spyOn(hooks, "useOrderBookFeed").mockImplementation(() => {
                return {
                    wasDisconnected: false,
                    reconnectHandler: jest.fn(),
                    asks: asks,
                    bids: bids,
                    pair: "PI_XBTUSD",
                    handleFeedToggle: jest.fn()
                };
            });

            render(<OrderBook defaultDepth={15} throttle={350} showDevTools={true} />);

            expect(screen.queryByText('XBTUSD')).toBeInTheDocument();
            expect(screen.queryByText('Depth')).toBeInTheDocument();
            expect(screen.queryByText('Render throttle')).toBeInTheDocument();
            expect(screen.queryByText('Toggle Feed')).toBeInTheDocument();

            expect(screen.getByRole("button", { id: /toggleFeed/i })).toBeInTheDocument();
            expect(screen.queryAllByRole('slider').length).toBe(2);
        });

        it('does not show the No websocket connection made', () => {
            jest.spyOn(hooks, "useOrderBookFeed").mockImplementation(() => {
                return {
                    wasDisconnected: false,
                    reconnectHandler: jest.fn(),
                    asks: asks,
                    bids: bids,
                    pair: "PI_XBTUSD",
                    handleFeedToggle: jest.fn()
                };
            });

            render(<OrderBook defaultDepth={15} throttle={350} showDevTools={false} />)

            expect(screen.queryByText('No websocket connection')).not.toBeInTheDocument();
        });

        it('shows all expected rows and headers', () => {
            jest.spyOn(hooks, "useOrderBookFeed").mockImplementation(() => {
                return {
                    wasDisconnected: false,
                    reconnectHandler: jest.fn(),
                    asks: asks,
                    bids: bids,
                    pair: "PI_XBTUSD",
                    handleFeedToggle: jest.fn()
                };
            });

            render(<OrderBook defaultDepth={15} throttle={350} showDevTools={false} />)

            expect(screen.queryAllByText('PRICE').length).toBe(2);
            expect(screen.queryAllByText('SIZE').length).toBe(2);
            expect(screen.queryAllByText('TOTAL').length).toBe(2);

            expect(screen.queryByText('Spread: 1.0 (6.67%)')).toBeInTheDocument();

            asks.forEach(ask => expect(screen.queryAllByText(ask.price.toLocaleString(undefined, { minimumFractionDigits: 2 })).length).toBeGreaterThan(0));
            bids.forEach(bid => expect(screen.queryAllByText(bid.price.toLocaleString(undefined, { minimumFractionDigits: 2 })).length).toBeGreaterThan(0));
        });

        it('shows the reconnect modal when the websocket says it disconnects', () => {
            jest.spyOn(hooks, "useOrderBookFeed").mockImplementation(() => {
                return {
                    wasDisconnected: true,
                    reconnectHandler: jest.fn(),
                    asks: asks,
                    bids: bids,
                    pair: "PI_XBTUSD",
                    handleFeedToggle: jest.fn()
                };
            });

            render(<OrderBook defaultDepth={15} throttle={350} showDevTools={false} />)

            expect(screen.queryByText('Websocket disconnected, click to reconnect')).toBeInTheDocument();
            expect(screen.queryByText("Reconnect")).toBeInTheDocument();
        });
    });
});