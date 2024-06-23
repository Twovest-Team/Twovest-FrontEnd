import Image from "next/image";
import Link from "next/link";
import SocialMediaLogos from "../logos/SocialMediaLogos";
import LanguageButton from "../buttons/LanguageButton";
import { footerItems, paymentMethods } from "@/constants";

export default function Footer() {

  return (
    <footer className="bg-dark pt-10 lg:py-14 ">

      {/* MOBILE VERSION */}
      <div className="flex flex-col lg:hidden">

        <div className="flex flex-col gap-8 pb-10 container">

          <figure className="flex justify-start">
            <Image
              src={"/static/images/logo_twovest_white.svg"}
              width={150}
              height={200}
              alt="Logótipo Branco da Twovest"
            />
          </figure>

          <ul className="grid grid-cols-1  [@media(min-width:360px)]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-5">
            {footerItems.map((item, index) => (
              <li className="text-caption" key={index}>
                <Link className=" text-white text-opacity-75 hover:text-opacity-100 transition-all duration-200" href={item.href}>
                  {item.title}
                </Link>
              </li>
            ))}

          </ul>

          <hr />

          <div className="flex flex-col gap-6 justify-between items-start text-white">

            <div className="flex justify-between items-center w-full">
                <LanguageButton />
                <SocialMediaLogos />
            </div>

            <p className="text-caption text-end ml-auto">&#169; 2024 Twovest</p>
          </div>
        </div>





        <div className="bg-white py-3.5">
          <ul className="flex justify-between w-2/3 mx-auto">
            {paymentMethods.map((item, index) => (
              <li key={index} className="relative w-6 aspect-square">
                <Image fill={true} src={'/static/images/payments/' + item.file + '.svg'} alt={item.title} />
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* DESKTOP VERSION */}
      <div className="hidden lg:flex justify-between container gap-24">

        <figure className="relative w-80 h-40">
          <Image
            src={"/static/images/logo_twovest_white.svg"}
            fill={true}
            alt="Logótipo Branco da Twovest"
          />
        </figure>


        <div className="w-full flex flex-col gap-8">
          <ul className="grid grid-cols-4 w-full gap-y-5 text-caption">

            {footerItems.map((item, index) => (
              <li className="w-full" key={index}>
                <Link className=" text-white text-opacity-75 hover:text-opacity-100 transition-all duration-200" href={item.href}>
                  {item.title}
                </Link>
              </li>
            ))}

            <li className="flex gap-3">
              {paymentMethods.map((item, index) => (
                <div key={index} className="relative w-6 aspect-square">
                  <Image fill={true} src={'/static/images/payments/' + item.file + (item.multipleVersions ? '-white.svg' : '.svg')} alt={item.title} />
                </div>
              ))}
            </li>

          </ul>

          <hr className="w-full opacity-80" />

          <div className="flex flex-col gap-4 text-white">
            <div className="w-full flex justify-between items-start">
              <LanguageButton />
              <div>
                <SocialMediaLogos />
              </div>
            </div>

            <p className="text-caption justify-end flex text-end">&#169; 2024 Twovest</p>
          </div>


        </div>
      </div>

    </footer >
  );
}
