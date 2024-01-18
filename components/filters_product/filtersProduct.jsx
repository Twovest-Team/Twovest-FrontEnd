"use client";

import getAllColors from "@/utils/db/getAllColors";
import getAllConditions from "@/utils/db/getAllConditions";
import getSizesByType from "@/utils/db/getSizesByType";
import { useRouter } from "next/navigation";

const FiltersProduct = async ({ productType, productId, gender }) => {
  const router = useRouter();
  const allColors = await getAllColors();
  const allSizes = await getSizesByType(productType);
  const allConditions = await getAllConditions();

  const handleColorChange = (event) => {
    if (event.target.value !== "Cor") {
      router.push(
        `/product/${gender.toLowerCase()}/${productId}/offers?color=${event.target.value}`
      );
    } else {
      router.push(`/product/${gender.toLowerCase()}/${productId}/offers`);
    }
  };

  const handleConditionChange = (event) => {
    if (event.target.value !== "Condição") {
      router.push(
        `/product/${gender.toLowerCase()}/${productId}/offers?condition=${event.target.value}`
      );
    } else {
      router.push(`/product/${gender.toLowerCase()}/${productId}/offers`);
    }
  };

  const handleSizeChange = (event) => {
    if (event.target.value !== "Tamanho") {
      router.push(
        `/product/${gender.toLowerCase()}/${productId}/offers?size=${event.target.value}`
      );
    } else {
      router.push(`/product/${gender.toLowerCase()}/${productId}/offers`);
    }
  };

  return (
    <div className="place-content-center">
      <div className="w-[342px] h-28 flex-col justify-center items-start px-6 gap-3 inline-flex">
        <button className="w-[342px] h-[50px] gap-10 px-6 py-[17px] bg-white rounded-[5px] border border-stone-300 justify-between items-center inline-flex">
          <select onChange={handleConditionChange}>
            <option value={null}>Condição</option>
            {allConditions.map((condition) => (
              <option value={condition.name} key={condition.id}>
                {condition.name}
              </option>
            ))}
          </select>
        </button>
        <div className="justify-center items-center gap-3 inline-flex">
          <button className="w-30% h-[50px] px-6 py-[17px] bg-white rounded-[5px] border border-stone-300 justify-between items-center inline-flex">
            <select onChange={handleColorChange}>
              <option value={null}>Cor</option>
              {allColors.map((color) => (
                <option value={color.name} key={color.id}>
                  {color.name}
                </option>
              ))}
            </select>
          </button>
          <button className="w-40% h-[50px] px-6 py-[17px] bg-white rounded-[5px] border border-stone-300 justify-between items-center inline-flex">
            <select onChange={handleSizeChange}>
              <option value={null}>Tamanho</option>
              {allSizes.map((size) => (
                <option value={size.size} key={size.id}>
                  {size.size}
                </option>
              ))}
            </select>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersProduct;
