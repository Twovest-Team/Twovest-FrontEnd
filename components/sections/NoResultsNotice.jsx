import Link from "next/link"

export const NoResultsNotice = ({ icon, title, text, btnText, btnHref }) => {
    return (
        <div className="h-full flex flex-col justify-center items-center gap-1 mb-12">
            {icon}
            <h6 className="font-semibold mt-4">{title}</h6>
            <p className="text-center text-secondary mb-4 max-w-[296px]">{text}.</p>
            <Link href={btnHref} className="bg-dark text-white font-semibold px-9 py-3.5 rounded w-fit" >
                {btnText}
                </Link>
        </div>
    )
}