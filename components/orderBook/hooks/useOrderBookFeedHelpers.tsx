import Order from "../models/Order";

const addOrdersToList = (existingOrders: Order[], newOrders: Order[], resetList: boolean) => {
    let updatedOrders = resetList ? [] : [...existingOrders];
    newOrders.forEach(order => {
        updatedOrders = [...updatedOrders.filter(x => x.price !== order.price)];
        if (order.quantity > 0) {
            updatedOrders.push(order);
        }
    });
    return updatedOrders;
}

export { addOrdersToList };