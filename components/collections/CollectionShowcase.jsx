'use client'

import CollectionPreview from "@/components/collections/CollectionPreview";
import Image from "next/image";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { useAppDispatch } from '@/redux/hooks';
import { openModal } from "@/redux/slices/modalSlice";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

import InviteToCollectionModal from "./InviteToCollectionModal";
import Link from "next/link";

const CollectionShowcase = (props) => {

    const dispatch = useAppDispatch();
    const { collectionData, collectionId, collectionShareId, isAdmin } = props;

    return (
        <>
            <div className='flex flex-col items-center justify-center gap-1 mb-5 container'>
                <div className='w-fit'>
                    <CollectionPreview showcaseImages={true} collection={collectionData} />
                </div>

                <h1 className='text_h5 text-center'>{collectionData.name}</h1>
                <div className='text-secondary caption flex gap-1.5 items-center'>
                    <p>{collectionData.looks.length} look{collectionData.looks.length !== 1 && 's'}</p>

                    |

                    {collectionData.privacy == 1 &&
                        <span className="flex items-center">
                            <LockOutlinedIcon className="mb-0.5 mr-0.5" sx={{ fontSize: 15 }} />
                            Privada
                        </span>
                    }

                    {collectionData.privacy == 2 &&
                        <span className="flex items-center gap-1">
                            <PublicOutlinedIcon sx={{ fontSize: 15 }} />
                            Pública
                        </span>
                    }

                </div>

                <div className="flex mt-2 ml-2 items-center">
                    {collectionData.members.map((member, index) => (
                        <Link key={index} href={`/profile/${member.id}`} className="-ml-2 rounded-full border-4 border-white">
                            <Image
                                src={member.img}
                                className='rounded-full'
                                width={36}
                                height={36}
                            />
                        </Link>

                    ))}

                    {collectionData.members.length < 4 && isAdmin &&
                        <button className="-ml-2 bg-grey_opacity_50 rounded-full w-11 h-11 border-4 border-white flex justify-center items-center" onClick={() => dispatch(openModal(`inviteToCollection${collectionId}`))}>
                            <PersonAddOutlinedIcon sx={{ fontSize: 20 }} />
                        </button>
                    }

                </div>
            </div>

            {isAdmin &&
                <InviteToCollectionModal {...props} />
            }

        </>

    )
}

export default CollectionShowcase