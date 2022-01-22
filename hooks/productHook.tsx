import { useState, useEffect } from 'react';
import * as ProductService from '../services/ProductService';

import WorkerBuilder from '../workers/workerBuilder';
import ProductWorker from '../workers/productWorker';

import { ProductFilter } from '../models/productFilter';
import { Product } from '../models/product';
import { ProductStatistic } from '../models/productStatistic';
import { getInitialFilter } from '../models/productFilter';

import { Card, Button, Col } from 'react-bootstrap';

const productGridElement = (product: Product, amountOfStats: number) => {
    return <Col md={4}>
        <Card style={{
            // width: '25rem',
            marginBottom: '4px',
            height: '12rem'
        }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            < Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    {`Added on ${new Date(Date.parse(product.fetchedOn)).toDateString()}  ${product.inactivatedOn ? ' Inactive' : ''}`}
                    <br />
                    {`#Stats: ${amountOfStats}`}
                </Card.Text>
                <Button className="mt-auto" variant="primary">Stats</Button>
            </Card.Body>
        </Card>
    </Col >;
}

export default function useProducts(filter: ProductFilter) {
    const [products, setProducts] = useState([]);
    const [productStatistics, setProductStatistics] = useState([]);
    const [loadingCounter, setLoadingCounter] = useState(0);

    // if (filter.page === 1)
    //     setProducts([]);

    useEffect(() => {
        const loadProducts = () => {
            setLoadingCounter(prevValue => prevValue + 1);
            ProductService.listProducts(filter)
                .then((loadedProducts: Product[]) => {
                    if (filter.page === 1)
                        setProducts([]);

                    setLoadingCounter(prevValue => prevValue - 1);
                    if (loadedProducts.length > 0 || filter.page !== 1) {

                        setLoadingCounter(prevValue => prevValue + 1);
                        ProductService.listProductStatistics(loadedProducts.map(p => p.id))
                            .then((productStatistics: ProductStatistic[]) => {

                                if (!productStatistics || !productStatistics.length)
                                    return;

                                const updatedStats = (filter.page === 1 ? [] : productStatistics).concat(productStatistics);
                                setProductStatistics(updatedStats);

                                setLoadingCounter(prevValue => prevValue - 1);

                                // if (filter.page === 1) setProducts([]);

                                const productWorker = new WorkerBuilder(ProductWorker);

                                productWorker.onmessage = (e: MessageEvent<{ productsWithAmountOfStats: { product: Product, amountOfStats: number }[] }>) => {
                                    const productElements = e.data.productsWithAmountOfStats.map(x => productGridElement(x.product, x.amountOfStats));
                                    setProducts(existingProducts => (filter.page !== 1 ? existingProducts.concat(productElements) : productElements));
                                };

                                // for (let i = 0; i < loadedProducts.length; i++) {
                                //     const product = loadedProducts[i];
                                //     setLoadingCounter(prevValue => prevValue + 1);
                                // setTimeout(() => {
                                productWorker.postMessage({ updatedStats, products: loadedProducts });
                                // setLoadingCounter(prevValue => prevValue - 1);
                                // }, i * 300);
                                // }
                            });
                    } else {
                        setProductStatistics([]);
                        setProducts([]);
                    }
                });
        }
        loadProducts();
    }, [filter, filter.page, filter.searchWord, filter.showActiveOnly]);

    return { products, loadingCounter };
}