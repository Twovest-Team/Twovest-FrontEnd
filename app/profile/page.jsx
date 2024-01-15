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
import React from "react";
import getUserByEmailServer from "@/utils/db/getUserByEmailServer";


// Próprio Perfil
const Profile = async ({searchParams}) => {

  const id_user = searchParams.id;
  
  const sessionUser = await (await getUserByEmailServer()).id

  


  

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
        <LooksAndCollections id_user={id_user} scenario={0} />
      </div>

      <div className="flex justify-center items-center self-stretch pt-10 px-6 pb-14 gap-4">
        <VoteCount />
      </div>

      <div className="pb-16">
        <h6 className="font-semibold container">Os meus looks</h6>
        <div className="flex flex-col items-start pt-4 justify-between overflow-x-auto gap-y-4 gap-x-3">
          <LooksAndCollections id_user={id_user} scenario={1} />
        </div>
      </div>

      <div className="flex pb-10 flex-col items-start self-stretch pr-6 gap-4 container">
        <h6 className="font-semibold">Coleção de Looks</h6>
        <button className="profile_search-collections">
          <SearchIcon />
          Procurar coleções
        </button>
      </div>

      <div className="container">
        <LooksAndCollections id_user={id_user} scenario={2} />
      </div>

      <div className="flex h-12 w-full items-center pt-16 pb-10 rounded container">
        <button className="profile_all-collections">
          Ver todas as coleções
          <ArrowForwardIosIcon />
        </button>
      </div>
    </>
  );
};

export default Profile;

async function LooksAndCollections({ id_user, scenario }) {
  const data = await getInfoForProfilePage(id_user);

  if (scenario == 0) {
    return (
      <>
        {data.length > 0 ? (
          data.map((element) => (
            <React.Fragment key={element.email}>
              <ProfilePicture imageProfile={element.img} />
              <p className="body_semibold">{element.name}</p>
              <p className="text-secondary overflow-hidden truncate w-11/12 text-center">
                {element.email}
              </p>
            </React.Fragment>
          ))
        ) : (
          <p>No data...</p>
        )}
      </>
    );
  } else if (scenario == 1) {
    return (
      <>
        {data[0].hasOwnProperty("userLooks") ? (
          <ContentSlider>
            {data[0].userLooks.map((element) => (
              <LookCard
                slider={true}
                key={element.id}
                looks={element}
                nome={data[0].name}
                avatar={data[0].img}
              />
            ))}
          </ContentSlider>
        ) : (
          <div className="container font-semibold">Ainda não adicionaste nenhum look à galeria</div>
        )}
      </>
    );
  } else if (scenario == 2) {
    return (
      <>
        {data[0].hasOwnProperty("colecoes") ? (
          data[0].colecoes.map((element) => (
            <CollectionPreview colecao={element} key={element.id_collection} />
          ))
        ) : (
          <p>No data...</p>
        )}
      </>
    );
  }
}
