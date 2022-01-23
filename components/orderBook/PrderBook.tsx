import { useState, useMemo } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import styles from './OrderBook.module.scss'

import OrderRow from './subcomponents/OrderRow';
import OrderBookSettings from './subcomponents/OrderBookSettings';
import OrderBookHeader from './subcomponents/OrderBookHeader';
import FeedToggle from './subcomponents/FeedToggle';

import Order from './models/Order';

import { orderByPropertyNameDesc } from '../../tools/orderBy';
import { addCumulativeVolumes, addVolumePercentage, calculateSpreadInfo } from './orderBookHelpers';

import useOrderBookWebSocket from './hooks/useOrderBookWebSocket';
import useThrottleTick from './hooks/useThrottleTick';
import OrderType from './models/OrderType';

export default function OrderBook() {
  const [depth, setDepth] = useState<number>(15);
  const [renderThrottleInterval, setRenderThrottleInterval] = useState<number>(350);

  const throttleTick = useThrottleTick(renderThrottleInterval);
  const { asks, bids, pair, handleFeedToggle } = useOrderBookWebSocket();

  const throttledOrderBookRows = useMemo(
    () => {
      if (!asks.length && !bids.length)
        return <Row>
          <Col className={styles.noConnection}>No websocket connection</Col>
        </Row>;

      const composeOrderRows = () => {
        //order and take depth
        const asksToShow = orderByPropertyNameDesc(asks, 'price').slice(Math.max(asks.length - depth, 0));
        const bidsToShow = orderByPropertyNameDesc(bids, 'price').slice(0, depth);

        //calculate spread
        const spread = calculateSpreadInfo(asksToShow, bidsToShow);

        //add cumulative volumes
        const asksWithVolumes = addCumulativeVolumes(asksToShow, false, depth);
        const bidsWithVolumes = addCumulativeVolumes(bidsToShow, true, depth);

        //get the biggest cumulative volume to define 100%
        const biggestVolume = asksWithVolumes.length && bidsWithVolumes.length ? (asksWithVolumes[0].cumulativeVolume > bidsWithVolumes[bidsWithVolumes.length - 1].cumulativeVolume ?
          asksWithVolumes[0].cumulativeVolume :
          bidsWithVolumes[bidsWithVolumes.length - 1].cumulativeVolume) : 0;

        //add volume percentage for graph rendering
        const asksWithVolumePercentage = addVolumePercentage(asksWithVolumes, biggestVolume);
        const bidsWithVolumePercantage = addVolumePercentage(bidsWithVolumes, biggestVolume);

        //create OrderRow components
        const mapToOrderRow = (o: Order) =>
          <OrderRow
            key={o.price}
            price={o.price.toFixed(2).toLocaleString()}
            quantity={o.quantity.toLocaleString()}
            cumulativeVolume={o.cumulativeVolume.toLocaleString()}
            volumePercentage={o.volumePercentage}
            type={o.type} />;

        const askComponents = asksWithVolumePercentage.map((o: Order) => mapToOrderRow(o));
        const bidComponents = bidsWithVolumePercantage.map((o: Order) => mapToOrderRow(o));

        return { askComponents, bidComponents, spread };
      }

      const { askComponents, bidComponents, spread } = composeOrderRows();

      return <Row>
        <Col
          xs={{ span: 12, order: 1 }}
          md={{ span: 6, order: 3 }}>
          <OrderBookHeader type={OrderType.ask} />
          <div className={styles.responsiveAskRows}>
            {askComponents}
          </div>
        </Col>
        <Col
          xs={{ span: 12, order: 2 }}
          md={{ span: 12, order: 1 }}
          className={`${styles.spread} text-center`}>
          Spread: {spread.amount.toFixed(1)} ({spread.percent}%)
        </Col>
        <Col
          xs={{ span: 12, order: 3 }}
          md={{ span: 6, order: 2 }}>
          <OrderBookHeader type={OrderType.bid} />
          <div className="d-flex flex-column">
            {bidComponents}
          </div>
        </Col>
      </Row>;
    },
    [throttleTick]
  );

  return (
    <Container className={styles.orderBookContainer}>
      <Row>
        <Col>
          <h2>{pair.substring(3)}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <OrderBookSettings
            depth={depth}
            setDepth={setDepth}
            renderThrottleInterval={renderThrottleInterval}
            setRenderThrottleInterval={setRenderThrottleInterval}
          />
        </Col>
      </Row>
      <hr />
      <br />
      <Row>
        <div className={styles.orderBookTitle}>
          Order book
        </div>
      </Row>
      <Row>
        <Col >
          {throttledOrderBookRows}
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <FeedToggle handleFeedToggle={handleFeedToggle} />
        </Col>
      </Row >
    </Container >
  );
}
