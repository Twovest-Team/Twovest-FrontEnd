import Image from "next/image"

export const UserIcon = ({url, userState}) =>{
    return(
        <Image src={url} className="rounded-full border-grey border" width={24} height={24} alt="profile image"/>
    )
}