import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const ModalEmailVerification = () =>{

    return(
        <div className="h-screen z-50 text-center mx-10">
            <InfoOutlinedIcon className='text-[45px] mt-[30vh] mb-2'/>
            <div className="text-xl">Para concluires o registo, verifica a conta no teu email</div>
            <div className=" text-secondary mt-6">Podes fechar esta página</div>
        </div>
    )
}