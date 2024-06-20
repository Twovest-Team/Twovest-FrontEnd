import TeamMember from "../../app/aboutus/TeamMember";
import Vasco from "@/public/static/images/aboutus/vasco.png";
import Daniela from "@/public/static/images/aboutus/daniela.png";
import Joao from "@/public/static/images/aboutus/joao.png";
import Margarida from "@/public/static/images/aboutus/margarida.png";
import Jonatas from "@/public/static/images/aboutus/jonatas.png";
import Goncalo from "@/public/static/images/aboutus/goncalo.png";

export default function Team() {
    return (
        <div id="team" className="pt-12 pb-12 bg-black flex flex-col items-center gap-12">
            <h3 className="text_h4 text-center text-white">Equipa</h3>
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
            />
        </div>
    );
};