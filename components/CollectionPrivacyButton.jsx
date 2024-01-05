import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';

export default function CollectionPrivacyButton(props) {

    if(props.privacidade=="privada")
    {
        return(
            <div className="w-[100px] h-[30px] bg-grey_opacity_50 rounded-[100px] justify-center items-center inline-flex">
                <LockOutlinedIcon className='h-[13px] text-secondary'/>
                <p className="caption text-secondary">Privada</p>
            </div>
        )

    }else if (props.privacidade=="publica"){
        return(
            <div className="w-[100px] h-[30px] bg-grey_opacity_50 rounded-[100px] justify-center items-center inline-flex">
                <PublicOutlinedIcon className='h-[13px] text-secondary'/>
                <p className="caption text-secondary">Pública</p>
            </div>
        )

    }

    
}

/*

<div className="w-[104px] h-8 px-5 py-2 bg-zinc-100 rounded-[100px] justify-start items-center gap-1.5 inline-flex">
    <div className="text-neutral-400 text-sm font-normal font-['Inter']">Privada</div>
</div>

*/