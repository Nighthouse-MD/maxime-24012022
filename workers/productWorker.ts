import { Product } from "../models/product";
import { ProductFilter } from "../models/productFilter";

export default () => {
    self.onmessage = (message: ProductWorkerMessage) => { /* eslint-disable-line no-restricted-globals */
        let productsWithAmountOfStats = [];
        const products = message.data.products;
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            // setTimeout(() => {
            const amountOfStatRows = message.data.updatedStats.filter(ps => ps.productToTrackId === product.id.toString()).length;
            // postMessage({ amountOfStatRows, product: product });
            productsWithAmountOfStats.push({ product, amountOfStatRows })
            // }, i * 300);
        }

        postMessage({ productsWithAmountOfStats });
    };
}

interface ProductWorkerMessage {
    data: {
        updatedStats: ({
            productToTrackId: string
        })[],
        products: Product[]
    }
}