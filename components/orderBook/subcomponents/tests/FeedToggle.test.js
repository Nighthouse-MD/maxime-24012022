import FeedToggle from '../FeedToggle';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent, getByText } from '@testing-library/react';

describe('FeedToggle', () => {
    it('shows the button', () => {
        const handleFeedToggleMock = jest.fn();
        render(<FeedToggle handleFeedToggle={handleFeedToggleMock} />);

        expect(screen.queryByText("Toggle Feed")).toBeInTheDocument();
    });

    it('fires the handler when clicking the button', () => {
        const handleFeedToggleMock = jest.fn();
        const { container } = render(<FeedToggle handleFeedToggle={handleFeedToggleMock} />);

        fireEvent(
            getByText(container, "Toggle Feed"),
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
            }),
        );

        expect(handleFeedToggleMock).toHaveBeenCalledTimes(1);
    });

    it('renders correctly', () => {
        const handleFeedToggleMock = jest.fn();
        const tree = renderer
            .create(<FeedToggle handleFeedToggle={handleFeedToggleMock} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});