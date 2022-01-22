import { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './orderBook.module.scss'

const OrderBookHeader = () => {
    return <Row className={styles.orderBookHeader}>
        <Col className={styles.price}>
            PRICE
        </Col>
        <Col className={styles.quantity}>
            SIZE
        </Col>
        <Col className={styles.quantity}>
            TOTAL
        </Col>
    </Row>;
}

export default memo(OrderBookHeader);