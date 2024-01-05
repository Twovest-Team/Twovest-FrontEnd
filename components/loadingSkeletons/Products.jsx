import React from 'react'
import ItemsBox from '../ItemsBox'

const ProductsSkeleton = () => {

    return (
        <ItemsBox>
            <div className='bg-grey_opacity_50 animate-pulse w-full aspect-[3/4] rounded' />
            <div className='bg-grey_opacity_50 animate-pulse w-full aspect-[3/4] rounded' />
            <div className='bg-grey_opacity_50 animate-pulse w-full aspect-[3/4] rounded' />
            <div className='bg-grey_opacity_50 animate-pulse w-full aspect-[3/4] rounded' />
            <div className='bg-grey_opacity_50 animate-pulse w-full aspect-[3/4] rounded' />
            <div className='bg-grey_opacity_50 animate-pulse w-full aspect-[3/4] rounded' />
        </ItemsBox>
    )
}

export default ProductsSkeleton