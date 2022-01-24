import { memo } from 'react';
import { Row } from 'react-bootstrap';
import styles from '../OrderBook.module.scss';
import OrderType from '../models/OrderType';

import { useMediaQuery } from 'react-responsive'

const OrderRow = ({ volumePercentage, type, children }: OrderRowProps) => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' })
    const gradientDirection = isSmallScreen ? 'right' : type === OrderType.ask ? 'right' : 'left';
    const dynamicBackgroundStyle = `linear-gradient(to ${gradientDirection}, ${type === OrderType.ask ? styles.redBackground : styles.greenBackground} ${volumePercentage}%, transparent 0)`;

    return <Row className={styles.orderBookRow} style={{ background: dynamicBackgroundStyle }}>
        {children}
    </Row>;
};

interface OrderRowProps {
    volumePercentage: number;
    type: OrderType;
    children: React.ReactNode;
}

export default memo(OrderRow);