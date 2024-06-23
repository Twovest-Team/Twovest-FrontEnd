'use client'

import IconButton from "../buttons/icons/IconButton"
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";
import Button from "../buttons/Button";

const CreateCollectionButton = ({ isAdmin, type = 'icon' }) => {

    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(openModal('createCollection'))
    }

    return (
        <>
            {isAdmin && type === 'icon' &&
                <IconButton
                    onClick={handleClick}
                    icon={<AddIcon sx={{ fontSize: 25 }} />}
                />
            }
            {isAdmin && type === 'button' &&
                <Button onClick={handleClick} className="text-caption" padding="0 20px" height="2.8rem" type="black" ariaLabel='Criar nova coleção'>
                    Criar nova coleção
                </Button>
            }
        </>
    )
}


export default CreateCollectionButton