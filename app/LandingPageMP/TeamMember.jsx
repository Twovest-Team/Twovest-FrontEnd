import Image from "next/image";

export default function TeamMember({ name, role, image }) {
    return (
        <div className="flex flex-col bg-white w-44 rounded-[24px]">
            <Image className="rounded-t-[24px]" src={image} alt={name} width={200} height={200} />
            <p className="body_semibold px-4 pt-4">{name}</p>
            <p className="text_caption text-secondary px-4 pb-6 pt-1">{role}</p>
        </div>
    );
};
