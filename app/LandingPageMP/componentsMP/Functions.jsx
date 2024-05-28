import Image from "next/image"
import CompraImage from "../photosMP/compra.png"
import PontosImage from "../photosMP/pontos.png"
import GaleriaImage from "../photosMP/galeria.png"
import ColecaoImage from "../photosMP/colecao.png"


export default function Functions () {
    return (
        <div className="pt-[50px]">
            <div className="w-[388px] justify-center items-center inline-flex pb-[30px]">
                <h4 className="w-[335px] text_h3 text-center">Funcionalidades Principais</h4>
            </div>
            <div className="w-[341.16px] h-[1810px] flex-col justify-start items-end gap-[30px] inline-flex">
                <div className="items-center justify-center">
                    <div className="p-4 shadow-md rounded-[20px] bg-green-200">
                        <Image
                        src={CompraImage}
                        alt="Mobile phone screen with a shopping app and multiple products"
                        width={284}
                        height={520}
                        className="rounded-md"
                        />
                        <h2 className="text-xl text-right body_semibold mt-4">Compra de um artigo</h2>
                    </div>
                </div>
                <div className="items-center justify-center">
                    <div className="p-4 shadow-md rounded-[20px] bg-white">
                        <Image
                        src={PontosImage}
                        alt="Mobile phone screen with a shopping app and multiple products"
                        width={284}
                        height={520}
                        className="rounded-md"
                        />
                        <h2 className="text-xl text-right body_semibold mt-4">Pontos e Cupões</h2>
                    </div>
                </div>
                <div className="items-center justify-center">
                    <div className="p-4 shadow-md rounded-[20px] bg-black">
                        <Image
                        src={GaleriaImage}
                        alt="Mobile phone screen with a shopping app and multiple products"
                        width={284}
                        height={520}
                        className="rounded-md"
                        />
                        <h2 className="text-right font-bold mt-4 text-white">Galeria de Looks</h2>
                    </div>
                </div>
                <div className="items-center justify-center">
                    <div className="p-4 shadow-md rounded-[20px] bg-emerald-500">
                        <Image
                        src={ColecaoImage}
                        alt="Mobile phone screen with a shopping app and multiple products"
                        width={284}
                        height={520}
                        className="rounded-md"
                        />
                        <h2 className="text-xl text-right body_semibold mt-4">Coleções de Looks</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}