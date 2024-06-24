import NavigationTitle from "@/components/providers/NavigationTitle";
import getLookById from "@/utils/db/getLookById";
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";
import SaveLookIconButton from "@/components/collections/SaveLookIconButton";
import Link from "next/link";
import ProductCard from "@/components/cards/ProductCard";
import { UserIcon } from "@/components/user/UserIcon";
import GridBox from "@/components/providers/GridBox";
import getStorageImage from "@/utils/getStorageImage";
import IconButton from "@/components/buttons/icons/IconButton";
import Image from "next/image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import getGender from "@/utils/getGender";
import getLooksForGallery from "@/utils/db/getLooksForGallery";
import LooksSkeleton from "@/components/loaders/Looks";
import LookCard from "@/components/cards/LookCard";
import ProductsSkeleton from "@/components/loaders/Products";
import LookUpvoteButton from "@/components/buttons/icons/LookUpvoteButton";

export const revalidate = 30;

const Look = async ({ params }) => {
  const lookId = params.look;
  const look = await getLookById(lookId);
  const gender = getGender(look.gender)?.string;
  const productsQty = look.products ? look.products.length : 0;

  return (
    <main>
      <MobileView look={look} lookId={lookId} productsQty={productsQty} />
      <DesktopView look={look} lookId={lookId} productsQty={productsQty} />
      <LookList gender={gender} />
    </main>
  );
};

const MobileView = ({ look, lookId, productsQty }) => (
  <section className="relative lg:hidden">
    <figure
      className="h-svh w-full bg-cover bg-center absolute bg-grey_opacity_50"
      style={{ backgroundImage: `url(${getStorageImage(look.url_image)})` }}
    >
      <div className="bg-gradient-to-b from-dark opacity-60 absolute top-0 z-10 w-full h-1/5" />
      <div className="bg-gradient-to-t from-dark opacity-60 absolute bottom-0 w-full h-2/5" />
    </figure>
    <section className="flex flex-col">
      <div className="relative h-svh w-full">
        <NavigationTitle hasImageBehind={true}>
          <div className="flex flex-col items-center justify-center translate-x-1 mt-1 z-20">
            <LookUpvoteButton upvotes={look.upvotes} />
          </div>
        </NavigationTitle>
        <div className="absolute bottom-0 left-0 right-0 w-full flex flex-col gap-8">
          <div className="container text-white flex items-center justify-between">
            <Link href={`/profile/${look.users.id}`} className="flex items-center gap-3">
              <UserIcon
                userRole={look.users.role}
                size="medium"
                userName={look.users.name}
                userId={look.users.id}
                url={look.users.img}
              />
              <p className="min-w-0 truncate">{look.users.name}</p>
            </Link>
            <SaveLookIconButton whiteMode lookId={lookId} />
          </div>
          <div className="h-24 flex justify-between items-center container rounded-t-[20px] bg-white">
            <h1 className="font-semibold text-h6">Adquirir o look</h1>
            <p className="text-secondary truncate">
              {productsQty} {productsQty > 1 ? "artigos" : "artigo"}
            </p>
          </div>
        </div>
      </div>
      <ProductGridBox view={1} look={look} />
    </section>
  </section>
);

const DesktopView = ({ look, lookId, productsQty }) => (
  <section className="hidden lg:block">
    <div className="fixed top-[75px] left-0 right-0 bg-white z-30">
      <NavigationTitle>
        <div className="translate-x-3">
          <IconButton ariaLabel="Opções da coleção" icon={<MoreVertIcon />} darkMode={true} />
        </div>
      </NavigationTitle>
    </div>
    <div className="flex gap-8 xl:gap-12 2xl:gap-32 container w-full mb-10 relative mt-20">
      <div className="sticky top-[154px] h-fit">
        <figure className="h-[calc(100vh-190px)] min-w-[400px] tall:min-w-[470px] relative text-white">
          <Image
            className="bg-grey_opacity_50 object-cover rounded"
            src={getStorageImage(look.url_image)}
            alt=""
            fill={true}
          />
          <div className="bg-gradient-to-b rounded-t from-dark opacity-60 absolute top-0 z-10 w-full h-1/5" />
          <div className="bg-gradient-to-t rounded-b from-dark opacity-60 absolute bottom-0 w-full h-2/5" />
          <div className="flex items-center justify-between absolute bottom-5 left-4 right-4">
            <Link href={`/profile/${look.users.id}`} className="flex items-center gap-3">
              <UserIcon
                userRole={look.users.role}
                size="medium"
                userName={look.users.name}
                userId={look.users.id}
                url={look.users.img}
              />
              <p className="min-w-0 truncate">{look.users.name}</p>
            </Link>
            <SaveLookIconButton whiteMode lookId={lookId} />
          </div>
          <div className="absolute top-3 right-3 z-10 flex flex-col items-center justify-center">
            <LookUpvoteButton upvotes={look.upvotes} />
          </div>
        </figure>
      </div>
      <div className="flex-grow relative">
        <div className="flex justify-between items-center bg-white pb-6 sticky left-0 right-0 top-0 z-20">
          <h1 className="font-semibold text-h6">Adquirir o look</h1>
          <p className="text-secondary truncate">
            {productsQty} {productsQty > 1 ? "artigos" : "artigo"}
          </p>
        </div>
        <ProductGridBox view={2} noContainer={true} look={look} />
      </div>
    </div>
  </section>
);

const ProductGridBox = ({ look, view, noContainer }) => (
  <div>
    {look.products && look.products.length > 0 ? (
      <div>
        <GridBox loader={<ProductsSkeleton />} noContainer={noContainer} restrictedTo={view} fixed>
          {look.products.map((product) => (
            <ProductCard key={product.id} product={product} gender={product.gender} />
          ))}
        </GridBox>
      </div>
    ) : (
      <div className="h-24 flex justify-between items-center container">
        <h2 className="font-semibold text-h6">Sem peças disponíveis</h2>
      </div>
    )}
  </div>
);

const LookList = async ({ gender }) => {
  const looks = await getLooksForGallery(gender);

  return looks.length > 0 ? (
    <div className="container pb-16">
      <h2 className="text-h6 mb-6">Continua a explorar</h2>
      <GridBox noContainer={true} loader={<LooksSkeleton />}>
        {looks.map((element) => (
          <LookCard key={element.id} look={element} slider={false} />
        ))}
      </GridBox>
    </div>

  ) : null;
};

export default Look;
