"use client";

import Button from "../buttons/Button";
import GooglePayLogo from "@/public/static/images/payments/google-pay.svg";
import PaypalLogo from "@/public/static/images/payments/paypal.svg";
import MastercardLogo from "@/public/static/images/payments/master-card.svg";
import MBWayLogo from "@/public/static/images/payments/mb-way.svg";
import Image from "next/image";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import getStorageImage from "@/utils/getStorageImage";

const ShopSectionThree = ({ productsData, userData, coupon }) => {

  
  const products = useAppSelector((state) => state.cartProducts.products);

  console.log(productsData)
  
  const handlePurchase = async (produtos) => {

    
    const purchaseData = produtos.map((produto) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name:
            produto.offers.products.brands.name +
            " " +
            produto.offers.colors.name,
          images: [getStorageImage(produto.offers.products.images[0].url)],
        },
        unit_amount: Math.round(produto.offers.price * 100),
      },
      quantity: produto.qty,
    }));

    try {
      const { data } = await axios.post("/api/payment", purchaseData, {
        headers: {
          "Content-Type": "application/json",
        },
      });


      window.location.assign(data);
    } catch (error) {
 
      console.error("Error during purchase:", error);
    } 
  };

  return (
    <div className="container">
      <h1
        className="flex gap-2 items-center font-semibold text_h6"
      >
        Escolhe um método de pagamento
      </h1>

      <div className="flex flex-col gap-4 mt-4">


        <Button justify="start" onClick={() => handlePurchase(productsData)} type={'grey'} ariaLabel='Pagar com Cartão De Crédito' width='100%'>
          <Image className="mr-2" src={MastercardLogo} alt="Logótipo da Mastercard" width={30} height={18} styles={{ width: 'auto', height: 'auto' }} />
          Cartão De Crédito
        </Button>



        <Button justify="start" onClick={() => handlePurchase(productsData)} type={'grey'} ariaLabel='Pagar com MBWay' width='100%'>
          <Image className="mr-2" src={MBWayLogo} alt="Logótipo do MBWay" width={30} height={19}/>
          MBWay
        </Button>



        <Button justify="start" onClick={() => handlePurchase(productsData)} type={'grey'} ariaLabel='Pagar com GPay' width='full'>
          <Image className="mr-2" src={GooglePayLogo} alt="Logótipo do GooglePay" width={30} height={17}/>
          GPay
        </Button>



        <Button justify="start" onClick={() => handlePurchase(productsData)} type={'grey'} ariaLabel='Pagar com Paypal' width='full'>
          <Image className="mr-2" src={PaypalLogo} alt="Logótipo do GooglePay" width={30} height={17}/>
          Paypal
        </Button>

      </div>
    </div>
  );
};

export default ShopSectionThree;
