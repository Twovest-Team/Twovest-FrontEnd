"use client";

import SuccessCard from "@/components/cards/SuccessCard";
import Link from "next/link";
import removeFromCart from "@/utils/db/cart/removeFromCart";
import { updateCart } from "@/redux/slices/cartProducts";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import withAuth from "@/hocs/withAuth";
//import getUserCartProducts from '@/utils/db/cart/getUserCartProducts';
import useAuth from "@/hooks/useAuth";

const SuccessPage = ({ currentUser }) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.cartProducts.products);

  useEffect(() => {
    async function handleDeleteProduct() {
      if (currentUser) {
        const updatedCart = await removeFromCart(
          products[0]?.id,
          currentUser.email
        );
        if (updatedCart) {
          dispatch(updateCart(updatedCart));
        }
      }
    }

    handleDeleteProduct();
  }, [products, currentUser, dispatch]);

  //rever modo de eliminar, currentuser.email é nulo ent ele deve eliminar todos os que tenham o artigo com aquele ID

  return (
    <main className="h-screen bg-grey_opacity_50 flex justify-center items-center">
      <SuccessCard>
        <div className="flex flex-col gap-6">
          <div>
            <p className="font-semibold mb-2">Pagamento efetuado com sucesso</p>
            <p className="text-secondary">Obrigado por comprar na Twovest</p>
          </div>

          {/* Se ganhar pontos... v */}
          <div className="border container rounded border-grey py-6 flex flex-col gap-3">
            <h5 className="font-semibold text-primary_main">+ 200</h5>
            <p className="text-secondary">
              Podes fazer uso destes pontos para adquirir cupões.
            </p>
            <p className="flex items-center gap-1 justify-center font-semibold">
              Total de pontos: <span className="text-primary_main">350</span>
            </p>
          </div>
          {/* Se ganhar pontos... ^ */}

          <Link
            href={"/"}
            className="bg-primary_main block text-center text-white py-3.5 font-semibold rounded"
          >
            Voltar à loja
          </Link>
        </div>
      </SuccessCard>
    </main>
  );
};

export default withAuth(SuccessPage);
