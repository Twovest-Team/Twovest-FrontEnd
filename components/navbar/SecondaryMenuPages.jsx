import Link from "next/link"

export const SecondaryMenuPagesList = () =>{
    return(
        <div>
            <div className="border border-b border-grey mx-4 my-6"></div>
                    
                <ul className="mx-4">
                <div className="my-6"><Link href={"/"}>Sobre nós</Link></div>
                <div className="my-6"><Link href={"/"}>Proteção de dados</Link></div> 
                <div className="my-6"><Link href={"/"}>Termos de serviço</Link></div> 
                <div className="my-6"><Link href={"/"}>Aviso legal</Link></div>  
                </ul>
        </div>
            
    )
}