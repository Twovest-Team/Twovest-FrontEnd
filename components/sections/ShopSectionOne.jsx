import { CardCart } from "../cards/CardCart";
import getCartTotalPrice from "@/utils/getCartTotalPrice";
import Button from "../buttons/Button";
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";
import ApplyCouponModal from "../modals/ApplyCouponModal";
import { Fragment } from "react";
import { useState } from "react";
import Notification from "@/components/modals/Notification";
import { showNotification } from "@/redux/slices/notificationSlice";

const ShopSectionOne = ({
  handleLoading,
  handleShowDeleteNotification,
  productsData,
  userEmail,
  updateStage,
  sendDataToShop,
}) => {
  const dispatch = useAppDispatch();

  const [cardCartData, setCardCartData] = useState("");

  const [dataFromModal, setDataFromModal] = useState("");

  function handleDataFromCardCart(data) {
    setCardCartData(data);
  }

  function handleDataFromModal(data) {
    let sucesso = false;
    let couponBrand = data.coupons.coupons_has_brands[0].brands.id;

    productsData.map((product) => {
      if (product.offers.products.brands.id == couponBrand) sucesso = true;
    });

    if (sucesso == true) {
      dispatch(showNotification("couponSuccess"));
      setDataFromModal(data);
      sendDataToShop(data);
    } else {
      dispatch(showNotification("couponError"));
    }
  }

  function NormalPrice() {
    return <p>{getCartTotalPrice(productsData)}€</p>;
  }

  function DiscountedPrice() {
    return (
      <p className="text-primary_main">
        {getCartTotalPrice(productsData, cardCartData)}€
      </p>
    );
  }

  return (
    <section className="flex-grow flex flex-col">
      <div className="container flex-grow">
        <div className="flex flex-col [&>article:last-child]:border-b-0 [&>article:first-child]:pt-0 ">
          {productsData.map((product, index) => (
            <Fragment key={index}>
              <CardCart
                handleShowDeleteNotification={handleShowDeleteNotification}
                handleLoading={handleLoading}
                data={product}
                userEmail={userEmail}
                key={index}
                couponData={dataFromModal}
                sendDataToParent={handleDataFromCardCart}
              />
            </Fragment>
          ))}
        </div>
      </div>
      <div className=" sticky py-6 container shadow-[0px_-5px_30px_0px_#00000010] max-w-[460px] bottom-0 bg-white flex flex-col gap-3">
        <div className="flex justify-between items-center mb-1">
          <div>
            <h1
              className="font-semibold text-h6"
              aria-label={`Total (${productsData && productsData.length} ${
                productsData.length === 1 ? "artigo" : "artigos"
              })`}
            >
              Total ({productsData && productsData.length}{" "}
              {productsData.length === 1 ? "artigo" : "artigos"})
            </h1>
            <p className="text-secondary text-caption" aria-label="Iva Incluido">
              IVA Incluído
            </p>
          </div>
          <div>
            <h2
              className="font-semibold text-h6"
              aria-label={`Total do Carrinho: ${
                productsData.length > 0
                  ? getCartTotalPrice(productsData) + " euros"
                  : "Carrinho vazio"
              }`}
            >
              {productsData.length > 0 &&
                (!cardCartData ? <NormalPrice /> : <DiscountedPrice />)}
            </h2>
          </div>
        </div>

        {!cardCartData ? (
          <Button
            type={"black-outlined"}
            width="100%"
            ariaLabel="Aplicar um cupão"
            onClick={() => dispatch(openModal("applyCoupon"))}
          >
            Aplicar um cupão
          </Button>
        ) : (
          <Button
            type={"black-outlined"}
            width="100%"
            ariaLabel="Aplicar um cupão"
            onClick={() => {
              setCardCartData("");
              setDataFromModal("")
              dispatch(showNotification("couponRemoved"));
            }}
          >
            Remover Cupão
          </Button>
        )}

        <Button
          onClick={() => updateStage(2)}
          type={"black"}
          ariaLabel="Preencher dados de envio"
          width="100%"
        >
          Preencher dados de envio
        </Button>

        <ApplyCouponModal sendDataToShop={handleDataFromModal} />
      </div>
      <Notification
        id={"couponSuccess"}
        type={"Success"}
        message={"Cupão aplicado com sucesso."}
      />
      <Notification
        id={"couponError"}
        type={"Error"}
        message={
          "Cupão inválido. Certifique-se que tem um produto da marca escolhida no carrinho."
        }
      />
      <Notification
        id={"couponRemoved"}
        type={"Informational"}
        message={
          "Cupão removido"
        }
      />
    </section>
  );
};

export default ShopSectionOne;

//