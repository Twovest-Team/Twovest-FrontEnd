import Image from "next/image"
import CollectionSharedAvatars from "./CollectionSharedAvatars";
import CollectionPrivacyButton from "./CollectionPrivacyButton";


import ImagemEx1 from "@/public/images/gallery/looks/looks_mulher1.png";
import ModeloMulher from "@/public/images/landing_page/landing_mulher.png";
import Img1 from "@/public/images/1.jpg";
import Img2 from "@/public/images/2.jpg";
import Img3 from "@/public/images/3.jpg";
import Marcelino from "@/public/images/marcelino.jpg";
import Mosca from "@/public/images/ken.jpg";
import ShareIcon from '@mui/icons-material/Share';

const utilizadoresPartilhados = [
    {
        id: 666,
        nome: "Ola Englund",
        img: "englund.jpg"
        
    },
    {
        id: 315,
        nome: "Vera Foster",
        img: "vera.jpg"
        
    },
    {
        id: 3,
        nome: "Bahadir Ozturk",
        img: "turco.jpg"
        
    },
    {
        id: 36,
        nome: "Nayleth",
        img: "nayleth2.jpg"
        
    },
]


export default function CollectionPreview() {
    return(
        <div className="flex flex-row items-start h-[90px] gap-x-4 mb-40">
            <div className="pr-4 w-[110px] h-[90px] relative">
            <Image
              src={Img1}
              alt="Look da coleção"
              style={{width:'80px', height:'90px', objectFit: "cover"}}
              className="left-[29px] top-0 absolute rounded-[7px] border-2 border-white"
            />
            <Image 
            src={Img2}
            alt="Look da coleção"
            style={{width:'80px', height:'90px',objectFit: "cover"}}
            className="left-[14px] top-0 absolute rounded-[7px] border-2 border-white"
            />
            <Image 
            src={Marcelino}
            alt="Look da coleção"
            style={{width:'80px', height:'90px',objectFit: "cover"}}
            className="left-0 top-0 absolute rounded-[7px] border-2 border-white"
            />
            </div>

            <div className="flex flex-col gap-4 h-[90px]">
            <div>
            <p className='truncate font-semibold w-36'>شيء باللغة العربية</p>
            <p className="caption text-secondary">31 Looks</p>
            </div>
            <CollectionPrivacyButton privacidade="publica"/>
            </div>
            <ShareIcon/>
            
        </div>
    )
}

/*
Estados de privacidade possíveis: 
------------PARTILHADO
<CollectionSharedAvatars utilizadores={utilizadoresPartilhados} />
------------PÚBLICO
<CollectionPrivacyButton privacidade="publica"/>
------------PRIVADO
<CollectionPrivacyButton privacidade="privada"/>

*/
