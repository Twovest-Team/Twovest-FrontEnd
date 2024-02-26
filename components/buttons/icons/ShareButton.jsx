'use client'

import ShareIcon from '@mui/icons-material/Share';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Notifications from '../../modals/Notifications';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ShareButton = () => {

    const [isClicked, setIsClicked] = useState(false)
    const pathName = usePathname()
    const url = process.env.NEXT_PUBLIC_URL + pathName

    function handleClick() {
        setIsClicked(!isClicked)
        setTimeout(() => {
            setIsClicked(false)
        }, 5000)
    }

    return (
        <div className='cursor-pointer'>
            {!isClicked ?
                <CopyToClipboard text={url} onCopy={(text, result) => handleClick()}>
                    <ShareIcon />
                </CopyToClipboard> :
                <ShareIcon />
            }

            {isClicked && <Notifications type={'Success'} message={'Link copiado'} />}
        </div>

    )
}

export default ShareButton
