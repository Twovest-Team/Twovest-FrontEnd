import Image from "next/image";
import NavigationTitle from "@/components/providers/NavigationTitle";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { redirect } from 'next/navigation'

export default async function Options() {

    const currentUser = await useAuthServer()
    
    if (!currentUser){
        redirect('/')
    }

    return (

        <div className="mb-14 md:mb-36">
            <NavigationTitle titleText={"Definições de conta"} />
            <div className="lg:flex min-[1440px]:w-[1440px] mx-auto container">
                <div className=" min-[320px]:flex mx-6 items-center mt-2 lg:w-1/2 lg:block lg:text-center lg:items-center lg:self-center">
                    <div className="mr-4 mb-3 min-[320px]:mb-0">
                        <Image src={currentUser.img} width={70} height={70} alt={`Imagem do utilizador ${currentUser.name}`} className="rounded-full lg:rounded-[15%] mx-auto min-[320px]:mx-0 lg:mx-auto lg:mb-4 lg:w-[200px] lg:h-[200px]" />
                    </div>
                    <div className="break-words text-center">
                        <h2>{currentUser.name}</h2>
                        <p className="text-secondary">{currentUser.email}</p>
                    </div>
                </div>
                <div className="mx-6 my-6 lg:w-1/2">
                    <ul>
                        <li className="py-6 flex justify-between items-center cursor-pointer">
                            <div>
                                <h3>Alterar dados</h3>
                                <p className="text-secondary">Notificações, Password...</p>
                            </div>
                            <div>
                                <ArrowForwardIosIcon sx={{ fontSize: 18 }} className="text-secondary" />
                            </div>
                        </li>
                        <li className="py-6 flex justify-between items-center cursor-pointer">
                            <div>
                                <h3>Histórico de compras</h3>
                                <p className="text-secondary">Tem 3 ecomendas pendentes</p>
                            </div>
                            <div>
                                <ArrowForwardIosIcon sx={{ fontSize: 18 }} className="text-secondary" />
                            </div>
                        </li>
                        <li className="py-6 flex justify-between items-center cursor-pointer">
                            <div>
                                <h3>Gerir looks submetidos</h3>
                                <p className="text-secondary">Gerir looks visiveis, likes, etc</p>
                            </div>
                            <div>
                                <ArrowForwardIosIcon sx={{ fontSize: 18 }} className="text-secondary" />
                            </div>
                        </li>
                        <li className="py-6 flex justify-between items-center cursor-pointer">
                            <div>
                                <h3>Reviews</h3>
                                <p className="text-secondary">4 reviews feitas</p>
                            </div>
                            <div>
                                <ArrowForwardIosIcon sx={{ fontSize: 18 }} className="text-secondary" />
                            </div>
                        </li>

                    </ul>
                </div>
            </div>


        </div>

    )
}