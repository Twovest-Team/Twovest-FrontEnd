"use client";

import Modal from "./Modal";
import { openModal } from "@/redux/slices/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import Button from "../buttons/Button";
import Link from "next/link";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const ModalSubmitLook = ({gender}) => {

const dispatch = useAppDispatch();
dispatch(openModal('submitLook'));


    return(
    <Modal size={"sm"} id='submitLook'>
        <div className="text-center mx-auto">
        <div className="min-h-[250px] my-auto items-center">
                <CheckCircleOutlineIcon style={{fontSize: "70px"}}className=" text-primary_main "/>
                <h1 className="text_h5 mt-4">Look submetido com sucesso!</h1>
                <p className="text-secondary">Já podes consultá-lo na Galeria de Looks.</p>
            </div>
        </div>
    </Modal>
    )
        
}
