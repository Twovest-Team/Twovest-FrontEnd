"use client";

import ContentSlider from "../sliders/ContentSlider";
import CardProduct from "../cards/CardProduct";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import getUserHistory from "@/utils/db/productsViewHistory/getUserHistory";
import { updateHistory } from "@/redux/slices/historyProducts";

const LastProductsSeen = () => {
  const dispatch = useAppDispatch();
  const currentUserHistory = useAppSelector(
    (state) => state.historyProducts.products
  );
  const currentUser = useAppSelector((state) => state.user.data);

  async function getUserHistoryData() {
    const data = await getUserHistory(currentUser.email);
    if (data && data.length > 0) {
      dispatch(updateHistory(data));
    }
  }

  useEffect(() => {
    if (currentUser && currentUserHistory === null) {
      getUserHistoryData();
    }
  }, [currentUser]);

  if (currentUserHistory && currentUserHistory.length > 0) {
    return (
      <div className="py-16 flex flex-col border-y border-grey">
        <h6 className="font-semibold mb-4 container">Últimos artigos vistos</h6>
        <ContentSlider>
          {currentUserHistory.map((element) => (
            <CardProduct
              key={element.products.id}
              product={element.products}
              gender={element.products.gender}
              slider={true}
            />
          ))}
        </ContentSlider>
      </div>
    );
  }
};

export default LastProductsSeen;
