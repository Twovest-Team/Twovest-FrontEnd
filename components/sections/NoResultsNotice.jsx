import Link from "next/link"
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

export const NoResultsNotice = ({ icon, title, text, btnText, btnHref }) => {
    return (
        <div className="h-full flex flex-col justify-center items-center gap-1 mb-12">
            {icon || <ErrorOutlineOutlinedIcon sx={{ fontSize: 55 }} />}
            <h6 className="font-semibold mt-4">{title || 'Escrever título'}</h6>
            <p className="text-center text-secondary mb-4 max-w-[296px]">{text  || 'Escrever texto'}</p>
            <Link href={btnHref || '/'} className="bg-dark text-white font-semibold px-9 py-3.5 rounded w-fit" >
                {btnText || 'Escrever texto do botão'}
                </Link>
        </div>
    )
}