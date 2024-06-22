'use client'

import { useState } from 'react';
import Image from "next/image";

export default function TeamMember({ name, role, image, hover }) {
    const [currentImage, setCurrentImage] = useState(image);

    return (
        <div className="flex flex-col bg-white w-56 rounded-[20px]">
            <div
                className="w-full h-[190px] relative"
                onMouseEnter={() => hover ? setCurrentImage(hover) : undefined}
                onMouseLeave={() => setCurrentImage(image)}
            >
                <Image className="rounded-t-[20px] object-cover" src={currentImage} alt={name} fill={true} />
            </div>
            <p className="body_semibold font-bold px-4 pt-4 text-black">{name}</p>
            <p className="caption text-secondary px-4 pb-6 pt-1">{role}</p>
        </div>
    );
};
