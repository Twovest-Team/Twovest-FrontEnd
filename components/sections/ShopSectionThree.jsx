import { PaymentButtons } from '../buttons/PaymentButtons';
import axios from 'axios';


const ShopSectionThree = ({ productsData, userData }) => {


console.log(userData)
const produtos = productsData[0];
//console.log(produtos.offers.images[0].url)

 const handlePurchase = async(e) =>{
  e.preventDefault();
  

  const {data} = await axios.post("/api/payment", {

    price_data: {
    currency: "eur",
    product_data: {
        name: produtos.offers.colors.name,
        images: [produtos.offers.images[0].url]
    },
    unit_amount: Math.round(produtos.offers.price * 100)
},
quantity: produtos.qty
},
{
  headers:{
      "Content-Type" : "application/json"
  }
}

);
window.location.assign(data);
 
 }

  return (
    <div className='mx-4'>
      <p className="font-semibold my-4">Escolhe um método de pagamento</p>

      {/* Wrap the relevant part of your app with Elements provider */}
      <div>
        <div onClick={handlePurchase} className='cursor-pointer'>
          <PaymentButtons method={"Cartão de crédito"} />
        </div>

        <div onClick={handlePurchase} className='cursor-pointer'>
          <PaymentButtons method={"MBWay"} />
        </div>

        <div onClick={handlePurchase} className='cursor-pointer'>
          <PaymentButtons method={"Google Pay"} />
        </div>

        <div onClick={handlePurchase} className='cursor-pointer'>
          <PaymentButtons method={"Paypal"} />
        </div>

      </div>
    </div>
  );
};

export default ShopSectionThree;