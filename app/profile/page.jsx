import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import VoteCount from "@/components/voteCount/VoteCount";
import LookCard from "@/components/cards/LookCard";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ContentSlider from "@/components/sliders/ContentSlider";
import ProfilePicture from "@/components/profilePicture/ProfilePicture";
import CollectionPreview from "@/components/items/CollectionPreview";
import getInfoForProfilePage from "@/utils/db/getInfoForProfilePage";

// Próprio Perfil
const Profile = async () => {
  const id_user = 24;

  const data = await getInfoForProfilePage(id_user);
  const dadosPerfil = data[0];
 

  // É necessário fazer aqui um pedido à BD com os dados desse utilizador --> Neste caso estou a usar arrays só para ver se funciona
  
  return (
    <>
       <div className="header_profile">
        <div className="header_profile-icon">
          <ArrowBackIosNewOutlinedIcon />
          <h5 className="h5_semibold">O meu perfil</h5>
        </div>
        <CreateOutlinedIcon />
      </div>


      
      <div className="flex w-full flex-col justify-center items-center pt-[16px] px-[16px] gap-3">
        <ProfilePicture imageProfile={dadosPerfil.img}/>
        <p className="body_semibold">{dadosPerfil.name}</p>
        <p className="text-[#9E9E9E] overflow-hidden truncate w-11/12 text-center">{dadosPerfil.email}</p>
        </div>


        <div className="flex justify-center items-center self-stretch pt-10 px-6 pb-14 gap-4">
        <VoteCount />
        </div>
      {/* 
    


      <div className="profile_points-upvotes">
        
      </div>
      
      
      <div className="profile_look">
        <h6 className="h6_semibold container">Os meus looks</h6>
        <div className="profile_looks">
          <ContentSlider>
            <LookCard slider={true} looks={dadosPerfil.userLooks} nome={dadosPerfil.name} avatar={dadosPerfil.img} />
            <LookCard slider={true} looks={dadosPerfil.userLooks} nome={dadosPerfil.name} avatar={dadosPerfil.img} />
            <LookCard slider={true} looks={dadosPerfil.userLooks} nome={dadosPerfil.name} avatar={dadosPerfil.img} />
            <LookCard slider={true} looks={dadosPerfil.userLooks} nome={dadosPerfil.name} avatar={dadosPerfil.img} />
            <LookCard slider={true} looks={dadosPerfil.userLooks} nome={dadosPerfil.name} avatar={dadosPerfil.img} />
            <LookCard slider={true} looks={dadosPerfil.userLooks} nome={dadosPerfil.name} avatar={dadosPerfil.img} />
          </ContentSlider>
        </div>
      </div>
      
      
      <div className="profile_looks-collection">
        <h6 className="h6_semibold">Coleção de looks</h6>
        <button className="profile_search-collections">
          <SearchIcon />
          Procurar coleções
        </button>

        <div className="container">
        <CollectionPreview
          colecao={dadosPerfil.colecoes[0]}
          key={dadosPerfil.colecoes[0].id_collection}
        />
        <CollectionPreview
          colecao={dadosPerfil.colecoes[1]}
          key={dadosPerfil.colecoes[1].id_collection}
        />
        <CollectionPreview
          colecao={dadosPerfil.colecoes[2]}
          key={dadosPerfil.colecoes[2].id_collection}
        />
        </div>
        

        <div className="button_all-collections">
          <button className="profile_all-collections">
            Ver todas as coleções
            <ArrowForwardIosIcon />
          </button>
        </div>
  </div> 
  */}
    </>
  );
};

export default Profile;



