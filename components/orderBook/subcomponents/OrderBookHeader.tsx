import { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from '../OrderBook.module.scss'
import OrderType from '../models/OrderType';

const OrderBookHeader = ({ type }: Props) => {
    return <Row className={`${styles.orderBookHeader} ${type === OrderType.bid ? styles.bidsHeader : ''}`}>
        <Col className={styles.price} md={{ order: type === OrderType.ask ? 1 : 3 }}>
            PRICE
        </Col>
        <Col className={styles.quantity} md={{ order: 2 }}>
            SIZE
        </Col>
        <Col className={styles.quantity} md={{ order: type === OrderType.ask ? 3 : 1 }}>
            TOTAL
        </Col>
    </Row>;
}

interface Props {
    type: OrderType;
}

export default memo(OrderBookHeader);