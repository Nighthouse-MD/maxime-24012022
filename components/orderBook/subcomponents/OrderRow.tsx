import { memo } from 'react';
import { Row } from 'react-bootstrap';
import styles, { greenBackground, redBackground } from '../OrderBook.module.scss';
import OrderType from '../models/OrderType';
import OrderRowNumbers from './OrderRowNumbers';

import { useMediaQuery } from 'react-responsive'

const OrderRow = ({ price, quantity, cumulativeVolume, volumePercentage, type }: OrderRowProps) => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' })
    const gradientDirection = isSmallScreen ? 'right' : type === OrderType.ask ? 'right' : 'left';
    const dynamicRowStyle = { background: `linear-gradient(to ${gradientDirection}, ${type === OrderType.ask ? redBackground : greenBackground} ${volumePercentage}%, transparent 0)` };

    return <Row className={styles.orderBookRow} style={dynamicRowStyle}>
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