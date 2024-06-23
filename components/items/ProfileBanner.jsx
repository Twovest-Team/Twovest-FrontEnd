'use client'

import NavigationTitle from "../providers/NavigationTitle"
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import IconButton from "../buttons/icons/IconButton";
import { gradients } from "@/constants";
import { useState } from "react";


const ProfileBanner = ({ isOwnProfile, ownerFirstName }) => {

    const [count, setCount] = useState(0)

    const handleClick = () => {
        if ((count + 1) < gradients.length) {
            setCount(count => count + 1)
        } else {
            setCount(0)
        }
    }

    return (
        <>
            <div className="w-full h-40 relative mb-24 md:mb-[134px]">
                <div className='w-full h-full' style={{ background: gradients[count].styles }} />
            </div>

            <div className="absolute top-0 w-full">
                <NavigationTitle
                    hasImageBehind={gradients[count].darker}
                >

                    {isOwnProfile &&
                        <>
                            <div className='sm:hidden'>
                                <IconButton
                                    onClick={handleClick}
                                    icon={<AutoAwesomeIcon sx={{ fontSize: 24 }} />}
                                    darkMode={gradients[count].darker}
                                />
                            </div>

                            <button onClick={handleClick}
                            className={`hidden ${gradients[count].darker ? 'bg-white bg-opacity-40 hover:bg-opacity-20 text-white' : 'bg-black bg-opacity-40 hover:bg-opacity-20 text-white'} sm:flex  transition-all duration-200 px-5 py-2 rounded-full  text-caption gap-2 items-center font-semibold`}>
                                <AutoAwesomeIcon sx={{ fontSize: 20 }} />
                                <span className='pt-0.5'>Editar banner</span>
                            </button>
                        </>
                    }
                </NavigationTitle>
            </div>
        </>
    )
}

export default ProfileBanner