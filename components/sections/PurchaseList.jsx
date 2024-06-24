import getUserOrders from "@/utils/db/getUserOrders";
import IconButton from "@/components/buttons/icons/IconButton";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { NoResultsNotice } from "@/components/sections/NoResultsNotice";
import getPortugueseDateString from "@/utils/getPortugueseDateString";
import Link from "next/link";


export default async function PurchaseList({ type, user }) {
  const ordersData = await getUserOrders(user.id);
  let filteredData = ordersData;

  if (!type) {
    // Mostrar todas as encomendas
    return (
      <>
        {ordersData.length > 0 ? (
          <>
            {ordersData.map((element) => (
              <div
                className="flex justify-between container mt-4 mb-6"
                key={element.id}
              >
                <div className="w-full h-full px-6 py-[18px] bg-white rounded-[5px] border border-grey justify-between items-center inline-flex">
                  <div className="w-2/6 flex-col justify-start items-start inline-flex">
                    <div className="text-black font-semibold">
                      {getPortugueseDateString(element.created_at)}
                    </div>
                    <div className="text-secondary">
                      Encomenda nº{element.id}
                    </div>
                    {element.status == 0 && (
                    <div className="text-warning_main">
                    Encomenda pendente
                    </div>
                    )}
                    {element.status == 1 && (
                    <div className="text-primary_main">
                    Encomenda entregue
                    </div>
                    )}
                    {element.status == 2 && (
                    <div className="text-error_main">
                    Encomenda cancelada
                    </div>
                    )}
                  </div>
                  <div>
                    <Link href={`/profile/options/orders/${element.id}`}>
                      <IconButton
                        icon={<KeyboardArrowRightIcon sx={{ fontSize: 29 }} />}
                        ariaLabel={`Mais detalhes sobre a encomenda número ${element.id}`}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <NoResultsNotice
            title={"Não encontramos encomendas."}
            text={"Não tens encomendas disponíveis."}
            btnText={"Ir para Geral"}
          />
        )}
      </>
    );
  } else {
    let numType = 0;
    if (type == "delivered") {
      numType = 1;
    }

    if (type == "pending") {
      numType = 0;
    }

    if (type == "canceled") {
      numType = 2;
    }
    filteredData = ordersData.filter((purchase) => purchase.status == numType);
    // Mostrar encomendas dependentes de um tipo
    return (
      <>
        {filteredData.length > 0 ? (
          <>
            {filteredData.map((element) => (
              <div
                className="flex justify-between container mt-4 mb-6"
                key={element.id}
              >
                <div className="w-full h-full px-6 py-[18px] bg-white rounded-[5px] border border-grey justify-between items-center inline-flex">
                  <div className="w-2/6 flex-col justify-start items-start inline-flex">
                    <div className="text-black font-semibold">
                      {getPortugueseDateString(element.created_at)}
                    </div>
                    <div className="text-secondary">
                      Encomenda nº{element.id}
                    </div>
                    {element.status == 0 && (
                    <div className="text-warning_main">
                    Encomenda pendente
                    </div>
                    )}
                    {element.status == 1 && (
                    <div className="text-primary_main">
                    Encomenda entregue
                    </div>
                    )}
                    {element.status == 2 && (
                    <div className="text-error_main">
                    Encomenda cancelada
                    </div>
                    )}
                  </div>
                  <div>
                    <Link href={`/profile/options/orders/${element.id}`}>
                      <IconButton
                        icon={<KeyboardArrowRightIcon sx={{ fontSize: 29 }} />}
                        ariaLabel={`Mais detalhes sobre a encomenda número ${element.id}`}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <NoResultsNotice
            title={"Não encontramos encomendas."}
            text={"Não tens encomendas disponíveis para esta categoria."}
            btnText={"Ir para Geral"}
          />
        )}
      </>
    );
  }
}
