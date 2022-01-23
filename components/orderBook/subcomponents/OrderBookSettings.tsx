import { memo } from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from '../OrderBook.module.scss'

const OrderBookSettings = ({ depth, setDepth, renderThrottleInterval, setRenderThrottleInterval }) => {
    return <>
        <Row>
            <Col xs="4" className={styles.settingsLabelCol}>
                Depth
            </Col>
            <Col xs="4" className={styles.settingsInputCol}>
                <input
                    className={styles.settingsInput}
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    type="range"
                    min="0"
                    max="40"
                />
            </Col>
            <Col xs="4" className={styles.settingsValueCol}>
                {depth}
            </Col>
        </Row>
        <Row>
            <Col xs="4" className={styles.settingsLabelCol}>
                Render throttle
            </Col>
            <Col xs="4" className={styles.settingsInputCol}>
                <input
                    className={styles.settingsInput}
                    value={renderThrottleInterval}
                    onChange={(e) => setRenderThrottleInterval(e.target.value)}
                    type="range"
                    min="0"
                    max="2000"
                />
            </Col>
            <Col xs="4" className={styles.settingsValueCol}>
                {renderThrottleInterval} ms
            </Col>
        </Row>
    </>;
}

export default memo(OrderBookSettings);