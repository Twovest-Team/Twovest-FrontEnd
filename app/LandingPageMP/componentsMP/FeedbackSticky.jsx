export default function FeedbackSticky () {
    return(
        <div className="z-30 top-16 w-full h-[72px] px-[22px] sticky py-[17px] bg-black flex-col justify-center items-start gap-2.5 inline-flex">
        <div className="w-[346px]">
            <p className="text-white leading-5 text-sm font-semibold">
                Gostarias de dar feedback? 🤓 São apenas uns minutos e nós agradecemos!  
                <a 
                className="text-emerald-500 text-sm font-semibold pl-1"
                href="https://forms.gle/5Y3qUDvL5JmMkyYd6">
                     Dar feedback.
                </a>
            </p>
        </div>
</div>
    )
}