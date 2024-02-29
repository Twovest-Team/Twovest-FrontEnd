export default function applyPriceDiscount(price, discount){
    return (price - (price * (discount * 0.01))).toFixed(2)
}