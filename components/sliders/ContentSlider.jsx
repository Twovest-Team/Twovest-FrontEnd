

const ContentSlider = ({ children }) => {

    return (
        <div className="relative w-full h-full">
            <div className="flex flex-row gap-4 container scroll_bar-invisible overflow-x-scroll">
                {children}
            </div>

            <div className="absolute right-0 bg-gradient-to-l from-white w-20 h-full top-0 pointer-events-none">

            </div>

        </div>

    )
}

export default ContentSlider