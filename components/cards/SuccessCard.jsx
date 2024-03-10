import CheckIcon from '@mui/icons-material/Check';

const SuccessCard = ({children}) => {
    return (
        <div className='w-full container text-center'>


            <div className='bg-white container pt-16 pb-12 relative rounded shadow-sm w-full'>

                {children}

                <div className='bg-black absolute -top-10 left-1/2 -translate-x-1/2 text-white rounded-full w-20 aspect-square flex items-center justify-center'>
                    <CheckIcon className='text-[48px]' />
                </div>
            </div>

        </div>
    )
}

export default SuccessCard