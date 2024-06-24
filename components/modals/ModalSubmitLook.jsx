"use client";

import Modal from "./Modal";
import { closeModal, openModal } from "@/redux/slices/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useEffect } from "react";
import Button from "../buttons/Button";
import { useSearchParams } from "next/navigation";

const ModalSubmitLook = ({ gender }) => {

    const searchParams = useSearchParams()
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (searchParams.has('submit_success') && searchParams.get('submit_success') == 'true') {
            dispatch(openModal('submitLook'));
        }
    }, [searchParams])

    return (
        <Modal size={"sm"} id='submitLook'>
            <div className="min-h-[250px] flex flex-col justify-center my-auto items-center">
                <div className="flex justify-center items-center border-2 rounded-full aspect-square border-primary_main w-16 h-16">
                    <CheckOutlinedIcon sx={{ fontSize: 40 }} className="text-primary_main" />
                </div>
                <h1 className="text-h5 mt-4">Look submetido com sucesso!</h1>
                <p className="text-secondary">Já podes consultá-lo na Galeria de Looks.</p>
                <Button onClick={() => dispatch(closeModal('submitLook'))} className="mt-8" width="100%" type="black" ariaLabel="Continuar para a galeria">Continuar para a galeria</Button>
            </div>
        </Modal>
    )

}

export default ModalSubmitLook