import Button from "../buttons/Button";
import GooglePayLogo from "@/public/static/images/payments/google_pay_logo.svg";
import PaypalLogo from "@/public/static/images/payments/paypal_logo.svg";
import MastercardLogo from "@/public/static/images/payments/mastercard_logo.svg";
import MBWayLogo from "@/public/static/images/payments/mbway_logo.svg";
import Image from "next/image";
import axios from "axios";

const ShopSectionThree = ({ productsData, userData }) => {
  
  const handlePurchase = async (produtos) => {
    const purchaseData = produtos.map((produto) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name:
            produto.offers.products.brands.name +
            " " +
            produto.offers.colors.name,
          images: [produto.offers.images[0].url],
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

      // Redirect to the payment URL (assuming the API response contains the URL)
      window.location.assign(data);
    } catch (error) {
      // Handle errors
      console.error("Error during purchase:", error);
    }
  };

  return (
    <div className="container">
      <h6
        className="flex gap-2 items-center font-semibold"
      >
        Escolhe um método de pagamento
      </h6>

      <div className="flex flex-col gap-4 mt-4">


        <Button justify="start" onClick={() => handlePurchase(productsData)} type={'grey'} ariaLabel='Pagar com Cartão De Crédito' width='full'>
          <Image className="mr-2" src={MastercardLogo} alt="Logótipo da Mastercard" width={30} height={18} styles={{ width: 'auto', height: 'auto' }} />
          Cartão De Crédito
        </Button>



        <Button justify="start" onClick={() => handlePurchase(productsData)} type={'grey'} ariaLabel='Pagar com MBWay' width='full'>
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
