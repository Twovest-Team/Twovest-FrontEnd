import LoadingIcon from '@/components/buttons/icons/LoadingIcon'
import NavigationTitle from '@/components/providers/NavigationTitle'

const GeneralLoading = () => {
    return (
        <main className='h-screen flex flex-col relative'>
            <div className='absolute top-0'>
                <NavigationTitle />
            </div>

            <div className='flex-grow flex justify-center items-center'>
                <LoadingIcon size={35} />
            </div>
        </main>
    )
}

export default GeneralLoading