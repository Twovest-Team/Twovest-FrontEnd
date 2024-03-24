import { IconPontosDeEntrega } from "../items/IconPontosDeEntrega";
import Button from "../buttons/Button";
const PontosDeEntregaCard = () => {
  return (
    <div className="w-full md:w-[620px] container text-center ">
      <div className="bg-white container pt-16 pb-10 lg:pt-20 lg:pb-12 relative rounded shadow-sm w-full">
        <div
          className="text-black font-semibold"
          aria-label="Tens demasiada roupa no armário?"
        >
          Tens demasiada roupa no armário?
        </div>
        <div
          className="text-black mt-2 mb-4 md:mb-6"
          aria-label="Vai a um dos nossos pontos de entrega e habilita-te a ganhar bónus!"
        >
          Vai a um dos nossos pontos de entrega e habilita-te a ganhar bónus!
        </div>

        <Button className="mx-auto" href="/" type={'primary'} ariaLabel='Ir para pontos de Entrega'>
          Ir para pontos de Entrega
        </Button>


        <div className="bg-black absolute -top-10 left-1/2 -translate-x-1/2 text-white rounded-full w-20 aspect-square flex items-center justify-center">
          <IconPontosDeEntrega alt="icon pontos de entrega" />
        </div>
      </div>
    </div>
  );
};

export default PontosDeEntregaCard;
