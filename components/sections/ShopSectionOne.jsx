import { CardCart } from "../cards/CardCart";
import getCartTotalPrice from "@/utils/getCartTotalPrice";
import Button from "../buttons/Button";
const ShopSectionOne = ({
  handleLoading,
  handleShowDeleteNotification,
  productsData,
  userEmail,
  updateStage,
}) => {
  return (
    <section className="flex-grow flex flex-col">
      <div className="container flex-grow">
        <div className="flex flex-col [&>article:last-child]:border-b-0 [&>article:first-child]:pt-0 ">
          {productsData.map((product, index) => (
            <CardCart
              handleShowDeleteNotification={handleShowDeleteNotification}
              handleLoading={handleLoading}
              data={product}
              userEmail={userEmail}
              key={index}
            />
          ))}
        </div>
      </div>

      <div className=" sticky py-6 container shadow-[0px_-5px_30px_0px_#00000010] max-w-[460px] bottom-0 bg-white flex flex-col gap-3">
        <div className="flex justify-between items-center mb-1">
          <div>
            <h6
              className="font-semibold"
              aria-label={`Total (${productsData && productsData.length} ${productsData.length === 1 ? "artigo" : "artigos"
                })`}
            >
              Total ({productsData && productsData.length}{" "}
              {productsData.length === 1 ? "artigo" : "artigos"})
            </h6>
            <p className="text-secondary caption" aria-label="Iva Incluido">
              IVA Incluído
            </p>
          </div>
          <div>
            <h6
              className="font-semibold"
              aria-label={`Total do Carrinho: ${productsData.length > 0
                  ? getCartTotalPrice(productsData) + " euros"
                  : "Carrinho vazio"
                }`}
            >
              {productsData.length > 0 && (
                <>{getCartTotalPrice(productsData)}€</>
              )}
            </h6>
          </div>
        </div>


        <Button type={'black-outlined'} width="full" ariaLabel='Aplicar um cupão'>
          Aplicar um cupão
        </Button>

        <Button onClick={() => updateStage(2)} type={'black'} ariaLabel='Preencher dados de envio' width='full'>
        Preencher dados de envio
        </Button>

      </div>
    </section>
  );
};

export default ShopSectionOne;
