// import axios from 'axios';
import * as constants from '../../../constants';
import { NextApiRequest, NextApiResponse } from "next";

let url = 'http://localhost:3001';

url = `${url}/${constants.TEST_API_KEY}`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await fetch(`${url}/productstatistics/byproductids`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });
        if (response.ok) {
            res.status(200).json(await response.json())
        } else {
            res.status(500).json("Something went wrong!");
        }
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
}