import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import Ofertas from "@/utils/db/getProductById";
import ProductOffers from "@/components/cards/ProductOfferCard";
import NavigationTitle from "@/components/providers/NavigationTitle";
import Dropdown from "./dropdownalloffers";
export default async function Alloffers({ params }) {
  const productId = params.id;
  const productGender = capitalizeFirstLetter(params.gender);
  const result = await Ofertas(productId, productGender);

  //console.log("Fetched result:", result);
  return (
    <>
      <NavigationTitle titleText="Offers" className="titlenav" />

      <div className=" flex flex-row  justify-center items-center mx-4 gap-4 p-2">
        <Dropdown label="Condição" />
        <Dropdown label="Cor" />
      </div>
      <div className=" flex flex-row justify-center items-center mx-4 p-2 ">
        <Dropdown label="Tamanho" />
      </div>

      <ul>
        {result.offers.map((offer, index) => (
          <li key={index}>
            <div className="justify-center items-center mx-4 p-2 ">
              <ProductOffers
                key={index}
                offer={offer}
                discount={result.discount}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
