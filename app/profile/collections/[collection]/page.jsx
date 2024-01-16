import getUserByEmailServer from "@/utils/db/getUserByEmailServer";
import getInfoForCollectionPage from "@/utils/db/getInfoForCollectionPage";
import NavigationTitle from "@/components/providers/NavigationTitle";
import ShareButton from "@/components/buttons/icons/ShareButton";
import Image from "next/image";
import LookCard from "@/components/cards/LookCard";
import { redirect } from "next/navigation";

// Coleção específica de um utilizador
const Collection = async ({ searchParams }) => {
  const id_collection = searchParams.id;

  const sessionUser = await (await getUserByEmailServer()).id;

  const data = await getInfoForCollectionPage(id_collection);

  if (data.length == 0) {
    redirect(`/profile?id=${sessionUser}`);
  }

  var colecaoPropria = false;
  var sessionUserIsAdmin = false;
  var accessBlocked = false;

  data[0].collectionUsers.map((element) => {
    if (element.id_user == sessionUser) {
      colecaoPropria = true;
      if (element.is_admin == true) {
        sessionUserIsAdmin = true;
      }
    }
  });

  if (data[0].privacy != 2 && colecaoPropria == false) {
    accessBlocked = true;
  }

  // Deverá ser necessário efetuar um pedido à BD "Dá os dados da collection com o id=123"
  if (accessBlocked == true) {
    return (
      <>
        <NavigationTitle titleText="Coleção Privada"></NavigationTitle>
        <p className="text-secondary container">
          Não tens acesso a esta coleção
        </p>
      </>
    );
  } else if (accessBlocked == false) {
    return (
      <>
        <NavigationTitle titleText={data[0].name}>
          {colecaoPropria ? <ShareButton /> : null}
        </NavigationTitle>
        <div className="container flex flex-row pb-10">
          <CollectionUserAvatars users={data[0].collectionUsers} />
          <div className="w-1/2 h-[30px]">
            Espaço para o botão de gerir participantes
          </div>
        </div>
        <div className="collection-looks-wrap container mb-16 grid justify-center grid-cols-2 items-center gap-4 flex-wrap max-w-[460px]">
          <CollectionLooks looks={data[0].looks} />
        </div>
      </>
    );
  }
};

export default Collection;

async function CollectionUserAvatars({ users }) {
  const totalCollectionUsers = users.length;

  if (totalCollectionUsers == 4) {
    const Utilizador1 = users[0];
    const Utilizador2 = users[1];
    const Utilizador3 = users[2];
    const Utilizador4 = users[3];

    return (
      <div className="w-1/2 relative">
        <Image
          src={Utilizador1.users.img}
          alt="Look da coleção"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          className="left-[68px] top-0 absolute rounded-full border-2 border-white"
          key={Utilizador1.id_user}
        />
        <Image
          src={Utilizador2.users.img}
          alt="Look da coleção"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          className=" left-[45px] top-0 absolute rounded-full border-2 border-white"
          key={Utilizador2.id_user}
        />
        <Image
          src={Utilizador3.users.img}
          alt="Look da coleção"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          className="left-[23px] top-0 absolute rounded-full border-2 border-white"
          key={Utilizador3.id_user}
        />
        <Image
          src={Utilizador4.users.img}
          alt="Look da coleção"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          className="left-0 top-0 absolute rounded-full border-2 border-white"
          key={Utilizador4.id_user}
        />
      </div>
    );
  } else if (totalCollectionUsers == 3) {
    const Utilizador1 = users[0];
    const Utilizador2 = users[1];
    const Utilizador3 = users[2];

    return (
      <div className="w-1/2 relative">
        <Image
          src={Utilizador1.users.img}
          alt="Look da coleção"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          className=" left-[45px] top-0 absolute rounded-full border-2 border-white"
          key={Utilizador1.id_user}
        />
        <Image
          src={Utilizador2.users.img}
          alt="Look da coleção"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          className="left-[23px] top-0 absolute rounded-full border-2 border-white"
          key={Utilizador2.id_user}
        />
        <Image
          src={Utilizador3.users.img}
          alt="Look da coleção"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          className="left-0 top-0 absolute rounded-full border-2 border-white"
          key={Utilizador3.id_user}
        />
      </div>
    );
  } else if (totalCollectionUsers == 2) {
    const Utilizador1 = users[0];
    const Utilizador2 = users[1];

    return (
      <div className="w-1/2 relative">
        <Image
          src={Utilizador1.users.img}
          alt="Look da coleção"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          className="left-[23px] top-0 absolute rounded-full border-2 border-white"
          key={Utilizador1.id_user}
        />
        <Image
          src={Utilizador2.users.img}
          alt="Look da coleção"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          className="left-0 top-0 absolute rounded-full border-2 border-white"
          key={Utilizador2.id_user}
        />
      </div>
    );
  } else {
    const Utilizador1 = users[0];
    return (
      <div className="w-1/2 relative">
        <Image
          src={Utilizador1.users.img}
          alt="Look da coleção"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          className="left-0 top-0 absolute rounded-full border-2 border-white"
          key={Utilizador1.id_user}
        />
      </div>
    );
  }
}

async function CollectionLooks({ looks }) {
  return looks.map((element) => (
    <LookCard
      slider={true}
      key={element.id_look}
      looks={element.looks}
      nome={element.userLook[0].name}
      avatar={element.userLook[0].img}
    />
  ));
}
