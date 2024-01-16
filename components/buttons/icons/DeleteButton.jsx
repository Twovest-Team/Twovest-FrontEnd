import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


export default function DeleteButton({deleteFunction}) {
    
    return(
        <DeleteOutlineOutlinedIcon onClick={deleteFunction} className="text-[22px] text-secondary cursor-pointer" />
    )
}