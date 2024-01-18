import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const NoDataComponent = ({text}) => {
    return(
        <div className="h-screen container text-center"><InfoOutlinedIcon className="text-[60px] mt-16 mb-6"/><div>{text}</div></div>
    )
}