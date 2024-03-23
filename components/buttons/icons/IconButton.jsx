'use client'

const IconButton = ({ icon, className, onClick, darkMode }) => {
    return (
        <button
            onClick={onClick && (() => onClick())}
            className={`w-8 h-8 cursor-pointer transition-colors duration-150 ease-in-out active:bg-gray-200 hover:bg-gray-100 flex justify-center items-center rounded-full ${className} ${darkMode && 'active:bg-opacity-30 hover:bg-opacity-30'}`}>
            {icon}
        </button>
    )
}

export default IconButton