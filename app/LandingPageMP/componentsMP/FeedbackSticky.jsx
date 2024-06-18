export default function FeedbackSticky() {
    return (
      <div className="z-30 top-16 w-full h-[72px] px-4 md:px-6 lg:px-8 sticky py-[17px] bg-black flex flex-col justify-center items-start gap-2.5">
        <div className="max-w-md mx-auto">
          <p className="text-white text-center leading-5 text-sm font-semibold">
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