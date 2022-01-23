// import axios from 'axios';
import * as constants from '../constants';
import { Product } from '../models/product';
import { ProductStatistic } from '../models/productStatistic';

let url = 'http://localhost:3001';

url = `${url}/${constants.TEST_API_KEY}`;


// ?!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// import useSWR from "swr"

// const fetcher = url => fetch(url).then(res => res.json())

// export function useSwapi() {
//     const { data, error } = useSWR(`/api/swapi`, fetcher)

//     return {
//         data: data,
//         isLoading: !error && !data,
//         isError: error,
//     }
// }

const listProducts = async (filter: any): Promise<Product[]> => {
    try {
        const response = await fetch(`api/products/byFilter`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filter)
        });
        if (response.ok) {
            return (await response.json()).products;
        } else {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        console.log(error);
    }
}

const listProductStatistics = async (productIds: number[]): Promise<ProductStatistic[]> => {
    try {
        const response = await fetch(`api/productStatistics/byProductIds`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productIds: productIds,
                onlyAllSellers: false
            })
        });
        if (response.ok) {
            return (await response.json()).productStatistics;
        } else {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        console.log(error);
    }
}

export { listProducts, listProductStatistics };