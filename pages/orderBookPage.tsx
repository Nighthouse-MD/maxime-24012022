import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { useState, useEffect } from 'react';
export const isBrowser = typeof window !== "undefined";
import OrderBook from '../components/orderBook/orderBook';

export default function OrderBookPage() {
  return (
    <OrderBook />
  )
}
