import { main_categories, categories } from "@/constants"
import Link from "next/link";
import { useRouter } from "next/navigation";

export const CategoriesList = ({idCategory, genderState, toggleMenu, toggleCategory}) =>{

    let gender;

    const router = useRouter();

    const handleClickCategory = (category) =>{
        toggleMenu();
        toggleCategory();
        router.push(`/products/${genderState}?category=${category}`)
    }

    if(genderState == "mulher"){
        gender=1;
    }else{
        gender=2;
    }

    return(
        <ul className="my-6 mx-6">
            
            {main_categories.map((e) =>
            <div key={e.id}>
            
            {idCategory == e.general_category && 

            <div className="my-6" >
                <h6 className="font-semibold">{e.plural}</h6>
            
            {categories.map((category) => 
            <>
            {category.main_category == e.id && category.gender.includes(gender) &&

             <button className="my-4 block" onClick={()=> handleClickCategory(category.plural)}>{category.plural}</button>}
            </>)}
            
            </div>}

            </div>
            )}
        </ul>
    )
}