'use client'

import Modal from "./Modal"
import useAuth from "@/hooks/client-hooks/useAuth"
import getUserCoupons from "@/utils/db/getUserCoupons";
import { useEffect, useState } from 'react';
import CouponCard from "../cards/CouponCard";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { closeModal } from "@/redux/slices/modalSlice";

export default function ApplyCouponModal() {
    const { currentUser } = useAuth();
    const [userCoupons, setUserCoupons] = useState([]);
    const pathname = usePathname()
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
        <Modal size='md' id='applyCoupon'>
            <div className="min-h-[300px]">
                <h1 className="text_h5 mb-6">Os meus cupões</h1>
                {userCoupons.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {userCoupons.map((coupon) => (
               <Link key={coupon.id_coupon} href={pathname + '?coupon=' + coupon.id_coupon} onClick={() => dispatch(closeModal('applyCoupon'))}>
              <CouponCard userCoupon={coupon} key={coupon.id_coupon} />
              </Link>
            ))}
          </div>
        ) : (
          <h6 className="text_h6 mb-6  text-secondary container">
            {" "}
            Ainda não tens nenhum cupão
          </h6>
        )}
            </div>
        </Modal>
    )
}

