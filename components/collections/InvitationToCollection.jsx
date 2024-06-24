'use client'

import Modal from "../modals/Modal"
import { useAppDispatch } from "@/redux/hooks"
import { closeModal, openModal } from "@/redux/slices/modalSlice"
import { useRouter, useSearchParams } from 'next/navigation'
import CollectionPreview from "./CollectionPreview"
import Button from "../buttons/Button"
import Image from "next/image"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import addMemberToCollection from "@/utils/db/collections/addMemberToCollection";
import { useEffect } from "react"

const InvitationToCollection = ({ currentUser, collectionData, collectionId, collectionShareId }) => {

    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const router = useRouter();

    const invitation = searchParams.get('invite')
    const admin = collectionData.members.find(member => member.is_admin === true)

    useEffect(() => {
        if (invitation === collectionShareId) {
            if (currentUser) {
                dispatch(openModal(`acceptInvite${collectionId}`))
            } else if (!currentUser) {
                dispatch(openModal('authModal'))
            }
        }
    }, [])


    const handleClick = async () => {
        const isMember = await addMemberToCollection(collectionId, currentUser.id, false)
        router.push(`/collection/${collectionId}`);
        dispatch(closeModal(`acceptInvite${collectionId}`))
        router.refresh();
    }

    if (currentUser && invitation === collectionShareId) {
        return (
            <Modal id={`acceptInvite${collectionId}`} restricted={true}>
                <div className='flex flex-col items-center'>

                    <div className="w-fit">
                        <CollectionPreview showcaseImages={true} collection={collectionData} />
                    </div>

                    <div className='text-secondary text-caption flex gap-1.5 my-3 items-center'>
                        <p>{collectionData.looks.length} looks</p>

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

                    <div className="flex mb-4 ml-4 justify-center items-center">
                        {
                            (() => {
                                const maxIterations = 4;
                                const members = collectionData.members;
                                const items = [];

                                for (let index = 0; index < maxIterations; index++) {
                                    const member = members[index];

                                    if (member) {
                                        items.push(
                                            <Image
                                                key={index}
                                                src={member.img}
                                                className='-ml-4 rounded-full border-4 border-white'
                                                width={44}
                                                height={44}
                                            />
                                        );
                                    } else {
                                        items.push(
                                            <div key={index} className="-ml-4 bg-grey_opacity_50 rounded-full w-11 h-11 border-4 border-white flex justify-center items-center">
                                                <PermIdentityIcon sx={{ fontSize: 20 }} />
                                            </div>
                                        );
                                    }
                                }

                                return items;
                            })()
                        }
                    </div>

                    <h1 className='font-semibold text-h6 mb-0.5'>{admin.name} convidou-te.</h1>
                    <p className='text-secondary mb-2'>Queres entrar na coleção {collectionData.name}?</p>
                </div>

                <div className="flex flex-col-reverse sm:flex-row items-center gap-4">
                    <Button onClick={() => dispatch(closeModal(`acceptInvite${collectionId}`))} href="/" className="border border-grey_opacity_50 shadow-sm" type="white" width="100%" ariaLabel="Cancelar">
                        Cancelar
                    </Button>

                    <Button type="black" width="100%" onClick={handleClick} ariaLabel="Aceitar convite">
                        Aceitar convite
                    </Button>
                </div>

            </Modal>
        )
    }

}

export default InvitationToCollection
