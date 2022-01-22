import { memo } from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from './orderBook.module.scss'

const OrderBookSettings = ({ depth, setDepth, renderThrottleInterval, setRenderThrottleInterval }) => {
    return <>
        <Row>
            <Col md="5" className={styles.settingsLabel}>
                Depth
            </Col>
            <Col md="4" className={styles.settingsInput}>
                <input
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    type="range"
                    min="0"
                    max="40"
                />
            </Col>
            <Col md="3" className={styles.settingsInput}>
                {depth}
            </Col>
        </Row>
        <Row>
            <Col md="5" className={styles.settingsLabel}>
                Render throttle
            </Col>
            <Col md="4" className={styles.settingsInput}>
                <input
                    value={renderThrottleInterval}
                    onChange={(e) => setRenderThrottleInterval(e.target.value)}
                    type="range"
                    min="0"
                    max="2000"
                />
            </Col>
            <Col md="3" className={styles.settingsInput}>
                {renderThrottleInterval} ms
            </Col>
        </Row>
    </>;
}

export default memo(OrderBookSettings);