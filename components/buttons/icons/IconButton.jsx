'use client'

const IconButton = ({ icon, className, onClick }) => {

    return (
        <button
            onClick={onClick && (() => onClick())}
            className={`w-8 h-8 cursor-pointer transition-colors duration-150 ease-in-out active:bg-gray-200 hover:bg-gray-100 flex justify-center items-center rounded-full ${className}`}>
            {icon}
        </button>
    )
}

export default IconButton