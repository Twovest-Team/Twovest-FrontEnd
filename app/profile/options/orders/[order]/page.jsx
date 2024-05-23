import NavigationTitle from "@/components/providers/NavigationTitle";
import getOrderById from "@/utils/db/getOrderById";
import getPortugueseDateString from "@/utils/getPortugueseDateString";
import ContentSlider from "@/components/sliders/ContentSlider";
import CardProduct from "@/components/cards/CardProduct";
import { NoResultsNotice } from "@/components/sections/NoResultsNotice";
import { Fragment } from "react";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";

export default async function Order({ params }) {
  const purchaseId = params.order;
  const ordersData = await getOrderById(purchaseId);
  const currentUser = await useAuthServer();

  if (!currentUser) {
    return (
      <NoResultsNotice
        title={"Não encontramos encomendas."}
        text={
          "Não tens sessão iniciada. Inicia a tua sessão para consultares as tuas encomendas"
        }
        btnText={"Ir para Geral"}
      />
    );
  }

  if (!ordersData) {
    return (
      <NoResultsNotice
        title={"Não encontramos uma encomenda com este id."}
        text={"Verifica se não alteraste o número da encomenda no URL."}
        btnText={"Ir para Geral"}
      />
    );
  }

  const orderData = ordersData[0];
  if (currentUser.id != orderData.id_user) {
    return (
      <NoResultsNotice
        title={"Não tens nenhuma encomenda com este id."}
        text={
          "Verifica se não estás a tentar aceder a uma encomenda de outro utilizador."
        }
        btnText={"Ir para Geral"}
      />
    );
  }

  return (
    <main>
      <NavigationTitle titleText={`Detalhes da encomenda nº ${purchaseId}`} />
      <div className="flex container mt-4 mb-6">
        <div className="w-full h-full px-6 py-[18px] bg-white rounded-[5px] border border-grey flex-col">
          <div className="w-full flex-col justify-start items-start inline-flex pb-4">
            <div className="text-black font-semibold">
              {getPortugueseDateString(orderData.created_at)}
            </div>
            <div className="text-secondary">Encomenda nº{purchaseId}</div>
            {orderData.status == 0 && (
              <div className="text-warning_main">Encomenda pendente</div>
            )}
            {orderData.status == 1 && (
              <div className="text-primary_main">Encomenda entregue</div>
            )}
            {orderData.status == 2 && (
              <div className="text-error_main">Encomenda cancelada</div>
            )}
          </div>
          <div className="w-full flex sm:flex-row flex-col gap-6">
            <div className="flex-col justify-start items-start">
              <div className="text-black font-semibold">Data de entrega</div>
              <div className="text-secondary">
                {getPortugueseDateString(orderData.delivery_date)}
              </div>
            </div>
            <div className="flex-col justify-start items-start">
              <div className="text-black font-semibold">Total geral</div>
              <div className="text-secondary">{`${orderData.total} €`}</div>
            </div>

            <div className="flex-col justify-start items-start">
              <div className="text-black font-semibold">Código de envio</div>
              <div className="text-secondary">{orderData.tracking_code}</div>
            </div>
            <div className="flex-col justify-start items-start">
              <div className="text-black font-semibold">Cupões utilizados</div>
              {orderData.coupons.length > 0 ? (
                <>
                  {orderData.coupons.map((element) => (
                    <div className="text-secondary" key={element.id}>
                      {element.title}
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-secondary">Não aplicado</div>
              )}
            </div>
            <div className="flex-col justify-start items-start">
              <div className="text-black font-semibold">Portes de envio</div>
              <div className="text-secondary">{`${orderData.shipping_cost} €`}</div>
            </div>
            <div className="flex-col justify-start items-start">
              <div className="text-black font-semibold">Pontos ganhos</div>
              <div className="text-secondary">{orderData.points_earned}</div>
            </div>
          </div>
          <div className="flex-col justify-start items-start mt-6">
            <div className="text-black font-semibold mb-6">
              Artigos da encomenda
            </div>
            <ContentSlider className="right-6">
              {orderData.offers.map((element) => (
                <li key={element.id}>
                  <Fragment key={element.products.id}>
                    <CardProduct
                      key={element.products.id}
                      product={element.products}
                      gender={element.products.gender}
                      slider={true}
                    />
                    <div className="flex-col justify-start items-start">
                      <div className="text-primary_main">
                        {`Condição: ${element.conditions.name}`}
                      </div>
                      <div className="text-secondary">
                        {`Tamanho: ${element.sizes.size}`}
                      </div>
                      <div>{`Preço: ${element.price} €`}</div>
                    </div>
                  </Fragment>
                </li>
              ))}
            </ContentSlider>
          </div>
        </div>
      </div>
    </main>
  );
}
