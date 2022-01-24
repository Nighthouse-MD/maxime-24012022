import ReconnectModal from '../ReconnectModal';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent, getByText } from '@testing-library/react';

describe('ReconnectModal', () => {
    it('does not show the content when inactive', () => {
        const handleReconnectMock = jest.fn();
        render(<ReconnectModal show={false} handleReconnect={handleReconnectMock} />);

        expect(screen.queryByText("Websocket disconnected, click to reconnect")).not.toBeInTheDocument();
        expect(screen.queryByText("Reconnect")).not.toBeInTheDocument();
    });

    it('does show the content when active', () => {
        const handleReconnectMock = jest.fn();
        render(<ReconnectModal show={true} handleReconnect={handleReconnectMock} />);

        expect(screen.queryByText("Websocket disconnected, click to reconnect")).toBeInTheDocument();
        expect(screen.queryByText("Reconnect")).toBeInTheDocument();
    });

    it('fires the handler when clicking the button', () => {
        const handleReconnectMock = jest.fn();
        render(<ReconnectModal show={true} handleReconnect={handleReconnectMock} />);

        fireEvent(screen.queryByText("Reconnect"),
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
            }),
        );

        expect(handleReconnectMock).toHaveBeenCalledTimes(1);
    });
});