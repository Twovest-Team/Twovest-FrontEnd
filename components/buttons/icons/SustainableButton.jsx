'use client'

import { useAppDispatch } from "@/redux/hooks";
import PropTypes from "prop-types";
import Button from "../Button";
import { openModal } from "@/redux/slices/modalSlice";
import IconButton from "./IconButton";


const SustainableButton = ({ color, width, type }) => {

    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(openModal('sustainableProduct'))
    }

    const attributes = {
        ariaLabel: 'Ver mais acerca da sustentabilidade deste artigo.',
        icon: <svg display='block' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" style={{ width: `${width}px` }} fill={color}><title>leaf-circle-outline</title><path d="M8.04 16.34C9.05 13.83 10.19 10.96 14.5 10C14.5 10 9.5 10 7.88 14.63C7.88 14.63 7 13.75 7 12.75S8 9.63 10.5 9.13C11.21 9 12 8.87 12.78 8.76C14.75 8.5 16.64 8.22 17 7.5C17 7.5 15.5 16 10 16C9.82 16 9.57 15.94 9.33 15.85L8.86 17L7.91 16.67L8.04 16.34M12 4C16.41 4 20 7.59 20 12S16.41 20 12 20 4 16.41 4 12 7.59 4 12 4M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2Z" /></svg>,
        onClick: handleClick
    }

    const renderButton = () => {

        if (type === 'normal') {
            return <button className="rounded-full" onClick={attributes.onClick} ariaLabel={attributes.label}>{attributes.icon}</button>
        }

        if (type === 'bordered') {
            return (
                <Button
                    onClick={attributes.onClick}
                    className="shadow border border-grey_opacity_50"
                    width="100%"
                    padding="12px"
                    onlyIcon={true}
                    type="white"
                    ariaLabel={attributes.label}
                >
                    {attributes.icon}
                </Button>
            )
        }

    }



    return (
        <>
            {renderButton()}


        </>

    )
}

export default SustainableButton