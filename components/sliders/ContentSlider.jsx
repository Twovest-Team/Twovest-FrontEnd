

const ContentSlider = ({ children, disableGradient, className }) => {

    return (
        <ul className={`relative w-full ${className}`}>
            <div className="flex flex-row gap-4 container scroll_bar-invisible overflow-x-scroll">
                {children}
            </div>

            <div className={`absolute right-0 bg-gradient-to-l ${disableGradient && 'from-white w-20 h-full top-0 pointer-events-none'}`} />
        </ul>
    )

}

export default ContentSlider