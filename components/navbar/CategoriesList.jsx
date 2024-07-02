import { main_categories, categories } from "@/constants";
import { useRouter } from "next/navigation";

export const CategoriesList = ({ gender, idCategory, handleClickMenu, handleClickCategory }) => {

  const router = useRouter();

  const handleClick = (category) => {
    handleClickMenu()
    handleClickCategory();
    router.push(`/${gender.string}/products?category=${category}`);
  };

  return (
    <ul className="mx-4 [&>*:last-child]:border-b-0 [&>*]:border-b [&>*]:border-grey">
      {main_categories.map((e) => (
        <>
          {idCategory == e.general_category && gender && (

            <div key={e.id}>
              <div className="py-6" key={e.id}>
                <h1 className="font-semibold text-h6">{e.plural}</h1>
                {categories.map((category) => (
                  category.main_category == e.id && category.gender.includes(gender.id) && (
                    <button
                      className="mt-4 block"
                      onClick={() => handleClick(category.plural)}
                      key={category.id}
                    >
                      {category.plural}
                    </button>
                  )
                ))}
              </div>

            </div>
          )}
        </>
      ))}
    </ul>
  );
};