import TeamMember from "../../app/aboutus/TeamMember";
import Vasco from "@/public/static/images/aboutus/vasco.png";
import Daniela from "@/public/static/images/aboutus/daniela.png";
import Joao from "@/public/static/images/aboutus/joao.png";
import JoaoKid from "@/public/static/images/aboutus/joao-kid.png";
import Margarida from "@/public/static/images/aboutus/margarida.png";
import Jonatas from "@/public/static/images/aboutus/jonatas.png";
import Goncalo from "@/public/static/images/aboutus/goncalo.png";

export default function Team() {
    return (
        <div className="bg-black text-white pt-24 pb-48">
            <h3 className="text-[10vw] font-extrabold sm:text-[40px] text-center text-white mb-12">Equipa</h3>
            <div id="team" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-fit mx-auto">

                <TeamMember
                    name="Vasco Saraiva"
                    role="UX/UI Designer & Full-Stack Developer"
                    image={Vasco}
                />
                <TeamMember
                    name="Daniela Silva"
                    role="UX/UI Designer & Front-End Developer"
                    image={Daniela}
                />
                <TeamMember
                    name="Jónatas Roque"
                    role="UX/UI Designer & Full-Stack Developer"
                    image={Jonatas}
                />
                <TeamMember
                    name="Gonçalo Calçada"
                    role="UX/UI Designer & Full-Stack Developer"
                    image={Goncalo}
                />
                <TeamMember
                    name="Margarida Bicho"
                    role="UX/UI Designer & Front-End Developer"
                    image={Margarida}
                />
                <TeamMember
                    name="João Paixão"
                    role="UX/UI Designer & Full-Stack Developer"
                    image={Joao}
                    hover={JoaoKid}
                />
            </div>
        </div>

    );
};