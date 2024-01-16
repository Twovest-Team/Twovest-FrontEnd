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
import { redirect } from "next/navigation";
import getPortugueseDateString from "@/utils/getPortugueseDateString";
import NavigationTitle from "@/components/providers/NavigationTitle";

// Perfil dos utilizadores (do utilizador com sessão iniciada ou não)
const Profile = async ({ searchParams }) => {
  const id_user = searchParams.id;
  const sessionUser = await (await getUserByEmailServer()).id;
  var perfilProprio = false;
  if (id_user == sessionUser) {
    perfilProprio = true;
  }

  const data = await getInfoForProfilePage(id_user);

  if (data.length == 0) {
    redirect(`/profile/?id=${sessionUser}`);
  }

  const primeiroNome = data[0].name.split(" ")[0];

  const dataRegisto = getPortugueseDateString(data[0].created_at);

  return (
    <>
      <NavigationTitle
        titleText={perfilProprio ? "O meu perfil" : `Perfil de ${primeiroNome}`}
      >
        <CreateOutlinedIcon />
      </NavigationTitle>

      <div className="flex w-full flex-col justify-center items-center pt-[16px] px-[16px] gap-3">
        <ProfilePicture imageProfile={data[0].img} />
        <p className="body_semibold">{data[0].name}</p>
        <p className="text-secondary overflow-hidden truncate w-11/12 text-center">
          {data[0].email}
        </p>
        <p>Desde {dataRegisto}</p>
      </div>

      <div className="flex justify-center items-center self-stretch pt-10 px-6 pb-14 gap-4">
        <VoteCount />
      </div>

      <div className="pb-8">
        {perfilProprio ? (
          <h6 className="font-semibold container"> Os meus looks</h6>
        ) : (
          <h6 className="font-semibold container"> Looks de {primeiroNome}</h6>
        )}
        <div className="flex flex-col items-start pt-4 justify-between overflow-x-auto gap-y-4 gap-x-3">
          <LooksPerfil
            data={data}
            perfilProprio={perfilProprio}
            primeiroNome={primeiroNome}
          />
        </div>
      </div>

      <div className="flex pb-10 flex-col items-start self-stretch pr-6 gap-4 container">
        <h6 className="font-semibold">Coleção de Looks</h6>

        <ColecoesPerfil
          data={data}
          perfilProprio={perfilProprio}
          primeiroNome={primeiroNome}
        />
      </div>
    </>
  );
};

export default Profile;

async function LooksPerfil({ data, perfilProprio, primeiroNome }) {
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
      ) : perfilProprio ? (
        <div className="container font-semibold text-secondary">
          {" "}
          Ainda não adicionaste nenhum look à tua galeria
        </div>
      ) : (
        <div className="container font-semibold text-secondary">
          {" "}
          {primeiroNome} ainda não adicionou nenhum look à sua galeria
        </div>
      )}
    </>
  );
}

async function ColecoesPerfil({ data, perfilProprio, primeiroNome }) {
  return (
    <>
      {data[0].hasOwnProperty("colecoes") ? (
        data[0].onlyPrivateCollections ? (
          <div className="font-semibold text-secondary">
            {primeiroNome} apenas possui coleções privadas
          </div>
        ) : (
          <>
            <button className="profile_search-collections">
              <SearchIcon />
              Procurar coleções
            </button>
            {data[0].colecoes.map((element) => (
              <CollectionPreview
                colecao={element}
                key={element.id_collection}
                perfilProprio={perfilProprio}
                className="pb-6"
              />
            ))}
            <div className="flex h-12 w-full items-center pt-10 pb-10 rounded">
              <button className="profile_all-collections">
                Ver todas as coleções
                <ArrowForwardIosIcon />
              </button>
            </div>
          </>
        )
      ) : perfilProprio ? (
        <div className="font-semibold text-secondary">
          Ainda não criaste nenhuma coleção
        </div>
      ) : (
        <div className="font-semibold text-secondary">
          {primeiroNome} ainda não criou nenhuma coleção
        </div>
      )}
    </>
  );
}
