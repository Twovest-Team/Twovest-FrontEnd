import Image from "next/image";
import ModeloHomem from "@/public/images/landing_page/landing_homem.png";
import ModeloMulher from "@/public/images/landing_page/landing_mulher.png";

export default function Landing() {
  return (
    <div className="container">
    <div className="flex justify-center flex-wrap my-8 gap-8">
      <div className="relative">
      <Image
        src={ModeloMulher}
        alt="Modelo feminino da Twovest"
        priority
        width={338}
        height={334}
      />
      <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold">Mulher</h3>
      </div>
      <div className="relative">
      <Image
        src={ModeloHomem}
        alt="Modelo masculino da Twovest"
        priority
        width={338}
        height={334}
      />
      <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold">Homem</h3>
      </div>
    </div>
    </div>
  );
}
