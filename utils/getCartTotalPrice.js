import applyPriceDiscount from "./applyPriceDiscount";
import checkIfCouponApplies from "./checkIfCouponApplies";

export default function getCartTotalPrice(productsArray, cardCartData) {
    let totalPriceValue = 0

    productsArray.map(product => {
        let chosenQty = product.qty
        let discount = product.offers.products.discount
        let offerPrice = product.offers.price
        let offerFinalPrice;


        if(cardCartData) {
            if(product.offers.products.brands.id == cardCartData.id_brand)
                {
                    offerPrice = applyPriceDiscount(offerPrice, cardCartData.coupons.discount);
                    if (discount > 0) {
                        offerFinalPrice = applyPriceDiscount(offerPrice, discount) * chosenQty
                    } else {
                        offerFinalPrice = offerPrice * chosenQty
                    }
                    totalPriceValue = parseFloat(totalPriceValue) + parseFloat(offerFinalPrice)
                }

                else {
                    if (discount > 0) {
                        offerFinalPrice = applyPriceDiscount(offerPrice, discount) * chosenQty

                    } else {
                        offerFinalPrice = offerPrice * chosenQty
                    }
            
                    totalPriceValue = parseFloat(totalPriceValue) + parseFloat(offerFinalPrice)
                }
            }

        else {
        if (discount > 0) {
            offerFinalPrice = applyPriceDiscount(offerPrice, discount) * chosenQty

            
        } else {
            offerFinalPrice = offerPrice * chosenQty
        }

        totalPriceValue = parseFloat(totalPriceValue) + parseFloat(offerFinalPrice)

    }})

    return totalPriceValue.toFixed(2)
}