

const ContentSlider = ({ children, disableGradient, className }) => {

    return (
        <div className={`relative w-full ${className}`}>
            <ul className="flex flex-row gap-4 container scroll_bar-invisible overflow-x-scroll">
                {children}
            </ul>

            <div className={`absolute right-0 bg-gradient-to-l ${disableGradient && 'from-white w-20 h-full top-0 pointer-events-none'}`} />
        </div>
    )

}

export default ContentSlider