import React from 'react';
import { render, screen } from '@testing-library/react';
import { } from '@testing-library/react-hooks'
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
        it('shows the OrderBook title, Depth, Render throttle and Toggle Feed elements', async () => {
            render(<OrderBook defaultDepth={15} throttle={350} />);

            // query* functions will return the element or null if it cannot be found
            // get* functions will return the element or throw an error if it cannot be found
            expect(screen.queryByText('XBTUSD')).toBeInTheDocument();
            expect(screen.queryByText('Depth')).toBeInTheDocument();
            expect(screen.queryByText('Render throttle')).toBeInTheDocument();
            expect(screen.queryByText('Toggle Feed')).toBeInTheDocument();

            expect(screen.queryByRole("button", { id: /toggleFeed/i })).toBeInTheDocument();
            expect(screen.queryAllByRole('slider').length).toBe(2);

            expect(screen.queryByText('Spread')).not.toBeInTheDocument();
        });

        it('Shows the No websocket connection made', async () => {
            render(<OrderBook defaultDepth={15} throttle={350} />);

            expect(screen.queryByText('No websocket connection')).not.toBeNull();
        });
    });


    describe('with a websocket connection', () => {
        it('shows the OrderBook title, Depth, Render throttle and Toggle Feed elements', async () => {
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

            render(<OrderBook defaultDepth={15} throttle={350} />);

            expect(screen.queryByText('XBTUSD')).toBeInTheDocument();
            expect(screen.queryByText('Depth')).toBeInTheDocument();
            expect(screen.queryByText('Render throttle')).toBeInTheDocument();
            expect(screen.queryByText('Toggle Feed')).toBeInTheDocument();

            expect(screen.getByRole("button", { id: /toggleFeed/i })).toBeInTheDocument();
            expect(screen.getAllByRole('slider').length).toBe(2);
        });


        it('does not show the No websocket connection made', async () => {
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

            render(<OrderBook defaultDepth={15} throttle={350} />)

            expect(screen.queryByText('No websocket connection')).not.toBeInTheDocument();
        });

        it('shows all expected rows and headers', async () => {
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

            render(<OrderBook defaultDepth={15} throttle={350} />)

            expect(screen.queryAllByText('PRICE').length).toBe(2);
            expect(screen.queryAllByText('SIZE').length).toBe(2);
            expect(screen.queryAllByText('TOTAL').length).toBe(2);

            expect(screen.queryByText('Spread: 1.0 (6.67%)')).toBeInTheDocument();

            asks.forEach(ask => expect(screen.queryAllByText(ask.price.toFixed(2).toLocaleString()).length).toBeGreaterThan(0));
            bids.forEach(bid => expect(screen.queryAllByText(bid.price.toFixed(2).toLocaleString()).length).toBeGreaterThan(0));
        });

        it('shows the reconnect modal when the websocket says it disconnects', async () => {
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

            render(<OrderBook defaultDepth={15} throttle={350} />)

            expect(screen.queryByText('Websocket disconnected, click to reconnect')).toBeInTheDocument();
            expect(screen.queryByText("Reconnect")).toBeInTheDocument();
        });
    });
});