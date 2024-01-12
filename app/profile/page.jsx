import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import VoteCount from "@/components/voteCount/VoteCount";
import LookCard from "@/components/cards/LookCard";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ContentSlider from "@/components/sliders/ContentSlider";
import ProfilePicture from "@/components/profilePicture/ProfilePicture";
import CollectionPreview from "@/components/items/CollectionPreview";

// Próprio Perfil
const Profile = () => {
  // É necessário fazer aqui um pedido à BD com os dados desse utilizador --> Neste caso estou a usar arrays só para ver se funciona

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

  return (
    <>
      <div className="header_profile">
        <div className="header_profile-icon">
          <ArrowBackIosNewOutlinedIcon />
          <h5 className="h5_semibold">O meu perfil</h5>
        </div>
        <CreateOutlinedIcon />
      </div>

      <div className="profile_info">
        <ProfilePicture />
        <p className="body_semibold">Margarida Ferreira</p>
        <p className="text-[#9E9E9E]">margarida@gmail.com</p>
      </div>

      <div className="profile_points-upvotes">
        <VoteCount />
      </div>
      <div className="profile_look">
        <h6 className="h6_semibold">Os meus looks</h6>
        <div className="profile_looks">
          <ContentSlider>
            <LookCard location="profile" />
            <LookCard location="profile" />
            <LookCard location="profile" />
          </ContentSlider>
        </div>
      </div>
      <div className="profile_looks-collection">
        <h6 className="h6_semibold">Coleção de looks</h6>
        <button className="profile_search-collections">
          <SearchIcon />
          Procurar coleções
        </button>
        <CollectionPreview looks={looksCollection} key={looksCollection.id} />
        <CollectionPreview
          looks={looksCollectionTwoItems}
          key={looksCollectionTwoItems.id}
        />
        <CollectionPreview
          looks={looksCollectionOneItem}
          key={looksCollectionOneItem.id}
        />

        <div className="button_all-collections">
          <button className="profile_all-collections">
            Ver todas as coleções
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
