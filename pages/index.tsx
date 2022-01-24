import { ErrorBoundary } from 'react-error-boundary';
import OrderBook from '../components/orderBook/OrderBook';
import { Container, Row, Col } from 'react-bootstrap';

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
  console.log(error.message);
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Container className="errorContainer align-middle my-auto">
      <br />
      <Row><Col>Something went wrong:</Col></Row>
      <Row><Col>{error.message}</Col></Row>
      <br />
      <Row><Col><button onClick={resetErrorBoundary}>Try again</button></Col></Row>
    </Container>
  )
}

const OrderBookPage = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      <OrderBook
        defaultDepth={15}
        throttle={350}
      />
    </ErrorBoundary>
  )
}

export default OrderBookPage;