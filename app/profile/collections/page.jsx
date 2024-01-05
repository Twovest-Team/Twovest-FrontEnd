import CollectionPreview from "@/components/CollectionPreview";
//Lista com todas coleções associada a um perfil (incluindo o meu próprio perfil)
// Se for coleções de outros utilizadores, apenas mostrar as coleções públicas e/ou coleções que esse utilizador partilha comigo
// Se for as minhas coleções, mostrar privadas, públicas e partilhadas (mesmo que não seja o dono de uma coleção partilhada)

const looksCollection = [
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
];

const looksCollectionTwoItems = [
  {
    id: 76,
    nome: "Look Clássico",
    img: "classic.jpg",
  },
  {
    id: 1111,
    nome: "Look Feminino",
    img: "girly.jpg",
  }
];

const looksCollectionOneItem = [
  {
    id: 4,
    nome: "Look Natal",
    img: "santa.jpg",
  }
];

const Collections = () => {
  return (
    <div className="container">
      <div className="mb-10 pt-5"> 
      <CollectionPreview looks={looksCollection}/>
      </div>
      <div className="mb-10"> 
      <CollectionPreview looks={looksCollectionTwoItems} />
      </div>
      <div className="mb-10"> 
      <CollectionPreview looks={looksCollectionOneItem} />
      </div>
    </div>
  );
};

export default Collections;
