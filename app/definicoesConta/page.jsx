import Image from "next/image";
import NavigationTitle from "@/components/providers/NavigationTitle";
import getAuth from "@/utils/db/auth/getAuth";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default async function DefinicoesConta() {

    const currentUser = await useAuthServer()
    
    return(

    <div>
        <NavigationTitle titleText={"Definições de conta"} />

        <div className=" min-[320px]:flex mx-6 items-center mt-2">
            <div className="mr-4 mb-3 min-[320px]:mb-0">
                <Image src={currentUser.img} width={70} height={70} alt={`Imagem do utilizador ${currentUser.name}`} className="rounded-full mx-auto  min-[320px]:mx-0"/>
            </div>
            <div className="break-words">
                <h2>{currentUser.name}</h2>
                <p className="text-secondary">{currentUser.email}</p>
            </div>
        </div>
        <div className="mx-6 my-6">
            <ul>
                <li className="py-6 flex justify-between items-center">
                    <div>
                        <h3>Alterar dados</h3>
                        <p className="text-secondary">Notificações, Password...</p>
                    </div>
                    <div>
                        <ArrowForwardIosIcon sx={{ fontSize: 18 }} className="text-secondary"/>
                    </div>
                </li>
                <li className="py-6 flex justify-between items-center">
                    <div>
                        <h3>Histórico de compras</h3>
                        <p className="text-secondary">Tem 3 ecomendas pendentes</p>
                    </div>
                    <div>
                        <ArrowForwardIosIcon sx={{ fontSize: 18 }} className="text-secondary"/>
                    </div>
                </li>
                <li className="py-6 flex justify-between items-center">
                    <div>
                        <h3>Gerir looks submetidos</h3>
                        <p className="text-secondary">Gerir looks visiveis, likes, etc</p>
                    </div>
                    <div>
                        <ArrowForwardIosIcon sx={{ fontSize: 18 }} className="text-secondary"/>
                    </div>
                </li>
                <li className="py-6 flex justify-between items-center">
                    <div>
                        <h3>Reviews</h3>
                        <p className="text-secondary">4 reviews feitas</p>
                    </div>
                    <div>
                        <ArrowForwardIosIcon sx={{ fontSize: 18 }} className="text-secondary"/>
                    </div>
                </li>
                
            </ul>
        </div>
        
    </div>

    )
}