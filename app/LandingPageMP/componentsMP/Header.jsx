import Button from "@/components/buttons/Button";
import Image from "next/image";
import HeaderImage from "../photosMP/header.png"

export default function Header () {
    return(
       <div className="gap-7 flex flex-col pt-8 items-center">
        <div className="px-6 flex-col justify-center items-center gap-5 flex">
                <h3 className="text_h3 text-center">Eco-Fashion. Wallet-Friendly.</h3>
                <p className="text_caption text-secondary text-center">A ideia de que moda sustentável é sinónimo de produtos caros está cada vez mais ultrapassada. 
                Hoje, é possível vestires-te bem, respeitando o meio ambiente e sem gastar uma fortuna.</p>
                <Button type="black" href={'/LandingPageMP#aboutUs'}>Quero saber mais!</Button>
            </div>
            <div className="flex items-center jestify-center">
                <Image src={HeaderImage} alt="HeaderImage" with={200} height={200}/>
            </div>
       </div> 
    )
}