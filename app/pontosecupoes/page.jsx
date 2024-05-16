import getAllCoupons from "@/utils/db/getAllCoupons";
import NavigationTitle from "@/components/providers/NavigationTitle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";

export default async function PontosECupoes() {
  const currentUser = await useAuthServer();
  let progresso;
  let precoCupaoSorte = 500;

  if (currentUser.points >= precoCupaoSorte) {
    progresso = 100;
  } else {
    progresso = (currentUser.points / precoCupaoSorte) * 100;
  }

  const couponData = await getAllCoupons();
  return (
    <main>
      <NavigationTitle titleText={"Pontos&Cupões"}>
        <div className="flex gap-2 text-secondary items-center">
          <p
            className="hidden sm:block text-right text-gray-700"
            aria-label="Descobre como funciona"
          >
            Descobre como funciona
          </p>
          <HelpOutlineIcon />
        </div>
      </NavigationTitle>
      <div className="container text-center mt-14 mb-8">
        <div className="bg-white mx-auto pt-16 pb-12 relative rounded border shadow-md shadow-grey xl:w-1/2 justify">
          <div className="flex flex-col gap-6">
            <h4 className="flex flex-row justify-center text_h4">
              <p className="pr-4 font-semibold">Total de pontos: </p>
              <span
                className="text-primary_main"
                aria-label={currentUser.points}
              >
                {currentUser.points}
                <AutoModeIcon className="ml-2" />
              </span>
            </h4>
            <h5 className="text_h5">
              <span className="font-semibold mr-2" aria-label="350">
                {currentUser.points >= precoCupaoSorte
                  ? 0
                  : precoCupaoSorte - currentUser.points}
                <AutoModeIcon className="ml-2" />
              </span>
              para o cupão da sorte
            </h5>
            <div className="w-1/2 mx-auto bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-primary_main h-2.5 rounded-full"
                style={{ width: `${progresso}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-primary_main absolute -top-10 left-1/2 -translate-x-1/2 text-white rounded-full w-20 aspect-square flex items-center justify-center">
            <AutoModeIcon className="text-[48px]" />
          </div>
        </div>
      </div>
    </main>
  );
}

{
  /* <main>
      <div className="h-[2600px] w-full">
        Olá mundo
        {couponData.map((element) => (
          <div
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            key={element.id}
          >
            <p>Titulo: {element.title}</p>
            <p>Descricao: {element.description}</p>
            <p>Descontos: {element.discount}</p>
            <p>Custo: {element.cost}</p>
            {element.brands.map((marca) => (
              <p key={marca}>{marca.name}</p>
            ))}
          </div>
        ))}
      </div>
    </main> */
}
