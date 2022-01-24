import OrderBookHeader from '../OrderBookHeader';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import OrderType from '../../models/OrderType';

describe('OrderBookHeader', () => {
    it('shows the correct order for OrderType.ask', () => {
        render(<OrderBookHeader type={OrderType.ask} />);

        const priceElement = screen.queryByText("PRICE");
        expect(priceElement).toBeInTheDocument();
        expect(priceElement.className).toBe('price order-md-1 col');

        const sizeElement = screen.queryByText("SIZE");
        expect(sizeElement).toBeInTheDocument();
        expect(sizeElement.className).toBe('quantity order-md-2 col');

        const totalElement = screen.queryByText("TOTAL");
        expect(totalElement).toBeInTheDocument();
        expect(totalElement.className).toBe('quantity order-md-3 col');
    });

    it('shows the correct order for OrderType.bid', () => {
        render(<OrderBookHeader type={OrderType.bid} />);

        const priceElement = screen.queryByText("PRICE");
        expect(priceElement).toBeInTheDocument();
        expect(priceElement.className).toBe('price order-md-3 col');

        const sizeElement = screen.queryByText("SIZE");
        expect(sizeElement).toBeInTheDocument();
        expect(sizeElement.className).toBe('quantity order-md-2 col');

        const totalElement = screen.queryByText("TOTAL");
        expect(totalElement).toBeInTheDocument();
        expect(totalElement.className).toBe('quantity order-md-1 col');
    });

    it('renders correctly for OrderType.ask', () => {
        const tree = renderer
            .create(<OrderBookHeader type={OrderType.ask} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly for OrderType.bid', () => {
        const tree = renderer
            .create(<OrderBookHeader type={OrderType.bid} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});