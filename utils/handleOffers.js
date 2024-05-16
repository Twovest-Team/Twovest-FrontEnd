const sortOffers = (offers) => {
    return offers.sort((a, b) => {
        // First, sort by condition
        if (a.conditions.id !== b.conditions.id) {
            return a.conditions.id - b.conditions.id;
        }

        // If conditions are the same, then sort by price
        return a.price - b.price;
    });
};

const getBestOffers = (offers) => {
    const bestOffers = [];
    let limit;

    if (offers.length >= 2) {
        limit = 2;
    } else {
        limit = offers.length;
    }

    for (let i = 0; i < limit; i++) {
        bestOffers.push(offers[i]);
    }

    return bestOffers;
};

export {
    sortOffers,
    getBestOffers
}