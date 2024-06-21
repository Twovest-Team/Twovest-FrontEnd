

const applyPriceDiscount = (price, discount) => (
    (price - (price * (discount * 0.01))).toFixed(2)
);

const minMaxPrices = (offers) => {
    if (!offers || !Array.isArray(offers) || offers.length === 0) {
        return null;
    }

    let minPrice = Number.POSITIVE_INFINITY;
    let maxPrice = Number.NEGATIVE_INFINITY;

    for (const offer of offers) {
        if (offer.price < minPrice) {
            minPrice = offer.price;
        }

        if (offer.price > maxPrice) {
            maxPrice = offer.price;
        }
    }

    return { minPrice, maxPrice };
};

const formatPrice = (price) => (
    price.toFixed(2) + '€'
);

const getCartTotalPrice = (productsArray) => {
    let totalPriceValue = 0

    productsArray.map(product => {
        let chosenQty = product.qty
        let discount = product.offers.products.discount
        let offerPrice = product.offers.price
        let offerFinalPrice;

        if (discount > 0) {
            offerFinalPrice = applyPriceDiscount(offerPrice, discount) * chosenQty
        } else {
            offerFinalPrice = offerPrice * chosenQty
        }

        totalPriceValue = parseFloat(totalPriceValue) + parseFloat(offerFinalPrice)
    })

    return totalPriceValue.toFixed(2)
};

export {
    applyPriceDiscount,
    minMaxPrices,
    formatPrice,
    getCartTotalPrice
}

