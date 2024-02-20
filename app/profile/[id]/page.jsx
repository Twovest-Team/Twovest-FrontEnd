import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

import LookCard from "@/components/cards/LookCard";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ContentSlider from "@/components/sliders/ContentSlider";
import ProfilePicture from "@/components/profilePicture/ProfilePicture";
import CollectionPreview from "@/components/items/CollectionPreview";
import getInfoForProfilePage from "@/utils/db/getInfoForProfilePage";
import React from "react";
import getUserByEmailServer from "@/utils/db/getUserByEmailServer";
import { redirect } from "next/navigation";
import getPortugueseDateString from "@/utils/getPortugueseDateString";
import NavigationTitle from "@/components/providers/NavigationTitle";
import ProfileScores from "@/components/sections/ProfileScores";
import Link from "next/link";

export const revalidate = 0

// Perfil dos utilizadores (do utilizador com sessão iniciada ou não)
const Profile = async ({ params }) => {

  const currentUser = await getUserByEmailServer();
  const urlId = params.id;
  let isOwnProfile = false;


  if (urlId && currentUser && urlId == currentUser.id) {
    isOwnProfile = true;
  }

  const data = await getInfoForProfilePage(urlId);

  const userFirstName = data[0].name.split(" ")[0];
  const userRegisterData = getPortugueseDateString(data[0].created_at);

  if (data && data.length > 0) {
    return (
      <>
        <NavigationTitle
          titleText={isOwnProfile ? "O meu perfil" : `Perfil de ${userFirstName}`}
        >
          {isOwnProfile ? <CreateOutlinedIcon /> : null}
        </NavigationTitle>

        <div className="flex w-full flex-col justify-center items-center pt-[16px] px-[16px] gap-3">
          <ProfilePicture imageProfile={data[0].img} />
          <p className="body_semibold">{data[0].name}</p>
          <p className="text-secondary overflow-hidden truncate w-11/12 text-center">
            {data[0].email}
          </p>
          <p>Desde {userRegisterData}</p>
        </div>

        <div className="flex justify-center items-center self-stretch pt-10 px-6 pb-14 gap-4">
          <ProfileScores />
        </div>

        <div className="pb-8">

          <h6 className="font-semibold container">
            {isOwnProfile ? 'Os meus looks' : `Looks de ${userFirstName}`}
          </h6>

          <div className="flex flex-col items-start pt-4 justify-between overflow-x-auto gap-y-4 gap-x-3">
            <ProfileLooks
              data={data}
              isOwnProfile={isOwnProfile}
              userFirstName={userFirstName}
            />
          </div>
        </div>

        {data &&
          <div className="flex pb-10 flex-col items-start self-stretch gap-4 container">
            <h6 className="font-semibold">Coleções de Looks</h6>
            <ProfileCollections
              userId={urlId}
              data={data}
              isOwnProfile={isOwnProfile}
              userFirstName={userFirstName}
            />
          </div>

        }


      </>
    );
  }

};

export default Profile;

async function ProfileLooks({ data, isOwnProfile, userFirstName }) {
  return (
    <>
      {data[0].hasOwnProperty("userLooks") ? (
        <ContentSlider>
          {data[0].userLooks.map((element) => (
            <LookCard
              slider={true}
              key={element.id}
              look={element}
              nome={data[0].name}
              avatar={data[0].img}
            />
          ))}
        </ContentSlider>
      ) : isOwnProfile ? (
        <div className="container text-secondary">
          {" "}
          Ainda não adicionaste nenhum look à tua galeria
        </div>
      ) : (
        <div className="container text-secondary">
          {" "}
          {userFirstName} ainda não adicionou nenhum look à sua galeria
        </div>
      )}
    </>
  );
}


async function ProfileCollections({ data, isOwnProfile, userFirstName, userId }) {

  let collectionsToShow;

  //console.log(data[0].colecoes)

  if (data[0].colecoes) {
    collectionsToShow = data[0].colecoes

    if (!isOwnProfile) {
      collectionsToShow = collectionsToShow.filter(collection => (
        collection.collections.privacy == 2 && collection.is_admin === true
      ))
    }
  }


  return (
    <>

      {isOwnProfile &&
        (collectionsToShow && collectionsToShow.length === 0 || !collectionsToShow) &&
        <div className="text-secondary">
          Ainda não criaste nenhuma coleção.
        </div>
      }

      {!isOwnProfile && !collectionsToShow &&
        <div className="text-secondary">
          {userFirstName} não tem coleções disponíveis.
        </div>
      }

      {collectionsToShow && collectionsToShow.length > 0 &&
        <>
          <button className="profile_search-collections">
            <SearchIcon />
            Procurar coleções
          </button>
          {collectionsToShow.slice(0, 3).map((element) => (
            <CollectionPreview
              userId={userId}
              collection={element}
              key={element.id_collection}
              isOwnProfile={isOwnProfile}
              className="pb-6"
            />
          ))}
          <div className="flex h-12 w-full items-center pt-10 pb-10 rounded">
            <Link href={`/profile/${userId}/collections`} className="profile_all-collections">
              Ver todas as coleções
              <ArrowForwardIosIcon />
            </Link>
          </div>
        </>
      }

    </>

  );
}