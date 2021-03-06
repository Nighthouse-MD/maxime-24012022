function orderByPropertyName(collection, propertyName) {
    collection.sort(function (a, b) { return comparePropertyName(a, b, propertyName); });
    return collection;
}

function orderBy(collection) {
    collection.sort(function (a, b) { return compare(a, b); });
    return collection;
}

function orderByPropertyNameDesc(collection, propertyName) {
    collection.sort(function (a, b) { return -comparePropertyName(a, b, propertyName); });
    return collection;
}

function orderByDesc(collection) {
    collection.sort(function (a, b) { return -compare(a, b); });
    return collection;
}

function comparePropertyName(a, b, propertyName) {
    let aProperty = a[propertyName] ? a[propertyName] : 0;
    let bProperty = b[propertyName] ? b[propertyName] : 0;
    return compare(aProperty, bProperty);
}

function compare(a, b) {
    a = typeof (a) === "string" ? a.toUpperCase() : a;
    b = typeof (b) === "string" ? b.toUpperCase() : b;

    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }

    return 0;
}

export { orderByPropertyName, orderByPropertyNameDesc, orderBy, orderByDesc };