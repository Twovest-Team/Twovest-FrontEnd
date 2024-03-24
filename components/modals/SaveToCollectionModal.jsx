"use client";

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect, useState } from 'react';
import getCollections from '@/utils/db/collections/getCollections';
import { toggleLookModalToggle } from '@/redux/slices/saveLookModalToggle';
import addToCollection from '@/utils/db/collections/addToCollection';
import LoadingIcon from '../buttons/icons/LoadingIcon';
import CheckIcon from '@mui/icons-material/Check';
import { redirect, usePathname, useRouter } from 'next/navigation';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import deleteCollectionLook from '@/utils/db/collections/deleteCollectionLook';
import { RadioGroup } from '@headlessui/react'
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import createCollection from '@/utils/db/collections/createCollection';
import useAuth from "@/hooks/client-hooks/useAuth";


const SaveToCollectionModal = ({ lookId }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const currentUser = useAuth();
  const [collections, setCollections] = useState();
  const router = useRouter();
  const isModalOpen = useAppSelector((state) => state.lookModalToggle.isOpen);

  let allModalStatus = [
    {
      id: 0,
      name: "Guardar na coleção",
    },
    {
      id: 1,
      name: "Criar nova coleção",
    },
  ];

  const [modalStatus, setModalStatus] = useState(allModalStatus[0]);

    async function getData() {
        const userCollections = await getCollections(currentUser.id)
        if (userCollections) {
            setCollections(userCollections)
        } else {
            setModalStatus(allModalStatus[1])
        }
    }

    function handleCloseModal() {
        setModalStatus(allModalStatus[0])
        dispatch(toggleLookModalToggle())
        router.refresh()
    }

  useEffect(() => {
    if (currentUser && !collections) {
      getData();
    }
  }, [currentUser, collections]);

  if (isModalOpen) {
    return (
      <>
        <section className="bg-dark max-w-[460px] bg-opacity-50 fixed top-0 right-0 left-0 w-full h-[100vh] z-50 mx-auto"></section>

        <div className="text-dark max-w-[460px] max-h-[80%] fixed bottom-0 pb-20 pt-6 right-0 left-0 mx-auto bg-white w-full z-50 container flex flex-col">
          <CloseIcon
            onClick={handleCloseModal}
            className="cursor-pointer self-end mb-5"
          />

          <div className="flex flex-col gap-4  scroll_bar-invisible ">
            {modalStatus.id === 0 && (
              <CollectionChoosing
                collections={collections}
                getData={getData}
                allModalStatus={allModalStatus}
                setModalStatus={setModalStatus}
                lookId={lookId}
              />
            )}

            {modalStatus.id === 1 && (
              <ToCreate
                userHasAnyCollection={collections ? true : false}
                allModalStatus={allModalStatus}
                setModalStatus={setModalStatus}
                lookId={lookId}
                userId={currentUser.id}
                handleCloseModal={handleCloseModal}
              />
            )}
          </div>
        </div>
      </>
    );
  }
};

const CollectionChoosing = ({
  collections,
  getData,
  allModalStatus,
  setModalStatus,
  lookId,
}) => {
  return (
    <>
      <h6 className="font-semibold mb-2">Guardar o look</h6>

      <button
        onClick={() => setModalStatus(allModalStatus[1])}
        className="bg-dark w-full py-4 font-semibold px-6 flex justify-between items-center text-white rounded"
      >
        Criar nova coleção
        <AddIcon />
      </button>

      <div className="relative w-full">
        <input
          className="pl-14 w-full h-[56px] border border-grey rounded"
          placeholder="Pesquisa"
          type="text"
        />
        <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 pointer-events-none" />
      </div>

      <div className="flex flex-col gap-4">
        {collections &&
          collections.map((collection) => (
            <CollectionButton
              getData={getData}
              key={collection.collections.id}
              collection={collection}
              lookId={lookId}
            />
          ))}
      </div>
    </>
  );
};

const CollectionButton = ({ collection, lookId, getData }) => {
  const [saveStatus, setSaveStatus] = useState("default");
  lookId = parseInt(lookId);

  async function handleCollectionClick(collectionId) {
    setSaveStatus("loading");
    if (saveStatus === "default") {
      handleaddToCollection(collectionId);
    } else if (saveStatus === "saved") {
      handledeleteCollectionLook(collectionId);
    }
  }

  async function handleaddToCollection(collectionId) {
    await addToCollection(collectionId, lookId);
    setSaveStatus("saved");
    getData();
  }

  async function handledeleteCollectionLook(collectionId) {
    await deleteCollectionLook(collectionId, lookId);
    setSaveStatus("default");
    getData();
  }

  useEffect(() => {
    const looksIdsArray = collection.looks.map((look) => look.id_look).flat();

    if (looksIdsArray.includes(lookId)) {
      setSaveStatus("saved");
    }
  }, []);

  return (
    <button
      disabled={saveStatus === "loading" ? true : false}
      onClick={() => handleCollectionClick(collection.collections.id)}
      className={` ${
        saveStatus === "loading" && "opacity-20 pointer-events-none"
      }  transition-opacity duration-75 w-full min-w-0 flex items-center justify-between border-2 rounded border-black px-6 h-[60px] font-semibold`}
    >
      <div className="text-center w-full flex justify-between">
        <div className="flex items-center gap-2 truncate">
          {collection.collections.privacy === 1 && (
            <HttpsOutlinedIcon sx={{ fontSize: 20 }} />
          )}
          {collection.collections.privacy === 2 && (
            <PublicOutlinedIcon sx={{ fontSize: 20 }} />
          )}
          {collection.collections.privacy === 3 && (
            <GroupAddOutlinedIcon sx={{ fontSize: 20 }} />
          )}

          <span className="truncate">{collection.collections.name}</span>
        </div>

        {saveStatus === "loading" && (
          <p className="text-right w-full">
            <LoadingIcon />
          </p>
        )}

        {saveStatus === "default" && (
          <div className=" rounded-full flex justify-center items-center  p-1">
            <AddIcon sx={{ fontSize: 20 }} />
          </div>
        )}

        {saveStatus === "saved" && (
          <div className="border-2 rounded-full flex justify-center items-center border-primary_main p-1 bg-primary_main text-white">
            <CheckIcon sx={{ fontSize: 18 }} className="cursor-pointer" />
          </div>
        )}
      </div>
    </button>
  );
};

const ToCreate = ({
  userHasAnyCollection,
  allModalStatus,
  setModalStatus,
  lookId,
  userId,
  handleCloseModal,
}) => {
  const [name, setName] = useState("");
  let [privacy, setPrivacy] = useState(1);
  const [loading, setLoading] = useState(false);

  function handleCreateCollection(e) {
    e.preventDefault();

    async function createCollectionAndSaveLook() {
      setLoading(true);
      let data = await createCollection(name, privacy, lookId, userId, true);

            if (data) {
                handleCloseModal()
                setLoading(false)
            }
        }

    if (!loading) {
      createCollectionAndSaveLook();
    }
  }

  return (
    <form
      onSubmit={(e) => handleCreateCollection(e)}
      className="flex flex-col gap-6"
    >
      <div className="container shadow-lg rounded py-6 border border-grey flex flex-col gap-4">
        <div>
          <h6 className="font-semibold">
            {name.trim().length === 0 ? "Nova coleção" : name}
          </h6>
          <p className="text-secondary caption">
            {!userHasAnyCollection
              ? "Cria a tua primeira coleção e começar a guardar looks!"
              : "Qual vai ser o nome da tua próxima coleção?"}
          </p>
        </div>

        <input
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          name="name"
          id="name"
          placeholder="Nome da coleção"
          className="border border-grey rounded px-6 py-4 w-full"
        />
      </div>

      <RadioGroup
        className="flex flex-col gap-4"
        value={privacy}
        onChange={setPrivacy}
      >
        <RadioGroup.Option value={1}>
          {({ checked }) => (
            <div
              className={`cursor-pointer font-semibold flex items-center gap-5 border-2 px-5 py-4 rounded ${
                checked ? "bg-grey_opacity_50 border-black" : "border-grey"
              }`}
            >
              <HttpsOutlinedIcon sx={{ fontSize: 28 }} />
              <div className="flex flex-col justify-center">
                <p>Privada</p>
                <p className="text-secondary font-normal caption">
                  Esta coleção ficaria visível só para ti.
                </p>
              </div>
            </div>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value={2}>
          {({ checked }) => (
            <div
              className={`cursor-pointer font-semibold flex items-center gap-5 border-2 px-5 py-4 rounded ${
                checked ? "bg-grey_opacity_50 border-black" : "border-grey"
              }`}
            >
              <PublicOutlinedIcon sx={{ fontSize: 28 }} />
              <div className="flex flex-col justify-center">
                <p>Pública</p>
                <p className="text-secondary font-normal caption">
                  Qualquer pessoa que visite o teu perfil.
                </p>
              </div>
            </div>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value={3} disabled={true}>
          {({ checked }) => (
            <>
              <div
                className={`cursor-pointer opacity-40 font-semibold flex items-center gap-5 border-2 px-5 py-4 rounded-t ${
                  checked ? "bg-grey_o border-blackpacitborder-greyy_50" : ""
                }`}
              >
                <GroupAddOutlinedIcon sx={{ fontSize: 28 }} />
                <div className="flex flex-col justify-center">
                  <p>Partilhada</p>
                  <p className="text-secondary font-normal caption">
                    Partilhar esta coleção com até +4 pessoas.
                  </p>
                </div>
              </div>

              <div className="bg-primary_main rounded-b text-white text-center py-1.5 font-semibold caption">
                Em breve
              </div>
            </>
          )}
        </RadioGroup.Option>
      </RadioGroup>

      <button className="bg-dark block text-center text-white h-[60px] font-semibold rounded">
        {!loading ? (
          "Criar coleção e guardar look"
        ) : (
          <p className="text-center w-full scale-[50%]">
            <LoadingIcon size={35} />
          </p>
        )}
      </button>

      <button
        onClick={() => setModalStatus(allModalStatus[0])}
        className="text-error_main underline underline-offset-2 font-semibold"
      >
        Cancelar
      </button>
    </form>
  );
};

export default SaveToCollectionModal;
