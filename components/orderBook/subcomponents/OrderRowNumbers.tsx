import { memo } from 'react';
import { Col } from 'react-bootstrap';
import styles from '../OrderBook.module.scss'
import OrderType from '../models/OrderType';

const OrderRowNumbers = ({ type, price, quantity, cumulativeVolume }: OrderRowNumbersProps) => {
    return <>
        <Col xs={{ order: 1 }} md={{ order: type === OrderType.bid ? 3 : 1 }} className={`${styles.price} ${type === OrderType.ask ? styles.red : styles.green}`}>
            <span className="align-middle">{price}</span>
        </Col>
        <Col xs={{ order: 2 }} md={{ order: 2 }} className={styles.quantity}>
            <span className="align-middle">{quantity}</span>
        </Col>
        <Col xs={{ order: 3 }} md={{ order: type === OrderType.bid ? 1 : 3 }} className={styles.quantity}>
            <span className="align-middle">{cumulativeVolume}</span>
        </Col>
    </>
};

interface OrderRowNumbersProps {
    type: OrderType;
    price: string;
    quantity: string;
    cumulativeVolume: string;
}

export default memo(OrderRowNumbers);