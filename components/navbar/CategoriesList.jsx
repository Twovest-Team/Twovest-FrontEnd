import { main_categories, categories } from "@/constants";
import { useRouter } from "next/navigation";

export const CategoriesList = ({ idCategory, genderState, handleClickMenu, handleClickCategory }) => {
  let gender;
  const router = useRouter();

  const handleClick = (category) => {
    handleClickMenu()
    handleClickCategory();
    router.push(`/products/${genderState}?category=${category}`);
  };

  if (genderState == "mulher") {
    gender = 1;
  } else {
    gender = 2;
  }

  return (
    <ul className="my-6 mx-6">
      {main_categories.map((e) => (
        <div key={e.id}>
          {idCategory == e.general_category && (
            <div className="my-6" key={e.id}>
              <h6 className="font-semibold">{e.plural}</h6>
              {categories.map((category) => (
                category.main_category == e.id && category.gender.includes(gender) && (
                  <button
                    className="my-4 block"
                    onClick={() => handleClick(category.plural)}
                    key={category.id}
                  >
                    {category.plural}
                  </button>
                )
              ))}
            </div>
          )}
        </div>
      ))}
    </ul>
  );
};