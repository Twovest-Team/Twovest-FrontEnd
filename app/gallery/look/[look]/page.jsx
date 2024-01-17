// Página de um look em específico

import NavigationTitle from "@/components/providers/NavigationTitle";
import getLookById from "@/utils/db/getLookById";
import Image from "next/image";
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";
import SaveButton from "@/components/buttons/icons/SaveButton";
import Link from "next/link";
import ItemsBox from "@/components/providers/ItemsBox";
import CardProduct from "@/components/cards/CardProduct";
import SaveToCollectionModal from "@/components/modals/SaveToCollectionModal";

export const revalidate = 0;

// Exemplo: twovest.com/gallery/mulher/253  <-id do look
const Look = async ({ params }) => {
  const lookId = params.look;

  const data = await getLookById(lookId);
  let productsQty;
  if (data.products) {
    productsQty = data.products.length
  }


  return (
    <>
      <main className="relative">

        <figure className="h-screen w-full bg-cover bg-center absolute" style={{ backgroundImage: `url(${data.url_image})` }}>
          <div className="bg-gradient-to-b from-dark opacity-70 absolute top-0 z-10 w-full h-1/5" />
          <div className="bg-gradient-to-t from-dark opacity-70 absolute bottom-0 w-full h-2/5" />
        </figure>

        <section className="flex flex-col">

          <div className="relative">

            <div className={`z-20 h-[calc(100vh-160px)] w-full relative`}>
              <NavigationTitle hasImageBehind={true}>
                <div className="flex flex-col items-center justify-center translate-x-2">
                  <ForwardOutlinedIcon sx={{ fontSize: 28 }} className="text-white -rotate-90" />
                  {data.upvotes > 0 && <p>{data.upvotes}</p>}
                </div>
              </NavigationTitle>


              <div className="absolute container bottom-8 left-0 right-0 text-white flex items-center justify-between z-10">
                <Link href={`/profile/${data.users.id}`} className="flex items-center gap-3">
                  <Image className="rounded-full" width={40} height={40} src={data.users.img} />
                  <p className="min-w-0 truncate">{data.users.name}</p>
                </Link>
                <SaveButton lookId={lookId} />
              </div>
            </div>


            <section className="rounded-t-[28px] bg-white">
              {data.products && data.products.length > 0 ?
                <>
                  <div className="h-24 flex justify-between items-center container">
                    <h6 className="font-semibold">Adqurir o look</h6>
                    <p className="text-secondary truncate">
                      {productsQty}
                      {productsQty > 1 ? ' artigos' : ' artigo'}
                    </p>
                  </div>

                  <ItemsBox fixedView={2}>
                    {data.products.map(product => <CardProduct key={product.id} product={product} gender={product.gender} />)}
                  </ItemsBox>

                </>

                :

                <div className="h-24 flex justify-between items-center container">
                  <h6 className="font-semibold">Sem peças disponíveis</h6>
                </div>

              }

            </section>
          </div>
        </section>
      </main>

      <SaveToCollectionModal lookId={lookId} />
    </>


export default Look;
