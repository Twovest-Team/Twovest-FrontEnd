import CollectionPreview from "./CollectionPreview";
import SearchIcon from "@mui/icons-material/Search";
import { Fragment } from "react";

const CollectionList = ({
  collections,
  ownerId,
  search,
  isOwner,
  toSaveLook,
  ownerFirstName,
}) => {
  return (
    <Fragment key={"CollectionListFragment"}>
    
      {/* IF THERE ARE ANY COLLECTIONS */}
      {collections && (
        <ul className="flex flex-col items-start self-stretch gap-4 ">
          {search && (
            <button className="profile_search-collections">
              <SearchIcon />
              Procurar coleções
            </button>
          )}

          
          {collections.map((collection) => (
            <li key={collection.id_collection} className="w-full">
            <CollectionPreview
              toSaveLook={toSaveLook}
              userId={ownerId}
              collection={collection}
              key={collection.id_collection}
            />
            </li>
          ))}
          </ul>
      )}

      {/* IF THERE IS NO COLLECTION */}
      {!collections && (
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
