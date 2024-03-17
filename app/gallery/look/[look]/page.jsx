// Página de um look em específico

import NavigationTitle from "@/components/providers/NavigationTitle";
import getLookById from "@/utils/db/getLookById";
import Image from "next/image";
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";
import SaveLookButton from "@/components/collections/SaveLookButton";
import Link from "next/link";
import ItemsBox from "@/components/providers/ItemsBox";
import CardProduct from "@/components/cards/CardProduct";
import { UserIcon } from "@/components/user/UserIcon";
import ManageCollectionModal from "@/components/collections/ManageCollectionsModal";

export const revalidate = 30;

// Exemplo: twovest.com/gallery/mulher/253  <-id do look
const Look = async ({ params }) => {
  const lookId = params.look;

  const data = await getLookById(lookId);
  let productsQty;
  if (data.products) {
    productsQty = data.products.length;
  }

  return (
    <>
      <main className="relative">
        <section className="flex flex-col ">
          <Image
            src={data.url_image}
            alt="Look da galeria"
            fill={true}
            style={{
              objectFit: "cover",
            }}
            quality={60}
          />

          <div className="relative">
            <div className={`h-[calc(100vh-160px)] w-full relative`}>
              <NavigationTitle hasImageBehind={true}>
                <div className="flex flex-col items-center justify-center translate-x-2 z-10">
                  <ForwardOutlinedIcon
                    sx={{ fontSize: 28 }}
                    className="text-white -rotate-90"
                  />
                  {data.upvotes > 0 && <p>{data.upvotes}</p>}
                </div>
              </NavigationTitle>

              <div className="absolute container bottom-8 left-0 right-0 text-white flex items-center justify-between z-10">
                <Link
                  href={`/profile/${data.users.id}`}
                  className="flex items-center gap-3"
                >
                  <UserIcon
                    userRole={data.users.role}
                    size="large"
                    userName={data.users.name}
                    userId={data.users.id}
                    url={data.users.img}
                  />
                  {/* <Image className="rounded-full" width={40} height={40} src={data.users.img} alt={`look de ${data.users.name}`}/> */}

                  <p className="min-w-0 truncate">{data.users.name}</p>
                </Link>

                <SaveLookButton whiteMode lookId={lookId} />
              </div>
              <div className="bg-gradient-to-b from-dark opacity-70 absolute top-0 w-full h-1/5" />
              <div className="bg-gradient-to-t from-dark opacity-70 absolute w-full h-full" />
            </div>
          </div>
          <div className="relative rounded-t-[28px]  rounded-b-none bg-white">
            {data.products && data.products.length > 0 ? (
              <>
                <div className="h-24 flex justify-between items-center container">
                  <h6 className="font-semibold">Adqurir o look</h6>
                  <p className="text-secondary truncate">
                    {productsQty}
                    {productsQty > 1 ? " artigos" : " artigo"}
                  </p>
                </div>

                <ItemsBox fixedView={2}>
                  {data.products.map((product) => (
                    <CardProduct
                      key={product.id}
                      product={product}
                      gender={product.gender}
                    />
                  ))}
                </ItemsBox>
              </>
            ) : (
              <div className="h-24 flex justify-between items-center container">
                <h6 className="font-semibold">Sem peças disponíveis</h6>
              </div>
            )}
          </div>
        </section>
      </main>

      <ManageCollectionModal lookId={lookId} />
    </>
  );
};

export default Look;
