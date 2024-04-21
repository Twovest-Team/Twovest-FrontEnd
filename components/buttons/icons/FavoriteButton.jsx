"use client";

import IconButton from "./IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const FavoriteButton = () => {
  function handleClick() {
    // Função para adicionar ou remover um produto dos favoritos
  }

  return (
    <button onClick={handleClick}>
      <IconButton
        icon={<FavoriteBorderIcon />}
        className="text-secondary"
        ariaLabel="Botão de favorito"
      />
    </button>
  );
};

export default FavoriteButton;
