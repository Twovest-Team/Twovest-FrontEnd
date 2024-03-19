import LookCard_Profile from "@/components/cards/LookCard_Profile";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ContentSlider from "@/components/sliders/ContentSlider";
import ProfilePicture from "@/components/profilePicture/ProfilePicture";
import React from "react";
import getPortugueseDateString from "@/utils/getPortugueseDateString";
import NavigationTitle from "@/components/providers/NavigationTitle";
import ProfileScores from "@/components/sections/ProfileScores";
import Link from "next/link";
import useAuthServer from "@/hooks/useAuthServer";
import CollectionList from "@/components/collections/CollectionList";
import getUserById from "@/utils/db/getUserById";
import getCollections from "@/utils/db/collections/getCollections";
import IconButton from "@/components/buttons/icons/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { checkOwnership } from "@/utils/handleCollections";
import getUserFirstName from "@/utils/getUserFirstName";

export const revalidate = 0;

// Perfil dos utilizadores (do utilizador com sessão iniciada ou não)
const Profile = async ({ params }) => {

  const ownerId = params.id
  const currentUser = await useAuthServer();
  const isOwnProfile = currentUser ? checkOwnership(currentUser.id, ownerId) : false;
  const ownerData = isOwnProfile ? currentUser : await getUserById(ownerId)
  const ownerFirstName = getUserFirstName(ownerData)
  const ownerCreatedAt = getPortugueseDateString(ownerData.created_at);
  const collectionsData = await getCollections({ ownerId, max: 3, privacy: 1 });
  
  if (ownerData) {
    return (
      <>
        <NavigationTitle
          titleText={isOwnProfile ? "O meu perfil" : `Perfil de ${ownerFirstName}`}
        >
          <IconButton icon={<MoreVertIcon />} />
        </NavigationTitle>

        <div className="flex w-full flex-col justify-center items-center pt-[16px] px-[16px] gap-3">
          <ProfilePicture imageProfile={ownerData.img} />
          <p className="body_semibold">{ownerData.name}</p>
          <p className="text-secondary overflow-hidden truncate w-11/12 text-center">
            {ownerData.email}
          </p>
          <p>Desde {ownerCreatedAt}</p>
        </div>

        <div className="flex justify-center items-center self-stretch pt-10 px-6 pb-14 gap-4">
          <ProfileScores />
        </div>

        <div className="pb-8">
          <h6 className="font-semibold container">
            {isOwnProfile ? 'Os meus looks' : `Looks de ${ownerFirstName}`}
          </h6>

          <div className="flex flex-col items-start pt-4 justify-between overflow-x-auto gap-y-4 gap-x-3">
            <ProfileLooks
              ownerData={ownerData}
              isOwnProfile={isOwnProfile}
              ownerFirstName={ownerFirstName}
            />
          </div>
        </div>

        {ownerData &&
          <div className="flex pb-10 flex-col items-start self-stretch container gap-4">
            <h6 className="font-semibold">Coleções de Looks</h6>
            <CollectionList collections={collectionsData} ownerId={ownerId} ownerFirstName={ownerFirstName} />

            <div className="flex h-12 w-full items-center pt-10 pb-10 rounded">

              {collectionsData && collectionsData.length >= 3 &&
                <Link href={`/profile/${ownerId}/collections`} className="profile_all-collections">
                  Ver todas as coleções
                  <ArrowForwardIosIcon />
                </Link>
              }
            </div>

          </div>
        }
      </>
    );
  }
};

export default Profile;

async function ProfileLooks({ ownerData, isOwnProfile, ownerFirstName }) {
  return (
    <>
      {ownerData.hasOwnProperty("userLooks") ? (
        <ContentSlider>
          {ownerData.userLooks.map((element) => (
            <LookCard_Profile
              slider={true}
              key={element.id}
              look={element}
              nome={ownerData.name}
              avatar={ownerData.img}
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
          {ownerFirstName} ainda não adicionou nenhum look à sua galeria
        </div>
      )}
    </>
  );
}


