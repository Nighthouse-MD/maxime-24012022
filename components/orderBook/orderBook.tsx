import { useState, useEffect, useMemo } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import styles from './orderBook.module.scss'

import OrderRow from './orderRow';
import OrderBookSettings from './orderBookSettings';
import OrderBookHeader from './orderBookHeader';
import Order from './models/Order';

import { orderByPropertyNameDesc } from '../../tools/orderBy';
import { addCumulativeVolumes, addVolumePercentage, calculateSpreadInfo } from './orderBookHelpers';

import useOrderBookWebSocket from './hooks/useOrderBookWebSocket';
import useThrottleTick from './hooks/useThrottleTick';

export default function OrderBook() {
  const [depth, setDepth] = useState<number>(15);
  const [renderThrottleInterval, setRenderThrottleInterval] = useState<number>(350);

  const throttleTick = useThrottleTick(renderThrottleInterval);
  const { asks, bids, pair, handleFeedToggle } = useOrderBookWebSocket();

  const throttledOrderBookRows = useMemo(
    () => {
      let hasData = false;
      if (!asks.length && !bids.length)
        return [hasData, <Row>
          <Col className={styles.noConnection}>No websocket connection</Col>
        </Row>];

      hasData = true;

      const composeOrderRows = () => {
        //order and take depth
        const asksToShow = orderByPropertyNameDesc(asks, 'price').slice(Math.max(asks.length - depth, 0));
        const bidsToShow = orderByPropertyNameDesc(bids, 'price').slice(0, depth);

        //calculate spread
        const spread = calculateSpreadInfo(asksToShow, bidsToShow);

        //add cumulative volumes
        const asksWithVolumes = addCumulativeVolumes(asksToShow, false, depth);
        const bidsWithVolumes = addCumulativeVolumes(bidsToShow, true, depth);

        //get the biggest cumulative volume == 100%
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
            price={o.price}
            quantity={o.quantity}
            cumulativeVolume={o.cumulativeVolume}
            volumePercentage={o.volumePercentage}
            type={o.type} />;

        const askComponents = asksWithVolumePercentage.map((o: Order) => mapToOrderRow(o));
        const bidComponents = bidsWithVolumePercantage.map((o: Order) => mapToOrderRow(o));

        return { askComponents, bidComponents, spread };
      }

      const { askComponents, bidComponents, spread } = composeOrderRows();

      return [hasData, <>
        {askComponents}
        <Row>
          <Col className={styles.spread}>Spread: {spread.amount} ({spread.percent}%)</Col>
        </Row>
        {bidComponents}
      </>];
    },
    [throttleTick]
  );

  return (
    <Container className={styles.orderBookContainer}>
      <Row>
        <Col style={{}}>
          <h2>{pair.substring(3)}</h2>
        </Col>
      </Row>
      <Row>
        <Col />
        <Col>
          <OrderBookSettings
            depth={depth}
            setDepth={setDepth}
            renderThrottleInterval={renderThrottleInterval}
            setRenderThrottleInterval={setRenderThrottleInterval}
          />
        </Col>
        <Col />
      </Row>
      <Row>
        <Col>
          <br />
        </Col>
      </Row>
      <Row>
        <Col />
        <Col >
          {throttledOrderBookRows[0] ? <OrderBookHeader /> : ''}
          {throttledOrderBookRows[1]}
        </Col>
        <Col />
      </Row>
      <Row>
        <Col>
          <br />
          <Button
            className={styles.toggleButton}
            onClick={handleFeedToggle}
          >
            Toggle Feed
          </Button>
        </Col>
      </Row>
    </Container >
  );
}