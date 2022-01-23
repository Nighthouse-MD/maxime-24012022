import OrderBook from '../components/orderBook/OrderBook';

const OrderBookPage = () => {
  return (
    <OrderBook
      defaultDepth={15}
      throttle={350}
    />
  )
}

export default OrderBookPage;