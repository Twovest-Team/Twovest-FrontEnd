import TeamMember from "../TeamMember";
import Vasco from "../photosMP/vasco.png";
import Daniela from "../photosMP/daniela.png";
import Joao from "../photosMP/joao.png";
import Margarida from "../photosMP/margarida.png";
import Jonatas from "../photosMP/jonatas.png";
import Goncalo from "../photosMP/goncalo.png";

export default function Team() {
    return (
        <div id="team" className="pt-[50px] pb-[50px] bg-black flex flex-col items-center gap-[50px]">
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