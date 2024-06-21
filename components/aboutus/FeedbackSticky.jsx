export default function FeedbackSticky() {
  return (
    <div className="z-30 top-[75px] w-full flex justify-center min-h-[68px] px-[22px] sticky py-4 bg-black flex-col items-start gap-2.5">
      <div className="mx-auto">
        <p className="text-white leading-6 caption text-sm text-center items-center font-semibold">
          Gostarias de dar feedback? 🤓 <br /> São apenas uns minutos e nós agradecemos!
          <a
            className="text-emerald-500 text-sm font-semibold pl-1 underline"
            href="https://forms.gle/5Y3qUDvL5JmMkyYd6">
            Dar feedback.
          </a>
        </p>
      </div>
    </div>
  )
}