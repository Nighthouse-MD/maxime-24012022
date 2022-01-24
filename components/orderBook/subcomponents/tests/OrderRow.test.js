import OrderRow from '../OrderRow';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import OrderType from '../../models/OrderType';

describe('OrderRow', () => {
    it('shows the correct order for OrderType.ask', () => {
        const { container } = render(<OrderRow type={OrderType.ask} volumePercentage={43} children={<div>TestChild</div>} />);
        const theRow = container.getElementsByClassName("orderBookRow")[0];

        expect(theRow.className).toBe("orderBookRow row");
        expect(theRow).toHaveStyle("background:linear-gradient(to right, redBackground 43%, transparent 0)");
    });

    it('renders correctly for OrderType.ask', () => {
        const tree = renderer
            .create(<OrderRow type={OrderType.ask} volumePercentage={43} children={<div>TestChild</div>} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('shows the correct order for OrderType.bid', () => {
        const { container } = render(<OrderRow type={OrderType.bid} volumePercentage={43} children={<div>TestChild</div>} />);
        const theRow = container.getElementsByClassName("orderBookRow")[0];

        expect(theRow.className).toBe("orderBookRow row");
        expect(theRow).toHaveStyle("background:linear-gradient(to left, greenBackground 43%, transparent 0)");
    });

    it('renders correctly for OrderType.bid', () => {
        const tree = renderer
            .create(<OrderRow type={OrderType.bid} volumePercentage={43} children={<div>TestChild</div>} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});