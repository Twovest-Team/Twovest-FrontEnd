import LookCard_Profile from "@/components/cards/LookCard_Profile";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ContentSlider from "@/components/sliders/ContentSlider";
import ProfilePicture from "@/components/profilePicture/ProfilePicture";
import React from "react";
import getPortugueseDateString from "@/utils/getPortugueseDateString";
import NavigationTitle from "@/components/providers/NavigationTitle";
import ProfileScores from "@/components/sections/ProfileScores";
import Link from "next/link";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";
import CollectionList from "@/components/collections/CollectionList";
import getUserById from "@/utils/db/getUserById";
import getCollections from "@/utils/db/collections/getCollections";
import IconButton from "@/components/buttons/icons/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import getUserFirstName from "@/utils/getUserFirstName";
import Button from "@/components/buttons/Button";

export const revalidate = 0;

// Perfil dos utilizadores (do utilizador com sessão iniciada ou não)
const Profile = async ({ params }) => {
  const ownerId = params.id;
  const currentUser = await useAuthServer();
  const isOwnProfile = currentUser ? currentUser.id == ownerId : false
  const ownerData = isOwnProfile ? currentUser : await getUserById(ownerId);
  const ownerFirstName = getUserFirstName(ownerData);
  const ownerCreatedAt = getPortugueseDateString(ownerData.created_at);
  const collectionsData = isOwnProfile
    ? currentUser.collections
    : await getCollections(ownerId, 3, 1);
  if (ownerData) {
    return (
      <>
        <NavigationTitle
          titleText={
            isOwnProfile ? "O meu perfil" : `Perfil de ${ownerFirstName}`
          }
        >
          <IconButton icon={<MoreVertIcon />} />
        </NavigationTitle>

        <div className="flex w-full flex-col justify-center items-center pt-[16px] px-[16px] gap-3">
          <ProfilePicture
            imageProfile={ownerData.img}
            userRole={ownerData.role}
          />
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
          <h1 className="font-semibold container text_h6">
            {isOwnProfile ? "Os meus looks" : `Looks de ${ownerFirstName}`}
          </h1>

          <div className="flex flex-col items-start pt-4 justify-between overflow-x-auto gap-y-4 gap-x-3">
            <ProfileLooks
              ownerData={ownerData}
              isOwnProfile={isOwnProfile}
              ownerFirstName={ownerFirstName}
            />
          </div>
        </div>

        {ownerData && (
          <div className="flex pb-10 flex-col items-start self-stretch container gap-4">
            <h2 className="font-semibold text_h6">Coleções de Looks</h2>

            <CollectionList
              collections={collectionsData}
              ownerId={ownerId}
              ownerFirstName={ownerFirstName}
            />

            <div className="flex h-12 w-full items-center pt-10 pb-10 rounded">
              {collectionsData && collectionsData.length >= 3 && (
                <Button
                  href={`/profile/${ownerId}/collections`}
                  type="black-outlined"
                  ariaLabel="Ver todas as coleções"
                  width="100%"
                  justify="space-between"
                >
                  Ver todas as coleções
                  <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
                </Button>
              )}
            </div>
          </div>
        )}
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
