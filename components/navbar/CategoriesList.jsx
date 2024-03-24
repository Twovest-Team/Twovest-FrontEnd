import { main_categories, categories } from "@/constants";
import useGender from "@/hooks/client-hooks/useGender";
import { useRouter } from "next/navigation";

export const CategoriesList = ({ idCategory, handleClickMenu, handleClickCategory }) => {
  
  const router = useRouter();
  const [gender] = useGender();

  const handleClick = (category) => {
    handleClickMenu()
    handleClickCategory();
    router.push(`/products/${gender.string}?category=${category}`);
  };

  return (
    <ul className="my-6 mx-6">
      {main_categories.map((e) => (
        <div key={e.id}>
          {idCategory == e.general_category && gender && (
            <div className="my-6" key={e.id}>
              <h6 className="font-semibold">{e.plural}</h6>
              {categories.map((category) => (
                category.main_category == e.id && category.gender.includes(gender.id) && (
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