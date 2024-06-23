import ProductCard from "../cards/ProductCard";
import ContentSlider from "./ContentSlider";

export const PopularProductsSilder = ({ data }) => {

  if(!data && data.length === 0) return null

  const popularproducts = data;

  return (
    <ContentSlider>
      {popularproducts.map((item) => (
        <li key={item.id}>
          <ProductCard
            alignPrice={"left"}
            key={item.id}
            product={item}
            gender={item.gender}
            slider={true}
          />
        </li>
      ))}
    </ContentSlider>
  );
};
