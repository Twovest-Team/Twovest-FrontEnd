import Button from "@/components/buttons/Button";
import Image from "next/image";
import HeaderImage from "../photosMP/header.png"

export default function Header() {
  return (
    <div className="flex flex-col pt-8 items-center md:pt-12 lg:pt-16">
      <div className="px-6 md:px-12 lg:px-20 flex flex-col justify-center items-center gap-5">
        <h3 className="text_h3 text-center">Eco-Fashion. Wallet-Friendly.</h3>
        <p className="text_caption text-secondary text-center pb-3">
          A ideia de que moda sustentável é sinónimo de produtos caros está cada vez mais ultrapassada. 
          Hoje, é possível vestires-te bem, respeitando o meio ambiente e sem gastar uma fortuna.
        </p>
        <Button type="black" href={'/LandingPageMP#aboutUs'}>Quero saber mais!</Button>
      </div>
      <div className="flex items-center justify-center pt-6">
        <Image src={HeaderImage} alt="HeaderImage" width={200} height={200} className="md:w-[250px] lg:w-[300px]" />
      </div>
    </div>
  )
}