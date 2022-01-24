import OrderBookSettings from '../OrderBookSettings';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

describe('OrderBookSettings', () => {
    it('shows all the elements', () => {
        const handleSetDepth = jest.fn();
        const handleSetRenderThrottleInterval = jest.fn();
        render(<OrderBookSettings depth={15} setDepth={handleSetDepth} renderThrottleInterval={350} setRenderThrottleInterval={handleSetRenderThrottleInterval} />);

        expect(screen.queryByText("Depth")).toBeInTheDocument();
        expect(screen.queryByText("Render throttle")).toBeInTheDocument();

        expect(screen.queryByText("15")).toBeInTheDocument();
        expect(screen.queryByText("350 ms")).toBeInTheDocument();

        expect(screen.queryAllByRole('slider').length).toBe(2);
    });

    it('fires the handlers when sliding', () => {
        const handleSetDepth = jest.fn();
        const handleSetRenderThrottleInterval = jest.fn();
        render(<OrderBookSettings depth={15} setDepth={handleSetDepth} renderThrottleInterval={350} setRenderThrottleInterval={handleSetRenderThrottleInterval} />);

        const sliders = screen.queryAllByRole('slider');

        sliders.forEach(slider => fireEvent.change(slider, { target: { value: 20 } }));

        expect(handleSetDepth).toHaveBeenCalledTimes(1);
        expect(handleSetRenderThrottleInterval).toHaveBeenCalledTimes(1);
    });

    it('renders correctly for OrderType.bid', () => {
        const handleSetDepth = jest.fn();
        const handleSetRenderThrottleInterval = jest.fn();

        const tree = renderer
            .create(<OrderBookSettings depth={15} setDepth={handleSetDepth} renderThrottleInterval={350} setRenderThrottleInterval={handleSetRenderThrottleInterval} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});