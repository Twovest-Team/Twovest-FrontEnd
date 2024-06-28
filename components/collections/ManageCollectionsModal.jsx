'use client'

import Modal from "../modals/Modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeModal } from "@/redux/slices/modalSlice";
import { useEffect, useState } from "react";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import useAuth from "@/hooks/client-hooks/useAuth";
import getCollections from "@/utils/db/collections/getCollections";
import CollectionList from "./CollectionList";
import { handleCreateCollection } from "@/utils/handlers/handleCollections";
import { usePathname, useSearchParams } from "next/navigation";
import Button from "../buttons/Button";
import { useRouter } from "next/navigation";
import addToCollection from "@/utils/db/collections/addToCollection";



const ManageCollectionModal = () => {

  const isModalOpen = useAppSelector(state => state.modals['createCollection']);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const currentUser = useAuth();

  // LookId from url "save" param
  const [lookId, setLookId] = useState(searchParams.get('save'))

  // Collection name state
  const [nameState, setNameState] = useState('')

  // Privacy value state
  const [privacyValue, setPrivacyValue] = useState(1)

  // All collections from user needed when saving a new look
  const collectionsData = currentUser?.collections

  // Form section state
  const [currentSection, setCurrentSection] = useState(0)

  // Reset form section depending on url params
  useEffect(() => {
    const param = searchParams.get('save')
    if (param) {
      setLookId(param)
    }
    setCurrentSection(param && currentUser && collectionsData.length > 0 ? 0 : 1)
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

    const createdCollectionId = await handleCreateCollection(currentUser.id, nameState, privacyValue)

    if (lookId && createdCollectionId) {
      const isLookSaved = await addToCollection(createdCollectionId, lookId, currentUser.id)
      setCurrentSection(currentSection + 1)
    } else if (createdCollectionId) {
      setCurrentSection(currentSection + 1)
    }


  }

  function onCloseModal() {
    setTimeout(() => {
      setNameState('')
      setPrivacyValue(1)
      setCurrentSection(lookId && currentUser && collectionsData.length > 0 ? 0 : 1)
    }, 1000)
    router.push(pathname, { scroll: false })
    router.refresh()
  }

  return (
    <Modal onClose={onCloseModal} id='createCollection' goBackFn={(currentSection != 0 && lookId && collectionsData?.length > 0) && currentSection != 3 && previousSection}>

      {currentSection === 0 && lookId && currentUser && collectionsData.length > 0 &&
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
          privacyValue={privacyValue}
          setPrivacyValue={setPrivacyValue}
          submitNewCollection={submitNewCollection}
        />
      }

      {currentSection === 3 &&
        <FeedbackSection
          lookId={lookId}
          dispatch={dispatch}
          pathname={pathname}
          router={router}
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
        <h1 className="font-semibold text-h6">Guardar look</h1>
        <p className="text-secondary">Em que coleção vais querer guardar este look?</p>
      </div>

      {collectionsData &&
        <div className="max-h-[220px] average:max-h-[345px] tall:max-h-[470px] overflow-y-auto">
          <CollectionList
            lookId={lookId}
            collections={collections}
            ownerId={ownerId}
            isOwner={true}
          />
        </div>
      }

      <Button onClick={nextSection} type={'black'} ariaLabel='Criar nova coleção' width='100%'>
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
        <h1 className="font-semibold text-h6">Criar nova coleção</h1>
        <p className="text-secondary">
          {lookId ? 'Dá um nome à nova coleção onde vais guardar o look.' : 'Que nome queres dar a esta nova coleção?'}
        </p>
      </div>


      <input
        className="border border-grey h-14 px-6 rounded outline-none focus:border-black"
        value={nameState}
        onChange={e => handleInputValue(e)}
        placeholder="Nome da coleção" />
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

const PrivacySection = ({ privacyValue, setPrivacyValue, submitNewCollection }) => {

  async function handlePrivacyChange(e) {
    let value = e.currentTarget.value
    setPrivacyValue(value)
  }

  return (
    <>
      <div>
        <h1 className="font-semibold text-h6">Gerir privacidade da coleção</h1>
        <p className="text-secondary">Decide quem tem acesso a esta coleção.</p>
      </div>

      <fieldset className="flex flex-col sm:flex-row gap-4">

        <input className="invisible absolute" onClick={e => handlePrivacyChange(e)} type="radio" id="public" name="privacy" value={2} />
        <label className={`${privacyValue == 2 ? 'bg-primary_light bg-opacity-50 border-primary_main' : 'border-grey'} w-full py-3 px-3 border rounded cursor-pointer font-medium mb-0.5`} for="public">
          Pública
          <p className='text-secondary text-caption font-normal'>Todas as pessoas podem ver a tua coleção.</p>
        </label>


        <input className="invisible absolute" onClick={e => handlePrivacyChange(e)} type="radio" id="private" name="privacy" value={1} defaultChecked />
        <label className={`${privacyValue == 1 ? 'bg-primary_light bg-opacity-50 border-primary_main' : 'border-grey'} w-full py-3 px-3 border rounded cursor-pointer font-medium mb-0.5`} for="private">
          Privada
          <p className='text-secondary text-caption font-normal'>Apenas tu e pessoas que fazem parte da tua coleção.</p>
        </label>

      </fieldset>

      <button
        onClick={submitNewCollection}
        className={`bg-dark w-full text-white font-semibold px-9 py-3.5 rounded`}>
        Criar coleção
      </button>
    </>



  )
}

const FeedbackSection = ({ lookId, dispatch, router, pathname }) => {
  const handleClick = () => {
    router.push(pathname, { scroll: false })
    router.refresh()
    dispatch(closeModal('createCollection'))
  }

  return (
    <>
      <div className="w-full text-center flex flex-col items-center">
        <div className="flex justify-center items-center border-2 rounded-full aspect-square border-primary_main w-16 h-16">
          <CheckOutlinedIcon sx={{ fontSize: 40 }} className="text-primary_main" />
        </div>
        <h1 className="font-semibold mt-4 text-h6">
          {lookId ? 'Look guardado na coleção.' : 'Coleção criada.'}
        </h1>
        <p className="text-secondary max-w-[270px] mt-2">
          {lookId ? 'Look guardado na tua nova coleção' : 'Agora podes começar a guardar looks na tua nova coleção.'}
        </p>
      </div>

      <button
        onClick={handleClick}
        className={`bg-dark w-full text-white font-semibold px-9 py-3.5 rounded`}>
        Concluir
      </button>

    </>

  )
}

export default ManageCollectionModal