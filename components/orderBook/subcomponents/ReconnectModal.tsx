import { memo, MouseEventHandler } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import styles from '../OrderBook.module.scss'

const ReconnectModal = ({ show, handleReconnect }: Props) =>
    <Modal
        show={show}
        centered
        contentClassName={styles.reconnectModalContent}
        backdropClassName={styles.reconnectModalBackdrop}
    >
        <Modal.Body>
            <Container>
                <Row>
                    <Col>
                        Websocket disconnected, click to reconnect
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Button
                            id="reconnect"
                            name="reconnect"
                            onClick={handleReconnect}
                            className={styles.toggleButton}
                            size="sm">
                            Reconnect
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Modal.Body>
    </Modal>;

interface Props {
    show: boolean;
    handleReconnect: MouseEventHandler<HTMLButtonElement>;
}

export default memo(ReconnectModal);