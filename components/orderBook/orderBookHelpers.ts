import Order from "./models/Order";

const addCumulativeVolumes = (orderList: Order[], ascendingOrder: boolean, listDepth: number) => {
    if (!orderList.length)
        return [];

    let cumulativeVolume: number = 0;
    const maxIndex = orderList.length >= listDepth ? listDepth - 1 : orderList.length - 1;
    for (let i = 0; i <= maxIndex; i++) {
        const index = ascendingOrder ? i : maxIndex - i;
        cumulativeVolume += orderList[index].quantity;
        orderList[index].cumulativeVolume = cumulativeVolume;
    }

    return orderList;
}

const addVolumePercentage = (orderList: Order[], biggestCumulativeVolume: number) => {
    if (!orderList.length)
        return [];

    orderList.forEach(order => {
        order.volumePercentage = order.cumulativeVolume / biggestCumulativeVolume * 100;
        order.volumePercentage = Math.round(order.volumePercentage * 100) / 100;
    })

    return orderList;
}

const calculateSpreadInfo = (asks: Order[], bids: Order[]) => {
    if (!asks.length || !bids.length)
        return { amount: 0, percent: 0 };

    const lowestAsk = asks[asks.length - 1].price;
    const highestBid = bids[0].price;
    let amount = Math.round((lowestAsk - highestBid) * 10000) / 10000;
    let percent = Math.round((amount / highestBid * 100) * 100) / 100;
    return { amount, percent };
}

export { addCumulativeVolumes, addVolumePercentage, calculateSpreadInfo };