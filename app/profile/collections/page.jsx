import getUserByEmailServer from "@/utils/db/getUserByEmailServer";
import getInfoForProfilePage from "@/utils/db/getInfoForProfilePage";
import NavigationTitle from "@/components/providers/NavigationTitle";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { redirect } from "next/navigation";
import CollectionPreview from "@/components/items/CollectionPreview";
import SearchIcon from "@mui/icons-material/Search";

// Lista de coleções de um utilizador
const Collections = async ({ searchParams }) => {
  const id_user = searchParams.id;
  const sessionUser = await (await getUserByEmailServer()).id;
  var paginaPropria = false;
  if (id_user == sessionUser) {
    paginaPropria = true;
  }

  const data = await getInfoForProfilePage(id_user);

  if (data.length == 0) {
    redirect(`/profile/collections?id=${sessionUser}`);
  }

  const primeiroNome = data[0].name.split(" ")[0];

  return (
    <>
      <NavigationTitle
        titleText={
          paginaPropria ? "As minhas coleções" : `Coleções de ${primeiroNome}`
        }
      >
        {paginaPropria ? <CreateOutlinedIcon /> : null}
      </NavigationTitle>
      <div className="container pb-6">
        <ColecoesPerfil
          data={data}
          paginaPropria={paginaPropria}
          primeiroNome={primeiroNome}
        />
      </div>
    </>
  );
};

export default Collections;

async function ColecoesPerfil({ data, paginaPropria, primeiroNome }) {
  return (
    <>
      {data[0].hasOwnProperty("colecoes") ? (
        data[0].onlyPrivateCollections ? (
          <div className="font-semibold text-secondary">
            {primeiroNome} apenas possui coleções privadas
          </div>
        ) : (
          <>
            <div className="pb-6">
              <button className="profile_search-collections">
                <SearchIcon />
                Procurar coleções
              </button>
            </div>
            
            {data[0].colecoes.map((element) => (
              <div className="pb-6" key={element.id_collection}>
              <CollectionPreview
                colecao={element}
                perfilProprio={paginaPropria}
              />
              </div>
            ))}
            
          </>
        )
      ) : paginaPropria ? (
        <div className="font-semibold text-secondary">
          Ainda não criaste nenhuma coleção
        </div>
      ) : (
        <div className="font-semibold text-secondary">
          {primeiroNome} ainda não criou nenhuma coleção
        </div>
      )}
    </>
  );
}
