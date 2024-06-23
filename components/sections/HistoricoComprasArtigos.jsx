import Image from "next/image";

export default function HistoricoComprasArtigos() {
  return (
    <div className="lg:mr-8">
      <h2 className="text-h6 mt-8 mb-4">Artigos da Encomenda</h2>

      <article className="my-5">
        <div className="flex self-center items-center w-full">
          <figure className="bg-white border min-w-[115px] aspect-square border-grey rounded relative">
            <Image src={"/"} width={115} height={115} alt={"Nome do produto"} />
          </figure>
          <div className="min-h-[115px] flex justify-between flex-grow min-w-0">
            <div className="ml-4 flex flex-col font-semibold justify-between min-w-0 flex-grow ">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between gap-2">
                  <p className="truncate">Nome</p>
                </div>
                <p className={`text-caption text-primary_main `}>Novo</p>
                <p className="text-secondary font-normal text-caption">
                  Tamanho: XS
                </p>
              </div>

              <div className="flex justify-between">
                <p className="font-semibold h-8 flex items-center">20,99€</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
