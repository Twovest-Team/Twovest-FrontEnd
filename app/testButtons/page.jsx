'use client'

import Button from '@/components/buttons/Button'
import NavigationTitle from '@/components/providers/NavigationTitle'
import ContentSlider from '@/components/sliders/ContentSlider'
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter'
import { useState } from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import CopyButton from '@/components/buttons/icons/CopyButton';
import FavoriteIcon from '@mui/icons-material/Favorite';




const TestButtons = () => {


    const types = ['primary', 'black', 'black-outlined', 'white', 'white-outlined', 'grey', 'error', 'warning']
    const [selectedType, setSelectedType] = useState('primary')


    const templates = {
        normal: `
        <Button type={'${selectedType}'} ariaLabel='WRITE HERE'>
            TEXT HERE
        </Button>
    `,
        disabled: `
        <Button type={'${selectedType}'} ariaLabel='WRITE HERE' disabled={true}>
            TEXT HERE
        </Button>
    `,
        withLink: `
        <Button type={'${selectedType}'} ariaLabel='WRITE HERE' href='URL HERE'>
            TEXT HERE
        </Button>
    `,
        fullWidth: `
        <Button type={'${selectedType}'} ariaLabel='WRITE HERE' width='full'>
            TEXT HERE
        </Button>
    `,
        centeredIcon: `
        <Button type={'${selectedType}'} ariaLabel='WRITE HERE' width='full'>
            TEXT HERE
            <Icon />
        </Button>
    `,
        rightIcon: `
        <Button type={'${selectedType}'} ariaLabel='WRITE HERE' width='full' justify='between'>
            TEXT HERE
            <Icon />
        </Button>
    `,
        leftIcon: `
        <Button type={'${selectedType}'} ariaLabel='WRITE HERE' width='full' justify='between'>
            <Icon />
            TEXT HERE
        </Button>
    `,
        rounded: `
        <Button type={'${selectedType}'} ariaLabel='WRITE HERE' radius='full'>
            <Icon />
            TEXT HERE
        </Button>
    `,
        onlyIcon: `
        <Button padding={4} type={'${selectedType}'} ariaLabel='WRITE HERE' onlyIcon={true}>
            <Icon />
        </Button>
    `,
    };

    return (
        <div className='min-h-screen flex-col gap-32 mx-auto '>

            {/* TYPES */}

            <nav>
                <NavigationTitle
                    titleText='Choose your button type 😎'
                />

                <ContentSlider>
                    {types.map(type => (
                        <Button key={type}
                            type={type === selectedType ? 'black' : 'grey'}
                            ariaLabel='WRITE HERE'
                            onClick={() => setSelectedType(type)}
                        >
                            {capitalizeFirstLetter(type)} buttons
                        </Button>
                    ))}

                </ContentSlider>
            </nav>

            <main className='container my-10 flex flex-col gap-9'>

                {/* NORMAL */}
                <div className={`container ${(selectedType === 'white' || selectedType === 'white-outlined') && 'bg-black text-white '} shadow-md px-5 py-5 w-full rounded`}>

                    <h1 className='font-semibold mb-5 flex items-center gap-1 text_h6'>Normal <CopyButton copy={templates.normal} /></h1>

                    <Button
                        type={selectedType}
                        ariaLabel='WRITE HERE'
                    >
                        {capitalizeFirstLetter(selectedType)} button
                    </Button>
                </div>

                {/* DISABLED */}
                <div className={`container ${(selectedType === 'white' || selectedType === 'white-outlined') && 'bg-black text-white '} shadow-md px-5 py-5 w-full rounded`}>

                    <h1 className='font-semibold mb-5 flex items-center gap-1 text_h6'>Disabled <CopyButton copy={templates.disabled} /></h1>

                    <Button
                        type={selectedType}
                        ariaLabel='WRITE HERE'
                        disabled={true}
                    >
                        Disabled {capitalizeFirstLetter(selectedType)} button
                    </Button>
                </div>

                {/* NORMAL WITH LINK */}
                <div className={`container ${(selectedType === 'white' || selectedType === 'white-outlined') && 'bg-black text-white '} shadow-md px-5 py-5 w-full rounded`}>
                    <h1 className='font-semibold mb-5 flex items-center gap-1 text_h6'>Normal with link <CopyButton copy={templates.withLink} /></h1>
                    <Button
                        type={selectedType}
                        ariaLabel='WRITE HERE'
                        href='https://puginarug.com/'
                    >
                        Click to go to amazing place
                    </Button>
                </div>

                {/* fULL WIDTH */}
                <div className={`container ${(selectedType === 'white' || selectedType === 'white-outlined') && 'bg-black text-white '} shadow-md px-5 py-5 w-full rounded`}>
                    <h1 className='font-semibold mb-5 flex items-center gap-1 text_h6'>Full width <CopyButton copy={templates.fullWidth} /></h1>
                    <Button
                        type={selectedType}
                        ariaLabel='WRITE HERE'
                        width='full'
                    >
                        {capitalizeFirstLetter(selectedType)} button
                    </Button>
                </div>

                {/* CENTERED ICON */}
                <div className={`container ${(selectedType === 'white' || selectedType === 'white-outlined') && 'bg-black text-white '} shadow-md px-5 py-5 w-full rounded`}>
                    <h1 className='font-semibold mb-5 flex items-center gap-1 text_h6'>Centered Icon <CopyButton copy={templates.centeredIcon} /></h1>
                    <Button
                        type={selectedType}
                        ariaLabel='WRITE HERE'
                    >
                        {capitalizeFirstLetter(selectedType)} button
                        <FavoriteIcon className='translate-x-2' sx={{ fontSize: 21 }} />
                    </Button>
                </div>

                {/* RIGHT ICON */}
                <div className={`container ${(selectedType === 'white' || selectedType === 'white-outlined') && 'bg-black text-white '} shadow-md px-5 py-5 w-full rounded`}>
                    <h1 className='font-semibold mb-5 flex items-center gap-1 text_h6'>Right Icon <CopyButton copy={templates.rightIcon} /></h1>
                    <Button
                        type={selectedType}
                        ariaLabel='WRITE HERE'
                        width='full'
                        justify='between'
                    >
                        {capitalizeFirstLetter(selectedType)} button
                        <KeyboardArrowRightIcon className='translate-x-2' sx={{ fontSize: 28 }} />
                    </Button>
                </div>

                {/* LEFT ICON */}
                <div className={`container ${(selectedType === 'white' || selectedType === 'white-outlined') && 'bg-black text-white '} shadow-md px-5 py-5 w-full rounded`}>
                    <h1 className='font-semibold mb-5 flex items-center gap-1 text_h6'>Left Icon <CopyButton copy={templates.leftIcon} /></h1>
                    <Button
                        type={selectedType}
                        ariaLabel='WRITE HERE'
                        width='full'
                        justify='between'
                    >
                        <KeyboardArrowLeftIcon className='-translate-x-2' sx={{ fontSize: 28 }} />
                        {capitalizeFirstLetter(selectedType)} button
                    </Button>
                </div>

                {/* FULLY ROUNDED */}
                <div className={`container ${(selectedType === 'white' || selectedType === 'white-outlined') && 'bg-black text-white '} shadow-md px-5 py-5 w-full rounded`}>
                    <h1 className='font-semibold mb-5 flex items-center gap-1 text_h6'>Fully rounded <CopyButton copy={templates.rounded} /></h1>
                    <Button
                        type={selectedType}
                        ariaLabel='WRITE HERE'
                        radius='full'
                    >
                        {capitalizeFirstLetter(selectedType)} button
                    </Button>
                </div>

                {/* ICON ONLY */}
                <div className={`container ${(selectedType === 'white' || selectedType === 'white-outlined') && 'bg-black text-white '} shadow-md px-5 py-5 w-full rounded`}>
                    <h1 className='font-semibold mb-5 flex items-center gap-1 text_h6'>Only Icon - multiple sizes <CopyButton copy={templates.onlyIcon} /></h1>

                    <div className='flex items-center gap-5'>
                        <Button
                            padding={3}
                            type={selectedType}
                            ariaLabel='WRITE HERE'
                            onlyIcon={true}
                        >
                            <FolderCopyIcon />
                        </Button>

                        <Button
                            padding={4}
                            type={selectedType}
                            ariaLabel='WRITE HERE'
                            onlyIcon={true}
                        >
                            <FolderCopyIcon />
                        </Button>

                        <Button
                            href='https://puginarug.com/'
                            padding={5}
                            type={selectedType}
                            ariaLabel='WRITE HERE'
                            onlyIcon={true}
                        >
                            <FolderCopyIcon />
                        </Button>
                    </div>
                </div>

            </main>

        </div>
    )
}

export default TestButtons

