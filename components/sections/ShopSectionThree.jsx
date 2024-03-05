import { Buttons } from "../buttons/Buttons";
import { PaymentButtons } from "../buttons/PaymentButtons";
import axios from "axios";

const ShopSectionThree = ({ productsData, userData }) => {
  //console.log(userData)
  //const produtos = productsData[0];
  //console.log(produtos)

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
      console.log(purchaseData);
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
    <div className="mx-4">
      <p className="font-semibold px-4 my-4">Escolhe um método de pagamento</p>

      {/* Wrap the relevant part of your app with Elements provider */}
      <div className="px-4">
        <Buttons
          btnState={"whiteMain2"}
          text={"Cartão De Crédito"}
          btnSize={"menuSize5"}
          icon={"creditCard"}
          onClick={() => handlePurchase(productsData)}
          ariaLabel={"Pagar por Cartão de crédito"}
        ></Buttons>
        <Buttons
          btnState={"whiteMain2"}
          text={"MBWay"}
          btnSize={"menuSize5"}
          icon={"mbWay"}
          onClick={() => handlePurchase(productsData)}
          ariaLabel={"Pagar por mbway"}
        ></Buttons>

        <Buttons
          btnState={"whiteMain2"}
          text={" GPay"}
          btnSize={"menuSize5"}
          icon={"gpay"}
          onClick={() => handlePurchase(productsData)}
          ariaLabel={"Pagar com Google Pay"}
        ></Buttons>

        <Buttons
          btnState={"whiteMain2"}
          text={"Paypal"}
          btnSize={"menuSize5"}
          icon={"Paypal"}
          onClick={() => handlePurchase(productsData)}
          ariaLabel={"Pagar Com Paypal"}
        ></Buttons>
      </div>
    </div>
  );
};

export default ShopSectionThree;
