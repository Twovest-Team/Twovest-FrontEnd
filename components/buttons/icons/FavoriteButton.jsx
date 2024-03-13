'use client'


import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FavoriteButton = () => {

    function handleClick() {
        // Função para adicionar ou remover um produto dos favoritos
    }

    return (
        <button onClick={handleClick}>
            <FavoriteBorderIcon className='text-secondary' />
        </button>

    )
}

export default FavoriteButton