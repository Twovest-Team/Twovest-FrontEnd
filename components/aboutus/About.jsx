import LanguageIcon from "@mui/icons-material/Language";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Image from "next/image";
import PhoneImage from "@/public/static/images/aboutus/phone.png";

const Card = ({ icon, title, text }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border h-60 p-6 rounded flex flex-col justify-center items-center relative">

      <div className="flex flex-col items-center justify-center mb-4">
        <span className="text-primary_main mb-4">{icon}</span>

        <div className="text-black">
          <h6 className="text_h6 text-center">{title}</h6>
          {typeof text == "string" ? (
            <p className="caption text-secondary text-sm text-center max-w-[350px]">{text}</p>
          ) : (
            <ul className="list-disc list-inside text-left pl-2">
              {text.map((item, index) => (
                <li key={index} className="caption text-secondary text-sm text-center max-w-[350px]">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>


    </div>
  );
};

export default function About() {
  return (
    <div id="aboutUs">
      <div className="w-full flex justify-center py-2.5 pt-[50px] items-center">
        <h4 className="text-[10vw] font-extrabold sm:text-[40px] mb-6 text-center">Quem Somos</h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-[1000px] mx-auto">
        <Card
          icon={<LanguageIcon sx={{ fontSize: 38 }} />}
          title="E-commerce de moda"
          text="Plataforma dedicada à comercialização de vestuário em risco de se tornar resíduo têxtil."
        />
        <Card
          icon={<VisibilityIcon sx={{ fontSize: 38 }} />}
          title="Futuro"
          text="Imaginamos um futuro onde as maiores marcas de roupa participam ativamente para promover a sustentabilidade num mercado circular."
        />
        <Card
          icon={<CrisisAlertIcon sx={{ fontSize: 38 }} />}
          title="Missão"
          text="Promover um mercado circular, encorajando a sustentabilidade, garantindo a qualidade, autenticidade e variedade dos produtos."
        />
        <Card
        icon={<WorkspacePremiumIcon sx={{ fontSize: 45 }} />}
        title="Valores"
        text="Servir a comunidade e o planeta. Disponibilizar roupa de qualidade, acessível a todos. Evitar desperdício têxtil. Credibilidade e segurança."
      />
      </div>

      <div className="flex flex-wrap justify-center py-20 sm:py-32">
        <div className="w-[300px] sm:w-[400px] aspect-square relative">
          <Image
            src={PhoneImage}
            alt="PhoneImage"
            fill={true}
            className="rotate-[-6.6deg] object-contain"
          />
        </div>
      </div>
    </div>
  );
}