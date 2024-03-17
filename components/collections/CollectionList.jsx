import CollectionPreview from './CollectionPreview'
import SearchIcon from "@mui/icons-material/Search";

const CollectionList = ({ collections, ownerId, search, isOwner, toSaveLook }) => {
    return (
        <div className="flex flex-col items-start self-stretch gap-4 ">

            {/* IF THERE ARE ANY COLLECTIONS */}
            {collections &&
                <>

                    {search &&
                        <button className="profile_search-collections">
                            <SearchIcon />
                            Procurar coleções
                        </button>
                    }


                    {collections.map(collection => (
                        <CollectionPreview
                            toSaveLook={toSaveLook}
                            userId={ownerId}
                            collection={collection}
                            key={collection.id_collection}
                        />
                    ))}
                </>
            }


            {/* IF THERE IS NO COLLECTION */}
            {!collections &&
                <div className="text-secondary">

                    {isOwner &&
                        <p>Ainda não criaste nenhuma coleção.</p>
                    }

                    {!isOwner &&
                        <p>{userFirstName} não tem coleções disponíveis.</p>
                    }

                </div>
            }

        </div>
    )
}




export default CollectionList