import { Row, Col } from 'react-bootstrap';
import Head from 'next/head'
import { Container } from 'react-bootstrap';

const Layout = ({ children }) => (
    <>
        <Head>
            <title>Order Book</title>
            <meta name="description" content="Order Book by Maxime Deschamps" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
            {children}
        </Container>
    </>
);

export default Layout;