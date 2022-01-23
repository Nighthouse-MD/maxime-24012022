import { mocked } from 'ts-jest/utils';
import OrderBookWebSocket from '../OrderBookWebSocket';
import useOrderBookFeed from '../useOrderBookFeed';
import { renderHook, act } from '@testing-library/react-hooks'
import jsdom from 'jsdom';

const mockInit = jest.fn();
const mockClose = jest.fn();
jest.mock('../OrderBookWebSocket', () => {
    return jest.fn().mockImplementation(() => {
        return {
            init: mockInit,
            close: mockClose
        };
    });
});

describe('useOrderBookFeed', () => {
    const MockedOrderBookWebSocket = mocked(OrderBookWebSocket, true);

    beforeEach(() => {
        MockedOrderBookWebSocket.mockClear();
        mockInit.mockReset();
        mockClose.mockReset();
    });

    it('called the constructor of OrderBookWebSocket', () => {
        const { result } = renderHook(() => useOrderBookFeed());
        expect(OrderBookWebSocket).toHaveBeenCalledTimes(1);

        expect(typeof result.current.handleFeedToggle).toBe('function')
        expect(typeof result.current.handleReconnect).toBe('function')
    });

    it('returns the correct handlers and data', () => {
        const { result } = renderHook(() => useOrderBookFeed());
        expect(OrderBookWebSocket).toHaveBeenCalledTimes(1);

        expect(result.current.asks).toBeTruthy();
        expect(result.current.bids).toBeTruthy();
        expect(result.current.wasDisconnected).toBe(false)
        expect(result.current.pair).toBe("PI_XBTUSD")
        expect(typeof result.current.handleFeedToggle).toBe('function')
        expect(typeof result.current.handleReconnect).toBe('function')
    });

    it('calls the OrderBookWebSocket.close function onblur of window', () => {
        renderHook(() => useOrderBookFeed());

        act(() => window.onblur(null));

        expect(mockClose).toHaveBeenCalledTimes(1)
    });

    it('calls the OrderBookWebSocket.close function onbeforeunload of window', () => {
        renderHook(() => useOrderBookFeed());

        act(() => window.onblur(null));

        expect(mockClose).toHaveBeenCalledTimes(1)
    });

    it('calls the OrderBookWebSocket.close function onbeforeunload of window', () => {
        const { result } = renderHook(() => useOrderBookFeed());

        act(() => result.current.handleReconnect());

        expect(mockInit).toHaveBeenCalledTimes(1)
    });
})