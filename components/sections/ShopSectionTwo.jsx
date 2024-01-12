import Link from "next/link"

const ShopSectionTwo = ({updateStage}) => {
  return (
    <div className="container flex flex-col gap-8">
      <h6 className="font-semibold">Faturação</h6>
      <h6 className="font-semibold">Selecionar ponto de recolha</h6>

      <Link href={'shop/success'} className="bg-primary_main block text-center text-white py-3.5 font-semibold rounded">
        Efetuar pagamento
      </Link>
    </div>
  )
}

export default ShopSectionTwo