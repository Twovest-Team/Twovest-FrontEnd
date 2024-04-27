import CollectionPreview from "./CollectionPreview";
import SearchIcon from "@mui/icons-material/Search";
import { Fragment } from "react";

const CollectionList = ({
  collections,
  ownerId,
  search,
  isOwner,
  lookId, // Pass the look id if a look is to be saved
  ownerFirstName,
}) => {
  return (
    <Fragment key={"CollectionListFragment"}>
    
      {/* IF THERE ARE ANY COLLECTIONS */}
      {collections.length > 0 && (
        <ul className="flex flex-col items-start self-stretch gap-6 ">
          {search && (
            <button className="profile_search-collections">
              <SearchIcon />
              Procurar coleções
            </button>
          )}

          
          {collections.map((collection) => (
            <li key={collection.id_collection} className="w-full">
            <CollectionPreview
              lookId={lookId}
              userId={ownerId}
              collection={collection}
              key={collection.id_collection}
            />
            </li>
          ))}
          </ul>
      )}

      {/* IF THERE IS NO COLLECTION */}
      {collections.length === 0 && (
        <div className="flex flex-col items-start self-stretch gap-4 ">
        <div className="text-secondary">
          {isOwner && <p>Ainda não criaste nenhuma coleção.</p>}

          {!isOwner && ownerFirstName && (
            <p>{ownerFirstName} não tem coleções disponíveis.</p>
          )}
        </div>
        </div>
      )}
    </Fragment>
  );
};

export default CollectionList;
