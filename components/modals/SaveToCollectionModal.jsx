'use client'

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect, useState } from 'react';
import getUserCollections from '@/utils/db/collections/getUserCollections';
import { toggleLookModalToggle } from '@/redux/slices/saveLookModalToggle';
import saveLookToCollection from '@/utils/db/collections/saveLookToCollection';
import LoadingIcon from '../buttons/icons/LoadingIcon';
import CheckIcon from '@mui/icons-material/Check';
import { useRouter } from 'next/navigation';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import deleteLookFromCollection from '@/utils/db/collections/deleteLookFromCollection';

const SaveToCollectionModal = ({ lookId }) => {

    const dispatch = useAppDispatch()
    const currentUser = useAppSelector((state) => state.user.data);
    const [collections, setCollections] = useState()
    const router = useRouter()

    const isModalOpen = useAppSelector(state => state.lookModalToggle.isOpen)

    let allModalStatus = [
        {
            id: 0,
            name: 'Guardar na coleção'
        },
        {
            id: 1,
            name: 'Criar nova coleção'
        }
    ]

    const [modalStatus, setModalStatus] = useState(allModalStatus[0])

    async function getData() {
        const userCollections = await getUserCollections(currentUser.id)
        if (userCollections) {
            setCollections(userCollections)
        }

    }


    useEffect(() => {
        if (currentUser && !collections) {
            getData()
        }

    }, [currentUser, collections])

    function handleCloseModal() {
        setModalStatus(allModalStatus[0])
        dispatch(toggleLookModalToggle())
        router.refresh()
    }


    if (isModalOpen) {
        return (
            <>
                <section className="bg-dark max-w-[460px] bg-opacity-50 fixed top-0 right-0 left-0 w-full h-[100vh] z-50 mx-auto">
                </section>

                <div className="max-w-[460px] fixed bottom-0 pb-20 pt-6 right-0 left-0 mx-auto bg-white w-full z-50 container flex flex-col">
                    <CloseIcon onClick={handleCloseModal} className="cursor-pointer self-end mb-5" />

                    <div className='flex flex-col gap-4'>
                        {modalStatus.id === 0 &&
                            <CollectionChoosing
                                collections={collections}
                                getData={getData}
                                allModalStatus={allModalStatus}
                                setModalStatus={setModalStatus}
                                lookId={lookId}
                            />
                        }


                        {modalStatus.id === 1 &&
                            <ToCreate />
                        }

                    </div>


                </div>
            </>


        )
    }

}



const CollectionChoosing = ({ collections, getData, allModalStatus, setModalStatus, lookId }) => {

    return (
        <>
            <h6 className="font-semibold mb-2">Guardar o look</h6>


            <button className='bg-dark w-full py-4 font-semibold px-6 flex justify-between items-center text-white rounded'>
                Criar nova coleção
                <AddIcon />
            </button>

            <div className="relative w-full">
                <input className="pl-14 w-full h-[56px] border border-grey rounded" placeholder="Pesquisa" type="text" />
                <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 pointer-events-none" />
            </div>

            <div className='flex flex-col gap-4'>
                {collections && collections.map(collection => (
                    <CollectionButton getData={getData} key={collection.collections.id} collection={collection} lookId={lookId} />

                ))}

            </div>



        </>
    )
}

const CollectionButton = ({ collection, lookId, getData }) => {

    const [saveStatus, setSaveStatus] = useState('default')
    lookId = parseInt(lookId)


    async function handleCollectionClick(collectionId) {
        setSaveStatus('loading')
        await saveLookToCollection(collectionId, lookId)
        setSaveStatus('saved')

        getData()
    }

    async function handleDeleteLookFromCollection(e, collectionId) {
        e.stopPropagation()
        setSaveStatus('loading')
        await deleteLookFromCollection(collectionId, lookId)
        setSaveStatus('default')
        getData()
    }



    useEffect(() => {
        const looksIdsArray = (collection.looks.map(look => look.id_look)).flat();

        if (looksIdsArray.includes(lookId)) {
            setSaveStatus('saved')
        }
    }, [])


    return (
        <button
            disabled={saveStatus === 'loading' ? true : false}
            onClick={() => handleCollectionClick(collection.collections.id)}
            className='w-full min-w-0 flex items-center justify-between border-2 rounded border-black px-6 h-[60px] font-semibold'>
            {saveStatus === 'loading' ?
                <p className='text-center w-full scale-[50%]'>
                    <LoadingIcon />
                </p>
                :

                saveStatus === 'default' ?
                    <>
                        <span className='flex items-center gap-3 truncate'>
                            {/* id: {collection.collections.id} {collection.collections.name} (Priv: {collection.collections.privacy}) */}
                            {collection.collections.name}
                        </span>
                        <AddIcon />
                    </>

                    :

                    saveStatus === 'saved' &&
                    <div className='text-center w-full flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <span className='truncate'>{collection.collections.name}</span>
                            {/* <CheckIcon className='text-primary_main' /> */}
                        </div>
                        <DeleteOutlineIcon onClick={e => handleDeleteLookFromCollection(e, collection.collections.id)} className='cursor-pointer' />
                    </div>

            }



        </button>
    )
}

const ToCreate = () => {
}




export default SaveToCollectionModal