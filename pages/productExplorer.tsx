import React, { useState } from 'react';
import { Spinner, Form, FormControl, Row, Col, Container, ToggleButton, Button } from 'react-bootstrap';
import mergeDeep from '../tools/mergeDeep';
import useProducts from '../hooks/productHook';
import { getInitialFilter } from '../models/productFilter';

const ProductExplorer = () => {
    const [filter, setFilter] = useState(getInitialFilter());

    const { products, loadingCounter } = useProducts(filter)

    const onChangeSearch = (e) => {
        e.preventDefault();
        const filterToUpdate = mergeDeep({}, filter);
        filterToUpdate.searchWord = e.target.value;
        filterToUpdate.page = 1;
        setFilter(filterToUpdate);
    }

    const onChangeActiveSwitch = (e) => {
        e.preventDefault();
        const filterToUpdate = mergeDeep({}, filter);
        filterToUpdate.showActiveOnly = !filter.showActiveOnly;
        filterToUpdate.page = 1;
        setFilter(filterToUpdate);
    }

    const onClickLoadMore = (e) => {
        e.preventDefault();
        const filterToUpdate = mergeDeep({}, filter);
        filterToUpdate.page = filter.page + 1;
        setFilter(filterToUpdate);
    }

    const search = <Form className="d-flex">
        <FormControl
            id='search'
            key='search'
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={onChangeSearch}
            value={filter.searchWord}
        />
        {/* <Button variant="outline-success">Search</Button> */}
    </Form>;

    return (
        <Container>
            <div className="sticky">
                <Row>
                    <h1>Product Explorer</h1>
                </Row>
                <Row>
                    <Col md={3}>loading counter: {loadingCounter} </Col>
                    <Col md={3}>{search}</Col>
                    <Col md={1}>{loadingCounter <= 0 || <Spinner animation="grow" />}</Col>
                    <Col md={3}>
                        <ToggleButton
                            className="mb-2"
                            id="toggle-check"
                            type="checkbox"
                            variant="outline-primary"
                            checked={filter.showActiveOnly}
                            value="1"
                            onChange={onChangeActiveSwitch}
                        >
                            Show Active Only
                        </ToggleButton>
                    </Col>
                </Row>
            </div>
            <Row>
                {products}
            </Row>
            {
                loadingCounter > 0 ||
                <Row>
                    <Button className="buttonOverride" variant="contained" color="secondary" onClick={onClickLoadMore} >
                        Load More
                    </Button>
                </Row>
            }
        </Container >
    );
};

export default ProductExplorer;