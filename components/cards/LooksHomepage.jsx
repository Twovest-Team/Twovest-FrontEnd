import ContentSlider from "../sliders/ContentSlider";
import LookCard from "./LookCard";

export const LooksHomepage = ({data}) => {
    
    const looks = data;
    //console.log(looks)

      return(
        
       <ContentSlider>
            {looks.map((item) => {
                return(<LookCard key={item.id} look={item} name={item.users.name} avatar={item.users.img} slider={true}/>)   
            }
            )}  
        </ContentSlider>
        
    )  
    
    
}