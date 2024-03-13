'use client'

import ShareIcon from '@mui/icons-material/Share';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Notification from '../../modals/Notification';
import IconButton from './IconButton';
import { useAppDispatch } from '@/redux/hooks';
import { showNotification } from '@/redux/slices/notificationSlice';

const ShareButton = () => {

    const dispatch = useAppDispatch()
    const pathName = usePathname()
    const url = process.env.NEXT_PUBLIC_URL + pathName

    function handleClick() {
        dispatch(showNotification('shareButton'))
    }

    return (
        <div className='cursor-pointer'>
            <CopyToClipboard text={url} onCopy={() => handleClick()}>
                <IconButton icon={<ShareIcon />} />
            </CopyToClipboard>

            <Notification id={'shareButton'} type={'Success'} message={'Link copiado'} />
        </div>

    )
}

export default ShareButton
