import applyPriceDiscount from "./applyPriceDiscount";

export default function getCartTotalPrice(productsArray) {
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
}