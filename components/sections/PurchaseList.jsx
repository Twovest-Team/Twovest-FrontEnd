import useAuthServer from "@/hooks/server-hooks/useAuthServer";

export default async function PurchaseList({ type }) {
  console.log(type);

  if (!type) {
    // Mostrar todas as encomendas
    return <h1>Todas</h1>;
  } else {
    // Mostrar encomendas dependentes de um tipo
    return <h1>Type é {type}</h1>;
  }
}
