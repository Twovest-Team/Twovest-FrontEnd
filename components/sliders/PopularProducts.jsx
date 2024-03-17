import CardProduct from "../cards/CardProduct";
import ContentSlider from "./ContentSlider";


export const PopularProductsSilder = ({data}) => {
    
    const popularproducts = data;

      return(
        <ContentSlider>
            {popularproducts.map((item) => (
            <CardProduct alignPrice={'left'} key={item.id} product={item} gender={item.gender} slider={true}/>
            ))}
        </ContentSlider>
        
    )  
    
    
}