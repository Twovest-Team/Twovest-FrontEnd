"use client";

import Button from "../buttons/Button";
import GooglePayLogo from "@/public/static/images/payments/google-pay.svg";
import PaypalLogo from "@/public/static/images/payments/paypal.svg";
import MastercardLogo from "@/public/static/images/payments/master-card.svg";
import MBWayLogo from "@/public/static/images/payments/mb-way.svg";
import Image from "next/image";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateCart } from "@/redux/slices/cartProducts";
import useAuth from "@/hooks/client-hooks/useAuth";
import { useEffect, useState } from "react";
import setLocalStorage from "@/utils/localStorage/setLocalStorage";
import getStorageImage from "@/utils/getStorageImage";
import checkIfUserHasCoupon from "@/utils/db/checkIfUserHasCoupon";
import applyPriceDiscount from "@/utils/applyPriceDiscount";

const ShopSectionThree = ({ productsData, userData, couponData }) => {
  const { currentUser } = useAuth();
  const [cupaoVerificado, setCupaoVerificado] = useState("");

  const products = useAppSelector((state) => state.cartProducts.products);
  useEffect(() => {
    if (couponData) {
      const checkIfCouponIsValid = async () => {
        try {
          const coupons = await checkIfUserHasCoupon(
            currentUser.id,
            couponData.id_coupon
          );
          setCupaoVerificado(coupons[0]);
        } catch (error) {
          console.error("Failed to fetch user coupon:", error);
        }
      };

      checkIfCouponIsValid();
    }
  }, [couponData]);

  const handlePurchase = async (produtos) => {
    let novosProdutos = [];

    if (cupaoVerificado) {
      let couponBrandId =
        cupaoVerificado.coupons.coupons_has_brands[0].id_brand;
      let couponDiscount = cupaoVerificado.coupons.discount;

      produtos.forEach((produto) => {
        let copiaProduto = JSON.parse(JSON.stringify(produto));

        if (copiaProduto.offers.products.discount > 0) {
          if (copiaProduto.offers.products.brands.id == couponBrandId) {
            if (copiaProduto.qty == 1) {
              // O produto tem desconto e cupão mas é apenas 1
              let discPrice = applyPriceDiscount(
                copiaProduto.offers.price,
                copiaProduto.offers.products.discount
              );
              copiaProduto.offers.price = applyPriceDiscount(
                discPrice,
                couponDiscount
              );
            }
            if (copiaProduto.qty > 1) {
              // O produto tem desconto e cupão mas é mais que 1. O cupão só se aplica a 1 quantidade
              let discPrice = applyPriceDiscount(
                copiaProduto.offers.price,
                copiaProduto.offers.products.discount
              );

              let novoProduto = JSON.parse(JSON.stringify(copiaProduto));
              // Define o novo preço no objeto clonado
              novoProduto.offers.price = discPrice;
              novoProduto.qty = copiaProduto.qty - 1;
              // Adiciona o objeto clonado ao array auxiliar
              novosProdutos.push(novoProduto);

              //Aplica o desconto do cupão ao item e define a quantity para 1
              copiaProduto.offers.price = applyPriceDiscount(
                discPrice,
                couponDiscount
              );
              copiaProduto.qty = 1;
            }
          } else {
            //Tem desconto mas não tem cupão
            let discPrice = applyPriceDiscount(
              copiaProduto.offers.price,
              copiaProduto.offers.products.discount
            );
            copiaProduto.offers.price = discPrice;
          }
        }
        if (copiaProduto.offers.products.discount == 0) {
          if (copiaProduto.offers.products.brands.id == couponBrandId) {
            if (copiaProduto.qty == 1) {
              // O produto tem cupão mas é apenas 1
              copiaProduto.offers.price = applyPriceDiscount(
                copiaProduto.offers.price,
                couponDiscount
              );
            }
            if (copiaProduto.qty > 1) {
              // O produto tem cupão mas é mais que 1. O cupão só se aplica a 1 quantidade

              let novoProduto = JSON.parse(JSON.stringify(copiaProduto));
              // Define o novo preço no objeto clonado
              novoProduto.offers.price = copiaProduto.offers.price;
              novoProduto.qty = copiaProduto.qty - 1;
              // Adiciona o objeto clonado ao array auxiliar
              novosProdutos.push(novoProduto);

              //Aplica o desconto do cupão ao item e define a quantity para 1
              copiaProduto.offers.price = applyPriceDiscount(
                copiaProduto.offers.price,
                couponDiscount
              );
              copiaProduto.qty = 1;
            }
          }
        }

        novosProdutos.push(copiaProduto);
      });
    } else {
      produtos.forEach((produto) => {
        let copiaProduto = JSON.parse(JSON.stringify(produto));

        if (copiaProduto.offers.products.discount > 0) {
          copiaProduto.offers.price = applyPriceDiscount(
            copiaProduto.offers.price,
            copiaProduto.offers.products.discount
          );
        }

        novosProdutos.push(copiaProduto);
      });
    }

    const purchaseData = novosProdutos.map((produto) => ({
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
      <h1 className="flex gap-2 items-center font-semibold text_h6">
        Escolhe um método de pagamento
      </h1>

      <div className="flex flex-col gap-4 mt-4">
        <Button
          justify="start"
          onClick={() => handlePurchase(productsData)}
          type={"grey"}
          ariaLabel="Pagar com Cartão De Crédito"
          width="100%"
        >
          <Image
            className="mr-2"
            src={MastercardLogo}
            alt="Logótipo da Mastercard"
            width={30}
            height={18}
            styles={{ width: "auto", height: "auto" }}
          />
          Cartão De Crédito
        </Button>

        <Button
          justify="start"
          onClick={() => handlePurchase(productsData)}
          type={"grey"}
          ariaLabel="Pagar com MBWay"
          width="100%"
        >
          <Image
            className="mr-2"
            src={MBWayLogo}
            alt="Logótipo do MBWay"
            width={30}
            height={19}
          />
          MBWay
        </Button>

        <Button
          justify="start"
          onClick={() => handlePurchase(productsData)}
          type={"grey"}
          ariaLabel="Pagar com GPay"
          width="full"
        >
          <Image
            className="mr-2"
            src={GooglePayLogo}
            alt="Logótipo do GooglePay"
            width={30}
            height={17}
          />
          GPay
        </Button>

        <Button
          justify="start"
          onClick={() => handlePurchase(productsData)}
          type={"grey"}
          ariaLabel="Pagar com Paypal"
          width="full"
        >
          <Image
            className="mr-2"
            src={PaypalLogo}
            alt="Logótipo do GooglePay"
            width={30}
            height={17}
          />
          Paypal
        </Button>
      </div>
    </div>
  );
};

export default ShopSectionThree;
