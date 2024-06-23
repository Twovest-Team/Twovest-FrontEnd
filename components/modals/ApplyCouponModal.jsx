"use client";

import Modal from "./Modal";
import useAuth from "@/hooks/client-hooks/useAuth";
import getUserCoupons from "@/utils/db/getUserCoupons";
import { useEffect, useState } from "react";
import CouponCard from "../cards/CouponCard";
import { useAppDispatch } from "@/redux/hooks";
import { closeModal } from "@/redux/slices/modalSlice";

export default function ApplyCouponModal({ sendDataToShop }) {
  const { currentUser } = useAuth();
  const [userCoupons, setUserCoupons] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser?.id) {
      // Função para buscar os cupons do utilizador
      const fetchCoupons = async () => {
        try {
          const coupons = await getUserCoupons(currentUser.id);
          setUserCoupons(coupons);
        } catch (error) {
          console.error("Failed to fetch user coupons:", error);
        }
      };

      fetchCoupons();
    }
  }, [currentUser]);

  return (
    <Modal size="md" id="applyCoupon">
      <div className="min-h-[300px]">
        <h1 className="text-h5 mb-6">Os meus cupões</h1>
        {userCoupons.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {userCoupons.map((coupon) =>
              coupon.quantity > 0 ? (
                <div
                  className="cursor-pointer"
                  key={coupon.id_coupon}
                  onClick={() => {
                    sendDataToShop(coupon);
                    dispatch(closeModal("applyCoupon"));
                  }}
                >
                  <CouponCard userCoupon={coupon} key={coupon.id_coupon} />
                </div>
              ) : null
            )}
          </div>
        ) : (
          <h6 className="text-h6 mb-6  text-secondary">
            {" "}
            Ainda não tens nenhum cupão
          </h6>
        )}
      </div>
    </Modal>
  );
}
