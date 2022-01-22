import { memo } from 'react';
import { Row, Col } from 'react-bootstrap';
import { OrderType } from './models/enums';
import styles from './orderBook.module.scss'

const OrderRowNumbers = ({ type, price, quantity, cumulativeVolume }: OrderRowNumbersProps) => {
    return <>
        <Col xs='4' md='4' className={`${styles.price} ${type === OrderType.ask ? styles.red : styles.green}`}>
            {price}
        </Col>
        <Col xs='4' md='4' className={styles.quantity}>
            {quantity}
        </Col>
        <Col xs='4' md='4' className={styles.quantity}>
            {cumulativeVolume}
        </Col>
    </>
};

interface OrderRowNumbersProps {
    type: OrderType;
    price: number;
    quantity: number;
    cumulativeVolume: number;
}

export default memo(OrderRowNumbers);