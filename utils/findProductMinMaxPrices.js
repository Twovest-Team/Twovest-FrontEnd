export default function findProductMinMaxPrices(offers) {
    if (!offers || !Array.isArray(offers) || offers.length === 0) {
        return null; // Return null for invalid input
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
}
