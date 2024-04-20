import React from 'react'
import ItemsBox from '../providers/ItemsBox'
import GridBox from '../providers/GridBox'

const ProductsSkeleton = () => {

    return (
        <>
            <div className='bg-grey_opacity_50 animate-pulse w-full aspect-[3/4] rounded' />
            <div className='bg-grey_opacity_50 animate-pulse w-full aspect-[3/4] rounded' />
            <div className='bg-grey_opacity_50 animate-pulse w-full aspect-[3/4] rounded' />
            <div className='bg-grey_opacity_50 animate-pulse w-full aspect-[3/4] rounded' />
            <div className='bg-grey_opacity_50 animate-pulse w-full aspect-[3/4] rounded' />
            <div className='bg-grey_opacity_50 animate-pulse w-full aspect-[3/4] rounded' />
        </>
    )
}

export default ProductsSkeleton