import { CardCart } from "../cards/CardCart"

const ShopSectionOne = ({updateStage}) => {

    return (
        <section className="flex-grow flex flex-col">
            <div className="container flex-grow">

                <div className="flex flex-col [&>article:last-child]:border-b-0 [&>article:first-child]:pt-0 ">
                    <CardCart />
                    <CardCart />
                    <CardCart />
                    <CardCart />
                </div>
            </div>

            <div className=" sticky py-6 container shadow-[0px_-5px_30px_0px_#00000010] max-w-[460px] bottom-0 bg-white flex flex-col gap-3">
                <div className="flex justify-between items-center mb-1">
                    <div>
                        <h6 className="font-semibold">Total</h6>
                        <p className="text-secondary caption">IVA Incluído</p>
                    </div>
                    <div>
                        <h6 className="font-semibold">96.00€</h6>
                    </div>

                </div>
                <button onClick={() => updateStage(2)} className="bg-primary_main block text-center text-white py-3.5 font-semibold rounded">
                    Próximo passo
                </button>

                <button className="border-dark border-2 block text-center py-3.5 font-semibold rounded">
                    Aplicar cupão
                </button>
            </div>

        </section>


    )
}

export default ShopSectionOne