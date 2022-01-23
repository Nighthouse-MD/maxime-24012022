import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { useState, useEffect } from 'react';
export const isBrowser = typeof window !== "undefined";

export default function Home() {
  // if (isBrowser) {
  //   const [client] = useState(() => new WebSocket("ws://localhost:3005"));

  //   useEffect(() => {
  //     client.onopen = () => {
  //       console.log('WebSocket Client Connected');
  //     };
  //     client.onmessage = (message) => {
  //       console.log(message);
  //     };
  //   }, []);

  // const apiCall = {
  //   event: "bts:subscribe",
  //   data: { channel: "order_book_btcusd" },
  // };

  // ws.onopen = (event) => {
  //   ws.send(JSON.stringify(apiCall));
  // };

  // ws.onmessage = function (event) {
  //   const json = JSON.parse(event.data);
  //   try {
  //     if ((json.event = "data")) {
  //       setBids(json.data.bids.slice(0, 5));
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // }

  return (
    <>Home</>
  )
}
