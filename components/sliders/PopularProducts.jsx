import CardProduct from "../cards/CardProduct";
import ContentSlider from "./ContentSlider";

export const PopularProductsSilder = ({ data }) => {
  const popularproducts = data;

  return (
    <ContentSlider>
      {popularproducts.map((item) => (
        <li key={item.id}>
          <CardProduct
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
