"use client";

import ContentSlider from "../sliders/ContentSlider";
import ProductCard from "../cards/ProductCard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import getUserHistory from "@/utils/db/productsViewHistory/getUserHistory";
import { updateHistory } from "@/redux/slices/historyProducts";
import useAuth from "@/hooks/client-hooks/useAuth";

const LastProductsSeen = () => {
  const dispatch = useAppDispatch();
  const currentUserHistory = useAppSelector(
    (state) => state.historyProducts.products
  );
  const {currentUser} = useAuth();

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
        <h1 className="font-semibold mb-4 container text-h6">Últimos artigos vistos</h1>
        <ContentSlider>
          {currentUserHistory.map((element) => (
            <li key={element.products.id}>
            <ProductCard
              key={element.products.id}
              product={element.products}
              gender={element.products.gender}
              slider={true}
            />
            </li>
          ))}
        </ContentSlider>
      </div>
    );
  }
};

export default LastProductsSeen;
