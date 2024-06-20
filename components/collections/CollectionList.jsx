'use client'

import CollectionPreview from "./CollectionPreview";
import SearchIcon from "@mui/icons-material/Search";
import SegmentIcon from '@mui/icons-material/Segment';
import Button from "../buttons/Button";
import IconButton from "../buttons/icons/IconButton";
import CreateCollectionButton from "./CreateCollectionButton";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const CollectionList = ({
  collections,
  ownerId,
  search,
  isOwner,
  lookId, // Pass the look id if a look is to be saved
  ownerFirstName,
}) => {

  const [searchState, setSearchState] = useState('')
  const [collectionsState, setCollectionsState] = useState(collections)

  const handleSearch = () => {
    const filteredCollections = collections.filter(collection =>
      collection.name.toLowerCase().includes(searchState.toLowerCase().trim())
    );

    setCollectionsState(filteredCollections);
  };

  useEffect(() => {
    handleSearch()
  }, [searchState])

  return (
    <>

      {/* IF THERE ARE ANY COLLECTIONS */}

      <ul className="flex flex-col items-start self-stretch gap-6 flex-grow ">
        {search && (

          <div className="flex gap-3 w-full items-center h-12">

            {isOwner &&
              <div className="hidden md:block">
                <CreateCollectionButton isAdmin={isOwner} type='button' />
              </div>
            }


            <div className="w-full md:max-w-[400px]">

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <SearchIcon className="text-secondary mt-0.5" sx={{ fontSize: 19 }} />
                </div>

                <input
                  onChange={e => (setSearchState(e.currentTarget.value))}
                  type="text"
                  value={searchState}
                  placeholder="Pesquisar coleções"
                  className="pl-12 pr-10 py-3 h-[2.8rem] w-full caption rounded border border-grey focus:outline-none focus:border-black"
                />

                {searchState.trim().length > 0 &&
                  <button onClick={() => setSearchState('')} className="absolute z-10 inset-y-0 right-0 pr-5 flex items-center">
                    <CloseIcon className="text-secondary mt-0.5" sx={{ fontSize: 19 }} />
                  </button>
                }

              </div>

            </div>

            <div className="md:w-full flex gap-3 justify-end">
              <div className="md:hidden">
                <CreateCollectionButton isAdmin={isOwner} />
              </div>
              <IconButton icon={<SegmentIcon />} />
            </div>

          </div>
        )}

        {collectionsState?.length > 0 && collectionsState.map(collection => (
          <li key={collection.id_collection} className="w-full">
            <CollectionPreview
              lookId={lookId}
              userId={ownerId}
              collection={collection}
              key={collection.id_collection}
            />
          </li>
        ))}

        {searchState.trim().length > 0 && collectionsState.length === 0 && <p>Sem resultados para pesquisa.</p>}

        {!lookId && collections.length === 0 && (
          <li className="text-secondary container w-full flex justify-center items-center h-full flex-col gap-5 flex-grow">

            {isOwner && <p className="text-center">Ainda não criaste nenhuma coleção.</p>}

            {!isOwner && ownerFirstName && (<p className="text-center">{ownerFirstName} não tem coleções disponíveis.</p>)}


            <Button className="caption" padding="0 20px" height="2.8rem" type="black-outlined" ariaLabel='Procurar inspiração na galeria'>
              {'Procurar inspiração na galeria ->'}
            </Button>
          </li>
        )}


      </ul>



    </ >
  );
};

export default CollectionList;
