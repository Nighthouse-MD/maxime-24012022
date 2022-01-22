import { memo } from 'react';
import { Row, Col } from 'react-bootstrap';
import { OrderType } from './models/enums';
import styles from './orderBook.module.scss';
import OrderRowNumbers from './orderRowNumbers';
import OrderRowGraph from './orderRowGraph';

const OrderRow = ({ price, quantity, cumulativeVolume, volumePercentage, type }: OrderRowProps) => {
    return <Row className={styles.orderBookRow}>
        <OrderRowNumbers
            type={type}
            price={price}
            quantity={quantity}
            cumulativeVolume={cumulativeVolume}
        />
        <OrderRowGraph
            type={type}
            volumePercentage={volumePercentage}
        />
    </Row>;
};

interface OrderRowProps {
    price: number;
    quantity: number;
    cumulativeVolume: number;
    volumePercentage: number;
    type: OrderType;
}

export default memo(OrderRow);