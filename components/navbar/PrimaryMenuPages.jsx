import Link from "next/link"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const PrimaryMenuPagesList = () => {
    return(
    <div>
        <div className="border border-b border-grey mx-4 my-6"></div>
    
    <ul className="mx-4">
    <Link href={"/"} className="my-6 flex justify-between items-center">
        <div>
            <div className="font-semibold">Galeria de Looks</div>
            <div className="text-grey caption">🔥 Descobre novos looks e inspira-te!</div>
        </div>
        <div>
            <ArrowForwardIosIcon className="text-[18px]"/>
        </div>
        
    </Link>
    <Link href={"/"} className="my-6 font-semibold flex justify-between">
        <div>
        Pontos de entrega
        </div>
        <div>
            <ArrowForwardIosIcon className="text-[18px]"/>
        </div>  
    </Link>
    <Link href={"/"} className="my-6 font-semibold flex justify-between">
        <div>
        Fórum
        </div>
        <div>
            <ArrowForwardIosIcon className="text-[18px]"/>
        </div>  
    </Link>
    <Link href={"/"} className="my-6 font-semibold flex justify-between">
        <div className="text-primary_main">
        Pontos&Cupões
        </div>
        <div>
            <ArrowForwardIosIcon className="text-[18px]"/>
        </div>  
    </Link>
    <Link href={"/"} className="my-6 font-semibold flex justify-between">
        <div>
        Contactos
        </div>
        <div>
            <ArrowForwardIosIcon className="text-[18px]"/>
        </div>  
    </Link>
    <Link href={"/"} className="my-6 font-semibold flex justify-between">
        <div>
        Help Center
        </div>
        <div>
            <ArrowForwardIosIcon className="text-[18px]"/>
        </div>  
    </Link>
    
    </ul>
    </div>
            
    )
}
