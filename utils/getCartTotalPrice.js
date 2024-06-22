import applyPriceDiscount from "./applyPriceDiscount";

export default function getCartTotalPrice(productsArray, cardCartData) {
  let totalPriceValue = 0;

  productsArray.map((product) => {
    let chosenQty = product.qty;
    let discount = product.offers.products.discount;
    let offerPrice = product.offers.price;
    let offerFinalPrice;
    let offerCouponPrice;

    if (cardCartData) {
      if (
        product.offers.products.brands.id ==
        cardCartData.coupons.coupons_has_brands[0].brands.id
      ) {
        offerCouponPrice = applyPriceDiscount(
          offerPrice,
          cardCartData.coupons.discount
        );
        if (discount > 0) {
          if (chosenQty == 1) {
            offerFinalPrice = applyPriceDiscount(offerCouponPrice, discount);
          }

          if (chosenQty > 1) {
            let discPrice = applyPriceDiscount(offerCouponPrice, discount);
            let normalPrice =
              applyPriceDiscount(offerPrice, discount) * (chosenQty - 1);

            offerFinalPrice = parseFloat(discPrice) + parseFloat(normalPrice);
          }
        } else {
          if (chosenQty == 1) {
            offerFinalPrice = offerCouponPrice;
          }

          if (chosenQty > 1) {
            offerFinalPrice =
              parseFloat(offerCouponPrice) +
              parseFloat(offerPrice * (chosenQty - 1));
          }
        }
        totalPriceValue =
          parseFloat(totalPriceValue) + parseFloat(offerFinalPrice);
      } else {
        if (discount > 0) {
          offerFinalPrice =
            applyPriceDiscount(offerPrice, discount) * chosenQty;
        } else {
          offerFinalPrice = offerPrice * chosenQty;
        }

        totalPriceValue =
          parseFloat(totalPriceValue) + parseFloat(offerFinalPrice);
      }
    } else {
      if (discount > 0) {
        offerFinalPrice = applyPriceDiscount(offerPrice, discount) * chosenQty;
      } else {
        offerFinalPrice = offerPrice * chosenQty;
      }

      totalPriceValue =
        parseFloat(totalPriceValue) + parseFloat(offerFinalPrice);
    }
  });

  return totalPriceValue.toFixed(2);
}
