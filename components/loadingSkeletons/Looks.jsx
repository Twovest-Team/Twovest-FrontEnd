import React from 'react'
import ItemsBox from '../providers/ItemsBox'

const LooksSkeleton = () => {

    return (
        <ItemsBox>
            <div className='bg-grey_opacity_50 animate-pulse w-full aspect-[17/26] rounded' />
            <div className='bg-grey_opacity_50 animate-pulse w-full aspect-[17/26] rounded' />
            <div className='bg-grey_opacity_50 animate-pulse w-full aspect-[17/26] rounded' />
            <div className='bg-grey_opacity_50 animate-pulse w-full aspect-[17/26] rounded' />
            <div className='bg-grey_opacity_50 animate-pulse w-full aspect-[17/26] rounded' />
            <div className='bg-grey_opacity_50 animate-pulse w-full aspect-[17/26] rounded' />
        </ItemsBox>
    )



}

export default LooksSkeleton