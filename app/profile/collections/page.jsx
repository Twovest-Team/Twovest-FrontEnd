import CollectionPreview from "@/components/items/CollectionPreview";
//Lista com todas coleções associada a um perfil (incluindo o meu próprio perfil)
// Se for coleções de outros utilizadores, apenas mostrar as coleções públicas e/ou coleções que esse utilizador partilha comigo
// Se for as minhas coleções, mostrar privadas, públicas e partilhadas (mesmo que não seja o dono de uma coleção partilhada)

import CardWatchlist from "@/components/cards/CardWatchlist";

//Array com as diversas coleções a mostrar,inclusive a sua privacidade e nome, que vão ser renderizadas na card CollectionPreview
const looksCollection = {
  id: 102,
  nome: "Inspo looks para as migas",
  privacidade: "privada",
  publicacoes: [
    {
      id: 76,
      nome: "Look Clássico",
      img: "classic.jpg",
    },
    {
      id: 1111,
      nome: "Look Feminino",
      img: "girly.jpg",
    },
    {
      id: 25,
      nome: "Look Natureza",
      img: "nature.jpg",
    },
    {
      id: 4,
      nome: "Look Natal",
      img: "santa.jpg",
    },
    {
      id: 1974,
      nome: "Look Wild",
      img: "snake.jpg",
    },
    {
      id: 696,
      nome: "Look Contraste",
      img: "velvet.jpg",
    },
    {
      id: 8,
      nome: "Look Florido",
      img: "flowers.jpg",
    },
  ],
};

const looksCollectionTwoItems = {
  id: 2,
  nome: "Trends femininas queeeen",
  privacidade: "publica",
  publicacoes: [
    {
      id: 76,
      nome: "Look Clássico",
      img: "classic.jpg",
    },
    {
      id: 1111,
      nome: "Look Feminino",
      img: "girly.jpg",
    },
  ],
};

const looksCollectionOneItem = {
  id: 123,
  nome: "Natal está a chegar eheh",
  privacidade: "partilhada",
  publicacoes: [
    {
      id: 4,
      nome: "Look Natal",
      img: "santa.jpg",
    },
  ],
};

const Collections = () => {
  return (
    <div className="container">
      <div className="mb-10 pt-5">
        <CollectionPreview
          looks={looksCollection}
          key={looksCollection.id}
        />
      </div>
      <div className="mb-10">
        <CollectionPreview
          looks={looksCollectionTwoItems}
          key={looksCollectionTwoItems.id}
        />
      </div>
      <div className="mb-10">
        <CollectionPreview
          looks={looksCollectionOneItem}
          key={looksCollectionOneItem.id}
        />
      </div>
      <div className="mb-10">
        <CardWatchlist />
      </div>
    </div>
  );
};

export default Collections;
