'use client'

import IconButton from "../buttons/icons/IconButton";
import { useAppDispatch } from "@/redux/hooks";
import { toggleMenu } from "@/redux/slices/menuToggle";
import MenuIcon from "@mui/icons-material/Menu";

const MenuItem = () => {

    const dispatch = useAppDispatch();

    const handleMenu = () => dispatch(toggleMenu())

    return (
        <IconButton
            ariaLabel={"Abrir menu de navegação."}
            icon={<MenuIcon />}
            onClick={handleMenu}
        />
    )
}

export default MenuItem