import { memo } from 'react';
import { Row } from 'react-bootstrap';
import styles from '../OrderBook.module.scss';
import OrderType from '../models/OrderType';
import OrderRowNumbers from './OrderRowNumbers';

import { useMediaQuery } from 'react-responsive'

const OrderRow = ({ price, quantity, cumulativeVolume, volumePercentage, type }: OrderRowProps) => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' })
    const gradientDirection = isSmallScreen ? 'right' : type === OrderType.ask ? 'right' : 'left';
    const dynamicBackgroundStyle = `linear-gradient(to ${gradientDirection}, ${type === OrderType.ask ? styles.redBackground : styles.greenBackground} ${volumePercentage}%, transparent 0)`;

    return <Row className={styles.orderBookRow} style={{ background: dynamicBackgroundStyle }}>
        <OrderRowNumbers
            type={type}
            price={price}
            quantity={quantity}
            cumulativeVolume={cumulativeVolume}
        />
    </Row>;
};

interface OrderRowProps {
    price: string;
    quantity: string;
    cumulativeVolume: string;
    volumePercentage: number;
    type: OrderType;
}

export default memo(OrderRow);