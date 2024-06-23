import LoadingIcon from '@/components/buttons/icons/LoadingIcon'
import NavigationTitle from '@/components/providers/NavigationTitle'

const GeneralLoading = () => {
    return (
        <main className='h-svh w-full flex flex-col relative'>
            <NavigationTitle />

            <div className='absolute w-full h-full flex justify-center items-center top-0 left-0 right-0 bottom-0 m-auto'>
                <LoadingIcon size={35} />
            </div>
        </main>
    )
}

export default GeneralLoading