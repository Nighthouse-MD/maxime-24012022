import { Container, Navbar, NavDropdown, Nav, Offcanvas } from 'react-bootstrap';
// import { Link } from 'react-router-dom'; Use this to use SPA routes instead of SSR routes that refresh the page

const TopNavBar = () =>
    <Navbar className='' bg="dark" variant="dark" sticky="top">
        <Container fluid>
            <Navbar.Brand href="/">Navbar Offcanvas</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="">Home</Nav.Link>
                <Nav.Link href="productExplorer">Product Explorer</Nav.Link>
                <Nav.Link href="orderBookPage">Orderbook</Nav.Link>
            </Nav>
        </Container>
    </Navbar >;

{/* <Navbar bg="dark" variant="dark" sticky="top" expand={false}>
    <Container fluid>
        <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/test">Test</Nav.Link>
        </Nav>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
    </Container>
</Navbar>; */}
export default TopNavBar;