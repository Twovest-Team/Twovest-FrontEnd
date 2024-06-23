'use client'

import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import IconButton from './IconButton';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

const CopyButton = ({copy}) => {

    const [isClicked, setIsClicked] = useState(false)

    function handleClick() {
        setIsClicked(!isClicked)
        setTimeout(() => {
            setIsClicked(false)
        }, 2000)
    }

    return (
        <div className='cursor-pointer'>
            {!isClicked ?
                <CopyToClipboard text={copy} onCopy={(text, result) => handleClick()}>
                    <IconButton icon={<ContentCopyRoundedIcon sx={{fontSize: 20}} />} />
                </CopyToClipboard> :
                <IconButton icon={<CheckCircleOutlineRoundedIcon className='text-primary_main' />} />
            }
        </div>

    )
}

export default CopyButton
