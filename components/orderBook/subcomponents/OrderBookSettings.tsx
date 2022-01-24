import React, { memo } from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from '../OrderBook.module.scss'

const OrderBookSettings = ({ depth, handleDepthChange, throttleInterval, handleThrottleIntervalChange }: Props) => {
    return <>
        <Row>
            <Col xs="4" className={styles.settingsLabelCol}>
                Depth
            </Col>
            <Col xs="4" className={styles.settingsInputCol}>
                <input
                    id="depth"
                    className={styles.settingsInput}
                    value={depth}
                    onChange={handleDepthChange}
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
                    id="renderThrottle"
                    className={styles.settingsInput}
                    value={throttleInterval}
                    onChange={handleThrottleIntervalChange}
                    type="range"
                    min="0"
                    max="2000"
                />
            </Col>
            <Col xs="4" className={styles.settingsValueCol}>
                {throttleInterval} ms
            </Col>
        </Row>
    </>;
}

interface Props {
    depth: number;
    throttleInterval: number;
    handleDepthChange: React.ChangeEventHandler<HTMLInputElement>;
    handleThrottleIntervalChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default memo(OrderBookSettings);