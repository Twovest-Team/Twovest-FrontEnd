import Link from "next/link"

export const SecondaryMenuPagesList = ({toggleMenu}) =>{
    return(
        <div>
            <div className="border border-b border-grey mx-4 my-6"></div>
                    
                <ul className="mx-4">
                <div className="my-6"><Link href={"/"} onClick={toggleMenu}>Sobre nós</Link></div>
                <div className="my-6"><Link href={"/"} onClick={toggleMenu}>Proteção de dados</Link></div> 
                <div className="my-6"><Link href={"/"} onClick={toggleMenu}>Termos de serviço</Link></div> 
                <div className="my-6"><Link href={"/"} onClick={toggleMenu}>Aviso legal</Link></div>  
                </ul>
        </div>
            
    )
}