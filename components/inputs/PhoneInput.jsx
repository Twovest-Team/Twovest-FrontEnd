import PortugalFlag from "@/public/images/idiomas/portugal_idioma.svg";
import Image from "next/image";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const PhoneInput = () => {
    return (
        <div className="flex">
            <div className="flex cursor-pointer items-center gap-1 px-4 py-4 border-l border-y rounded-l w-fit bg-grey_opacity_50 border-grey">
                <Image src={PortugalFlag} alt="Bandeira de Portugal" width={16} height={16} /> 
                <KeyboardArrowDownIcon className="text-[20px]" />
            </div>

            <input required type="tel" placeholder="Telemóvel" className="focus:outline-none pl-4 pr-4 py-4 w-full flex-grow rounded-r border-r border-y border-grey" />
        </div>
    )
}

export default PhoneInput