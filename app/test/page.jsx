import NavigationTitle from "@/components/providers/NavigationTitle";
import Filter from "@/components/filters_product/filter";
import getProductById from "@/utils/db/getProductById";
const Test = async () => {
  return (
    <div>
      <NavigationTitle titleText={"Test"} />

      <div className="container desktop flex flex-col gap-6 mb-10">
        <Filter></Filter>
      </div>
    </div>
  );
};

export default Test;
