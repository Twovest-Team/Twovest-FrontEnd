'use client'

import Modal from "../modals/Modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeModal } from "@/redux/slices/modalSlice";
import { useEffect, useState } from "react";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import useAuth from "@/hooks/client-hooks/useAuth";
import getCollections from "@/utils/db/collections/getCollections";
import CollectionList from "./CollectionList";
import { handleCreateCollection } from "@/utils/handleCollections";
import { usePathname, useSearchParams } from "next/navigation";
import Button from "../buttons/Button";
import { useRouter } from "next/navigation";



const ManageCollectionModal = () => {

  const isModalOpen = useAppSelector(state => state.modals['createCollection']);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { currentUser } = useAuth();

  // LookId from url "save" param
  const [lookId, setLookId] = useState(searchParams.get('save'))

  // Collection name state
  const [nameState, setNameState] = useState('')

  // Privacy value state
  const [privacyValue, setPrivacyValue] = useState(1)

  // Form section state
  const [currentSection, setCurrentSection] = useState(lookId ? 0 : 1)

  // All collections from user needed when saving a new look
  const [collectionsData, setCollectionsData] = useState()

  // Get collections data everytime there is a look id
  useEffect(() => {
    async function getData() {
      const data = await getCollections({ ownerId: currentUser.id });
      if (data) setCollectionsData(data)
    }

    if (lookId && currentUser) getData()
  }, [currentUser, lookId])

  // Reset form section depending on url params
  useEffect(() => {
    const saveParam = searchParams.get('save')
    setLookId(saveParam)
    setCurrentSection(saveParam ? 0 : 1)
  }, [searchParams, pathname])

  // Go to modal next section
  function nextSection() {
    setCurrentSection(currentSection + 1)
  }

  // Go to modal previous section
  function previousSection() {
    if (currentSection != 0 && currentSection != 3) setCurrentSection(currentSection - 1)
  }

  // Function to create a new collection in the db
  async function submitNewCollection() {
    if (!nameState && !privacyValue && !currentUser) return null
    const isCollectionCreated = await handleCreateCollection(currentUser.id, nameState, privacyValue)
    if (isCollectionCreated) setCurrentSection(currentSection + 1)
  }

  // Reset the state when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      setTimeout(() => {
        setNameState('')
        setPrivacyValue(1)
        setCurrentSection(lookId ? 0 : 1)
      }, 1000)
    }

  }, [isModalOpen])

  function onCloseModal(){
    router.push(pathname, {scroll: false})
  }

  return (
    <Modal onClose={onCloseModal} id='createCollection' goBackFn={(currentSection != 0 && lookId) && currentSection != 3 && previousSection}>

      {currentSection === 0 && lookId && currentUser && collectionsData &&
        <SaveLookSection
          currentUser={currentUser}
          collectionsData={collectionsData}
          lookId={lookId}
          nextSection={nextSection}
        />
      }

      {currentSection === 1 &&
        <NamingSection
          lookId={lookId}
          nameState={nameState}
          setNameState={setNameState}
          nextSection={nextSection}
        />
      }

      {currentSection === 2 &&
        <PrivacySection
          setPrivacyValue={setPrivacyValue}
          submitNewCollection={submitNewCollection}
        />
      }

      {currentSection === 3 &&
        <FeedbackSection
          lookId={lookId}
          dispatch={dispatch}
        />
      }

    </Modal>
  )
}

const SaveLookSection = ({ currentUser, collectionsData, lookId, ownerId, nextSection }) => {

  let { collections } = currentUser;

  return (
    <>
      <div>
        <h1 className="font-semibold text_h6">Guardar look {lookId}</h1>
        <p className="text-secondary">Em que coleção vais querer guardar este look?</p>
      </div>

      {collectionsData &&
        <div className="max-h-[345px] overflow-y-auto">
          <CollectionList
            toSaveLook
            lookId={lookId}
            collections={collections}
            ownerId={ownerId}
            isOwner={true}
          />
        </div>
      }

      <Button onClick={nextSection} type={'black'} ariaLabel='Criar nova coleção' width='full'>
        Criar nova coleção
      </Button>

    </>
  )
}

const NamingSection = ({ lookId, nameState, setNameState, nextSection }) => {

  let [isValid, setIsValid] = useState(nameState ? true : false)

  function handleInputValue(e) {
    const value = e.currentTarget.value;
    setNameState(value);
    setIsValid(value.trim().length > 0);
  }

  return (
    <>
      <div>
        <h1 className="font-semibold text_h6">Criar nova coleção</h1>
        <p className="text-secondary">
          {lookId ? 'Dá um nome à nova coleção onde vais guardar o look.' : 'Que nome queres dar a esta nova coleção?'}
        </p>
      </div>


      <input className="border" value={nameState} onChange={e => handleInputValue(e)} placeholder="Nome da coleção"></input>
      <button
        disabled={!isValid}
        onClick={nextSection}
        className={
          `bg-dark w-full text-white font-semibold px-9 py-3.5 rounded ${!isValid && 'opacity-30 cursor-not-allowed'}`} >
        Guardar nome
      </button>
    </>

  )
}

const PrivacySection = ({ setPrivacyValue, submitNewCollection }) => {

  async function handlePrivacyChange(e) {
    let value = e.currentTarget.value
    setPrivacyValue(value)
  }

  return (
    <>
      <div>
        <h1 className="font-semibold text_h6">Gerir privacidade da coleção</h1>
        <p className="text-secondary">Decide quem tem acesso a esta coleção.</p>
      </div>

      <fieldset>
        <div>
          <input onClick={e => handlePrivacyChange(e)} type="radio" id="private" name="privacy" value={1} defaultChecked />
          <label for="private">Privada</label>
        </div>

        <div>
          <input onClick={e => handlePrivacyChange(e)} type="radio" id="public" name="privacy" value={2} />
          <label for="public">Pública</label>
        </div>
      </fieldset>

      <button
        onClick={submitNewCollection}
        className={`bg-dark w-full text-white font-semibold px-9 py-3.5 rounded`}>
        Criar coleção
      </button>
    </>



  )
}

const FeedbackSection = ({ lookId, dispatch }) => {
  return (
    <>
      <div className="w-full text-center flex flex-col items-center">
        <div className="flex justify-center items-center border-2 rounded-full aspect-square border-primary_main w-16 h-16">
          <CheckOutlinedIcon sx={{ fontSize: 40 }} className="text-primary_main" />
        </div>
        <h1 className="font-semibold mt-4 text_h6">
          {lookId ? 'Look guardado na coleção.' : 'Coleção criada.'}
        </h1>
        <p className="text-secondary max-w-[270px] mt-2">
          {lookId ? 'Look guardado na tua nova coleção' : 'Agora podes começar a guardar looks na tua nova coleção.'}
        </p>
      </div>

      <button
        onClick={() => dispatch(closeModal('createCollection'))}
        className={`bg-dark w-full text-white font-semibold px-9 py-3.5 rounded`}>
        Concluir
      </button>

    </>

  )
}

export default ManageCollectionModal