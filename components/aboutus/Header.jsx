import Button from "@/components/buttons/Button";
import Image from "next/image";
import HeaderImage from "@/public/static/images/aboutus/header.png"

export default function Header() {
  return (
    <div className="flex flex-col items-center justify-center pt-20">

      <div className="flex flex-col justify-center items-center gap-3">

        <h3 className="text-[10vw] sm:text-[50px] md:text-[70px] lg:text-[80px] font-extrabold text-center leading-tight bg-gradient-to-t from-[#666666]  to-black inline-block text-transparent bg-clip-text">Eco-Fashion. <br />Wallet-Friendly.</h3>
        <p className="max-w-[540px] caption sm:text-base text-secondary text-center pb-3">
          A ideia de que moda sustentável é sinónimo de produtos caros está cada vez mais ultrapassada. 
          Hoje, é possível vestires-te bem, respeitando o meio ambiente e sem gastar uma fortuna.
        </p>
        <Button type="black" href={'/aboutus#aboutUs'}>Quero saber mais!</Button>

      </div>

      <div className="flex flex-col justify-center items-center py-48 sm:py-60 w-[250px] sm:w-[320px] h-[250px] sm:h-[320px] relative">
        <Image className="object-contain hover:scale-110 duration-300 transition-transform hover:rotate-6" src={HeaderImage} alt="HeaderImage" fill={true} />
      </div>
    </div>
  )
}