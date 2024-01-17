import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import applyPriceDiscount from "@/utils/applyPriceDiscount";

async function ProductsFiltered({ offers, discount }) {
  return (
    <>
      {offers.map((offer) => {
        
        let color;

        switch (offer.conditions.id) {
            case 1:
                color = 'bg-primary_main'
                break;
            case 2:
                color = 'bg-info_main'
                break;
            case 3:
                color = 'bg-warning_main'
                break;
        }
        return (
          <div
            key={offer.id}
            className="p-6 px-6 flex-col justify-center items-start gap-6 inline-flex"
          >
            <div className="w-[342px] h-[146px] px-6 py-7 bg-white rounded-[5px] border border-stone-300 flex-col justify-start items-center gap-5 inline-flex">
              <div className="w-[342px] px-6 justify-between items-center inline-flex">
                <div className="justify-start items-center gap-2 flex">
                  <div className={`w-3 h-3 ${color} rounded-full`} />
                  <div className="justify-start items-center gap-3 flex">
                    <div className="text-black text-base font-semibold leading-snug">
                      {offer.conditions.name}
                    </div>
                  </div>
                </div>
                <div className="justify-end items-center gap-2 flex">
                  {discount > 0 && (
                    <p className="text-secondary line-through">
                      {offer.price.toFixed(2)}€
                    </p>
                  )}
                  <p>{applyPriceDiscount(offer.price, discount)}€</p>
                </div>
              </div>
              <div className="self-stretch justify-between items-center inline-flex">
                <div className="h-[38px] justify-start items-center gap-3 flex">
                  <div className="px-3 py-2 bg-white rounded-[5px] border border-stone-300 justify-start items-center gap-2 flex">
                    <div className="text-center text-neutral-400 text-base font-normal leading-snug">
                      {offer.colors.name}
                    </div>
                  </div>
                  <div className="px-3 py-2 bg-white rounded-[5px] border border-stone-300 justify-start items-center gap-3 flex">
                    <div className="text-center text-neutral-400 text-base font-normal leading-snug">
                      {offer.sizes.size}
                    </div>
                  </div>
                </div>
                <div className="w-12 h-12 bg-emerald-500 rounded-[5px] flex-col justify-center items-center inline-flex">
                  <ShoppingBagIcon className="text-white" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ProductsFiltered;
