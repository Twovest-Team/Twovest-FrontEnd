import Image from "next/image";
import PontosEntregaIcons from "/public/images/icons/pontosdeentrega.svg";
import Link from "next/link";

const PontosDeEntregaCard = () => {
    return (
        <div className='w-full container text-center '>

            <div className='bg-white container pt-16 pb-10 relative rounded shadow-sm w-full'>

                <div className="text-black font-semibold">Tens demasiada roupa no armário?</div>
                <div className="text-black mt-2 mb-4">Vai a um dos nossos pontos de entrega e habilita-te a ganhar bónus!</div>
                <Link href={'/'} className="bg-primary_main block text-center mx-auto max-w-[240px] text-white py-3.5 font-semibold rounded">
                    Ir para Pontos de Entrega
                </Link>

                <div className='bg-black absolute -top-10 left-1/2 -translate-x-1/2 text-white rounded-full w-20 aspect-square flex items-center justify-center'>
                    <Image src={PontosEntregaIcons} width={30} height={30} alt="icon pontos de entrega" />
                </div>
            </div>

        </div>
    )
}

export default PontosDeEntregaCard;