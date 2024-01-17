import ImageSwiper from "@/components/Carousel/Swiper";
import { Buttons } from "@/components/buttons/Buttons";
import PontosDeEntregaCard from "@/components/cards/PontosDeEntregaCard";
import getCategoryName from "@/utils/getCategoryName";

export default function Home() {



  return (

    <main className="mb-20">
        
        <ImageSwiper/>
        
      {/* <section className="mt-14 mb-18">
        <h6 className="font-semibold px-6">Top Categorias</h6>
        <div className="flex my-4 overflow-auto ml-6">
          <div className="bg-grey p-20 rounded ml-2"></div>
          <div className="bg-grey p-20 rounded ml-2"></div>
          <div className="bg-grey p-20 rounded ml-2"></div>
          <div className="bg-grey p-20 rounded ml-2"></div>
          <div className="bg-grey p-20 rounded mx-2"></div>
        </div>
      </section> */}

      <section className="mt-14 mb-18">
        <h6 className="font-semibold px-6">Mais Procurados 🔥</h6>
        <div className="flex my-4 overflow-auto ml-6">
          <div className="bg-grey p-20 rounded ml-2"></div>
          <div className="bg-grey p-20 rounded ml-2"></div>
          <div className="bg-grey p-20 rounded ml-2"></div>
          <div className="bg-grey p-20 rounded ml-2"></div>
          <div className="bg-grey p-20 rounded mx-2"></div>
        </div>
      </section>

      <section className="mt-14 mb-18 px-6">
        <h6 className="font-semibold mb-4">Marcas</h6>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-grey py-10 px-4"></div>
          <div className="bg-grey py-10 px-4"></div>
          <div className="bg-grey py-10 px-4"></div>
          <div className="bg-grey py-10 px-4"></div>
        </div>
        <div className="text-right font-semibold my-3">Ver todas as marcas -&gt;</div>
      </section>

      <section className="mt-14 py-20 text-white bg-black">
        <h6 className="font-semibold mb-4 px-6">Galeria de Looks</h6>
        <div className="flex overflow-auto ml-6 mb-4">
          <div className="bg-grey p-20 rounded ml-2"></div>
          <div className="bg-grey p-20 rounded ml-2"></div>
          <div className="bg-grey p-20 rounded ml-2"></div>
          <div className="bg-grey p-20 rounded ml-2"></div>
          <div className="bg-grey p-20 rounded mx-2"></div>
        </div>
        <div className="px-6 pt-3">
          <p className="mb-4">🔥 Descobre novos looks e inspira-te!</p>

          <Buttons btnState={"galeryMain"} text={"Ir para a Galeria"} icon={"navigateNext"}  btnSize={"modalSize"} />
        </div>
      </section>

      <section style={{ backgroundImage: `url('/images/homepage/pontosdeentregabg.png')` }}
      className="h-screen bg-cover bg-center flex items-center justify-center text-white">

        <PontosDeEntregaCard />

      </section>

     

    </main>
  );
}''