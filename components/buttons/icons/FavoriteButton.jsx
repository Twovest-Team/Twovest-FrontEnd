"use client";

import IconButton from "./IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Notification from "../../modals/Notification";
import { useAppDispatch } from "@/redux/hooks";
import { showNotification } from "@/redux/slices/notificationSlice";
import PropTypes from "prop-types";
import Button from "../Button";

const FavoriteButton = ({ type }) => {
  const dispatch = useAppDispatch();

  function handleClick() {
    // Todo Função para adicionar ou remover um produto dos favoritos
    dispatch(showNotification("favoriteButton"));
  }

  const renderButton = () => {
    if (!type) return null

    if (type === 'normal') return (
      <IconButton
        onClick={handleClick}
        icon={<FavoriteBorderIcon />}
        className="text-secondary"
        ariaLabel="Botão de favorito"
      />
    )

    if (type === 'bordered') return (
      <Button onClick={handleClick} className="shadow border border-grey_opacity_50" padding={4} onlyIcon={true} type="white" ariaLabel="Partilhar esta página.">
        <FavoriteBorderIcon />
      </Button>
    )

  }

  return (
    <>
      {renderButton()}

      <Notification
        id={"favoriteButton"}
        type={"Neutral"}
        message={"Adicionado aos favoritos"}
      />
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
