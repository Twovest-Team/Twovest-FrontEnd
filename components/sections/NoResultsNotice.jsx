import Link from "next/link"
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Button from "../buttons/Button";

export const NoResultsNotice = ({ icon, title, text, btnText, btnHref, onClick }) => {
    return (
        <div className="h-full flex flex-col justify-center items-center gap-1 mb-12">
            {icon || <ErrorOutlineOutlinedIcon sx={{ fontSize: 55 }} />}
            <h1 className="font-semibold mt-4 text_h6">{title || 'Escrever título'}</h1>
            <p className="text-center text-secondary mb-4 max-w-[296px]">{text || 'Escrever texto'}</p>
            
            <Button onClick={onClick} href={btnHref} type={'black'} ariaLabel={btnText || 'Escrever texto do botão'}>
                {btnText || 'Escrever texto do botão'}
            </Button>

        </div>
    )
}