const sortOffers = (offers) => {
    const offersCopy = [...offers];
    return offersCopy.sort((a, b) => {
        // First, sort by condition
        if (a.conditions.id !== b.conditions.id) {
            return a.conditions.id - b.conditions.id;
        }
        // If conditions are the same, sort by price
        return a.price - b.price;
    });
};


const getBestOffers = (offers, limit) => {
    const bestOffers = [];

    for (let i = 0; i < limit; i++) {
        if (offers[i]) bestOffers.push(offers[i]);
    }

    return bestOffers;
};

const filterOffers = (offers, color, size) => {
    return offers.filter((offer) => {
        if (color && size) {
            return (
                offer.colors.name === color &&
                offer.sizes.size === size
            );
        } else if (color) {
            return offer.colors.name === color;
        } else if (size) {
            return offer.sizes.size === size;
        }
        return true;
    });
}

const getBestOffer = (offers) => {
    const sortedOffers = sortOffers(offers)
    return sortedOffers[0]
}

export {
    sortOffers,
    getBestOffers,
    filterOffers,
    getBestOffer
}