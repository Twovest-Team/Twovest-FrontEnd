import getPortugueseDateString from "@/utils/getPortugueseDateString";
import ProfileScores from "@/components/sections/ProfileScores";
import Link from "next/link";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";
import CollectionList from "@/components/collections/CollectionList";
import getUserById from "@/utils/db/getUserById";
import IconButton from "@/components/buttons/icons/IconButton";
import getUserFirstName from "@/utils/getUserFirstName";
import Button from "@/components/buttons/Button";
import LookCard from "@/components/cards/LookCard";
import GridBox from "@/components/providers/GridBox";
import LooksSkeleton from "@/components/loaders/Looks";
import SegmentIcon from '@mui/icons-material/Segment';
import ProfileBanner from "@/components/items/ProfileBanner";
import Avatar from "@/components/user/Avatar";

export const revalidate = 0;

const Profile = async ({ params, searchParams }) => {
  const ownerId = params.id;
  const selectedOption = searchParams.option || 'coleções'
  const currentUser = await useAuthServer();
  const isOwnProfile = currentUser ? currentUser.id == ownerId : false
  const ownerData = isOwnProfile ? currentUser : await getUserById(ownerId);
  const ownerFirstName = getUserFirstName(ownerData);
  const ownerCreatedAt = getPortugueseDateString(ownerData.created_at);

  const collectionsData = ownerData.collections


  const renderOptionsTabs = () => {

    const tabs = ['looks', 'coleções'];
    return (
      <section className='container flex flex-col gap-8 mt-3 mb-6'>
        <div>

          <ul class="flex items-center">

            <li class="h-9 grow border-b border-main-400">
            </li>

            {tabs.map((item, index) => (
              <li key={index} className={`${(index + 1) < tabs.length ? 'pr-8' : ''} border-b`}>
                <Link
                  href={`?option=${item}`}
                  className={`h-9 flex ${selectedOption === item ? ' border-b-2 border-black' : ''} font-semibold capitalize`}>
                  {item}
                </Link>
              </li>
            ))}

            <li class="md:hidden h-9 grow border-b border-main-400">
            </li>

          </ul>
        </div>
      </section>
    )

  }

  const renderLooks = () => (
    <div className="flex flex-col gap-6 h-full min-h-[50vh] pb-6">
      {isOwnProfile &&
        <div className="container flex items-center justify-between h-12">
          <Button href="/gallery/submit" className="text-caption" padding="0 20px" height="2.8rem" type="black" ariaLabel='Submeter novo look'>
            Submeter novo look
          </Button>

          <div className="w-full flex justify-end">
            <IconButton icon={<SegmentIcon />} />
          </div>
        </div>
      }

      <ProfileLooks
        ownerData={ownerData}
        isOwnProfile={isOwnProfile}
        ownerFirstName={ownerFirstName}
      />
    </div>
  )

  const renderCollections = () => (
    <div className="flex pb-6 flex-col items-start self-stretch container gap-4 h-full min-h-[50vh]">
      <CollectionList
        showOptions={true}
        collections={collectionsData}
        ownerId={ownerId}
        ownerFirstName={ownerFirstName}
        isOwner={isOwnProfile}
      />
    </div>
  )

  if (ownerData) {
    return (
      <main className="relative">

        <ProfileBanner isOwnProfile={isOwnProfile} ownerFirstName={ownerFirstName} />

        <div className="flex justify-center md:justify-start absolute top-28 md:top-[123px] container mx-auto left-0 right-0">
            <Avatar user={ownerData} size='profile' noLink={true} />
        </div>

        <section className="container md:absolute mb-5 md:mb-0 mx-auto left-0 flex-col md:flex-row flex-wrap right-0 md:pl-[180px] md:top-[178px] flex justify-between items-center gap-5">

          <div className="flex flex-col items-center md:items-start">
            <h5 className="text-h5 font-semibold">{ownerData.name}</h5>
            <p className="text-secondary">Desde {ownerCreatedAt}</p>
          </div>

          {isOwnProfile ?
            <div className="flex gap-3">
              <Button href={`/profile/${currentUser.id}/options`} className="text-caption" padding="0 20px" height="2.8rem" type="black" ariaLabel='Editar Perfil'>
                Editar Perfil
              </Button>

              <Button href={`/profile/${currentUser.id}/options`} className="text-caption border-grey_opacity_50 border-2" padding="0 20px" height="2.8rem" type='white' ariaLabel='Definições de conta'>
                Definições
              </Button>
            </div>
            :
            <Button className="text-caption border-grey_opacity_50 border-2" padding="0 20px" height="2.8rem" type='white' ariaLabel='Reportar utilizador'>
              Reportar utilizador
            </Button>
          }

        </section>

        <div className="flex container justify-center md:justify-start mb-10 md:mb-0">
          <ProfileScores />
        </div>

        {renderOptionsTabs()}

        {selectedOption === 'looks' && renderLooks()}
        {selectedOption === 'coleções' && renderCollections()}


      </main>
    );
  }

};

export default Profile;

async function ProfileLooks({ ownerData, isOwnProfile, ownerFirstName }) {
  return (
    <>
      {ownerData.looks.length > 0 &&
        <GridBox loader={<LooksSkeleton />}>
          {ownerData.looks.map((element) => (
            <LookCard key={element.id} look={element} slider={false} />
          ))}
        </GridBox>
      }

      {ownerData.looks.length === 0 && (
        <li className="text-secondary container w-full flex justify-center items-center h-full flex-col gap-5 flex-grow">

          {isOwnProfile && <p className="text-center">Ainda não submeteste nenhum look.</p>}

          {!isOwnProfile && ownerFirstName && (<p className="text-center">{ownerFirstName} não tem looks disponíveis.</p>)}

          {/* TODO -> HAVE DYNAMIC GENDER IN BUTTON HREF */}
          <Button href="/gallery/women" className="text-caption" padding="0 20px" height="2.8rem" type="black-outlined" ariaLabel='Procurar inspiração na galeria'>
            {'Procurar inspiração na galeria ->'}
          </Button>
        </li>
      )}
    </>
  );
}
