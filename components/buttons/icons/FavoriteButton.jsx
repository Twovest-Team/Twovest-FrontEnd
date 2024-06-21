"use client";

import IconButton from "./IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Notification from "../../modals/Notification";
import { useAppDispatch } from "@/redux/hooks";
import { showNotification } from "@/redux/slices/notificationSlice";
import PropTypes from "prop-types";
import Button from "../Button";
import { useState } from "react";

const FavoriteButton = ({ type }) => {
  const dispatch = useAppDispatch();

  const [icon, setIcon] = useState(<FavoriteBorderIcon />)

  function handleClick() {
    // Todo Função para adicionar ou remover um produto dos favoritos
    dispatch(showNotification("favoriteButton"));
  }

  function setHoveredIcon() {
    setIcon(<FavoriteIcon />)
  }

  function setLeaveIcon() {
    setIcon(<FavoriteBorderIcon />)
  }

  const renderButton = () => {
    if (!type) return null

    if (type === 'normal') return (
      <button onMouseOver={setHoveredIcon} onMouseLeave={setLeaveIcon} className="text-secondary" ariaLabel="Botão de favorito" onClick={handleClick}>
        {icon}
      </button>
    )

    if (type === 'bordered') return (
      <Button onClick={handleClick} className="shadow border border-grey_opacity_50" padding="16px" onlyIcon={true} type="white" ariaLabel="Partilhar esta página.">
        {icon}
      </Button>
    )

  }

  return (
    <>
      {renderButton()}
    </>
  );
};

FavoriteButton.propTypes = {
  type: PropTypes.oneOf([
    "normal",
    "bordered",
  ]).isRequired,
}

export default FavoriteButton;
