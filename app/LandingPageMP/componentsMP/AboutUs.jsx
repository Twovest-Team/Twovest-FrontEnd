import LanguageIcon from "@mui/icons-material/Language";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Image from "next/image";
import PhoneImage from "../photosMP/phone.png";

const Card = ({ icon, title, text }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-4 rounded-[20px]">
      <div className="flex items-center justify-center mb-4 text-green-500">
        {icon}
      </div>
      <div className="gap-[10px]">
        <h6 className="text_h6 text-center">{title}</h6>
        {typeof text == "string" ? (
          <p className="text_caption text-secondary text-sm">{text}</p>
        ) : (
          <ul className="list-disc">
            {text.map((item, index) => (
              <li key={index} className="text_caption text-secondary text-sm">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default function AboutUs() {
  return (
    <div id="aboutUs">
      <div className="w-full flex justify-center h-[57px] py-2.5 pt-[50px] items-center">
        <h4 className="text_h4 text-center">Quem Somos</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          icon={<LanguageIcon className="w-[38.61px] h-[38.61px]" />}
          title="E-commerce de moda"
          text="Plataforma dedicada à comercialização de vestuário em risco de se tornar resíduo têxtil."
        />
        <Card
          icon={<WorkspacePremiumIcon className="w-[45px] h-[45px]" />}
          title="Valores"
          text={[
            "Servir a comunidade e o planeta.",
            "Disponibilizar roupa de qualidade, acessível a todos.",
            "Evitar desperdício têxtil.",
            "Credibilidade e segurança.",
          ]}
        />
        <Card
          icon={<CrisisAlertIcon className="w-[38.61px] h-[38.61px]" />}
          title="Missão"
          text="Permitir a compra de vestuário de modo a promover um mercado circular, encorajando a sustentabilidade, garantindo a qualidade, autenticidade e variedade dos produtos."
        />
        <Card
          icon={<VisibilityIcon className="w-[38.61px] h-[38.61px]" />}
          title="Futuro"
          text="Imaginamos um futuro onde as maiores marcas de roupa participam ativamente para promover a sustentabilidade num mercado circular."
        />
      </div>
      <div className="container flex justify-center my-10">
        <Image
          src={PhoneImage}
          alt="PhoneImage"
          width={211.86}
          height={268.43}
          className="rotate-[-6.6deg]"
        />
      </div>
    </div>
  );
}
