import Ofertas from "@/utils/db/getProductById";
import ProductOffers from "@/components/cards/ProductOfferCard";
import NavigationTitle from "@/components/providers/NavigationTitle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
export default async function Alloffers({ params }) {
  const productId = params.id;
  const productGender = params.gender
  const result = await Ofertas(productId, productGender);

  //console.log("Fetched result:", result);
  return (
    <div>
      <NavigationTitle titleText="Offers" className="titlenav" />
      <div className="justify-center items-center mx-4 p-2 ">
        <div className="shadow border rounded w-full py-2 px-3 text-secondary-700 appearance-none mt-6">
          <div id="firstClick" className="flex text-secondary">
            <label className="block font-inter text-secondary mb-2 ">
              Condição
            </label>
            <ArrowDropDownIcon className={"ml-auto text-secondary"} />
          </div>
        </div>
      </div>
      <div className="flex text-center mb-4">
        <div className="justify-center items-center  mx-4 pl-2 w-full">
          <div className="shadow border rounded w-full py-2 px-3 text-secondary-700 appearance-none mt-4">
            <div id="firstClick" className="flex text-secondary">
              <label className="block font-inter text-secondary mb-2">
                Cor
              </label>
              <ArrowDropDownIcon className={"ml-auto text-secondary"} />
            </div>
          </div>
        </div>
        <div className="justify-center items-center mx-2 pr-4 w-full">
          <div className="shadow border rounded w-full py-2 px-3 text-secondary-700 appearance-none mt-4">
            <div id="firstClick" className="flex text-secondary">
              <label className="block font-inter text-secondary mb-2">
                Tamanho
              </label>
              <ArrowDropDownIcon className={"ml-auto text-secondary"} />
            </div>
          </div>
        </div>
      </div>
      <ul>
        <div className="justify-center items-center mx-4 p-2 ">
          {result.offers.map((offer, index) => (
            <div key={index} className="mb-4">
              <ProductOffers
                key={index}
                offer={offer}
                discount={result.discount}
              />
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
}
