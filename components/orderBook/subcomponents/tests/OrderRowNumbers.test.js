import OrderRowNumbers from '../OrderRowNumbers';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import OrderType from '../../models/OrderType';

describe('OrderRowNumbers', () => {
    it('shows the correct order for OrderType.ask', () => {
        render(<OrderRowNumbers type={OrderType.ask} price={123} quantity={234} cumulativeVolume={567} />);

        const priceElement = screen.queryByText("123");
        expect(priceElement).toBeInTheDocument();
        expect(priceElement.parentElement.className).toBe('price red order-md-1 order-1 col');

        const sizeElement = screen.queryByText("234");
        expect(sizeElement).toBeInTheDocument();
        expect(sizeElement.parentElement.className).toBe('quantity order-md-2 order-2 col');

        const totalElement = screen.queryByText("567");
        expect(totalElement).toBeInTheDocument();
        expect(totalElement.parentElement.className).toBe('quantity order-md-3 order-3 col');
    });

    it('shows the correct order for OrderType.bid', () => {
        render(<OrderRowNumbers type={OrderType.bid} price={123} quantity={234} cumulativeVolume={567} />);

        const priceElement = screen.queryByText("123");
        expect(priceElement).toBeInTheDocument();
        expect(priceElement.parentElement.className).toBe('price green order-md-3 order-1 col');

        const sizeElement = screen.queryByText("234");
        expect(sizeElement).toBeInTheDocument();
        expect(sizeElement.parentElement.className).toBe('quantity order-md-2 order-2 col');

        const totalElement = screen.queryByText("567");
        expect(totalElement).toBeInTheDocument();
        expect(totalElement.parentElement.className).toBe('quantity order-md-1 order-3 col');
    });

    it('renders correctly for OrderType.ask', () => {
        const tree = renderer
            .create(<OrderRowNumbers type={OrderType.ask} price={123} quantity={234} cumulativeVolume={567} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly for OrderType.bid', () => {
        const tree = renderer
            .create(<OrderRowNumbers type={OrderType.bid} price={123} quantity={234} cumulativeVolume={567} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});