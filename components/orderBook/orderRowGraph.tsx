import { memo } from 'react';
import { Row, Col } from 'react-bootstrap';
import { OrderType } from './models/enums';
import styles from './orderBook.module.scss'

const OrderRowGraph = ({ volumePercentage, type }: OrderRowGraphProps) => {
    const classes = [styles.orderRowBackground, (type === OrderType.ask ? styles.redRow : styles.greenRow), "float-end"].join(" ");
    return <Col xs='12' md='12' >
        <div className={classes} style={{ width: `${volumePercentage}%` }} />
    </Col>
};

interface OrderRowGraphProps {
    volumePercentage: number;
    type: OrderType;
}

export default memo(OrderRowGraph);