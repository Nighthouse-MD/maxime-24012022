import OrderBookSettings from '../OrderBookSettings';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

describe('OrderBookSettings', () => {
    it('shows all the elements', () => {
        const handleDepthChange = jest.fn();
        const handleThrottleIntervalChange = jest.fn();
        render(<OrderBookSettings depth={15} handleDepthChange={handleDepthChange} throttleInterval={350} handleThrottleIntervalChange={handleThrottleIntervalChange} />);

        expect(screen.queryByText("Depth")).toBeInTheDocument();
        expect(screen.queryByText("Render throttle")).toBeInTheDocument();

        expect(screen.queryByText("15")).toBeInTheDocument();
        expect(screen.queryByText("350 ms")).toBeInTheDocument();

        expect(screen.queryAllByRole('slider').length).toBe(2);
    });

    it('fires the handlers when sliding', () => {
        const handleDepthChange = jest.fn();
        const handleThrottleIntervalChange = jest.fn();
        render(<OrderBookSettings depth={15} handleDepthChange={handleDepthChange} throttleInterval={350} handleThrottleIntervalChange={handleThrottleIntervalChange} />);

        const sliders = screen.queryAllByRole('slider');

        sliders.forEach(slider => fireEvent.change(slider, { target: { value: 20 } }));

        expect(handleDepthChange).toHaveBeenCalledTimes(1);
        expect(handleThrottleIntervalChange).toHaveBeenCalledTimes(1);
    });

    it('renders correctly for OrderType.bid', () => {
        const handleDepthChange = jest.fn();
        const handleThrottleIntervalChange = jest.fn();

        const tree = renderer
            .create(<OrderBookSettings depth={15} handleDepthChange={handleDepthChange} throttleInterval={350} handleThrottleIntervalChange={handleThrottleIntervalChange} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});