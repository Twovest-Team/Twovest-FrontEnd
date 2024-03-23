'use client'

import IconButton from "../buttons/icons/IconButton"
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch} from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";

const CreateCollectionButton = ({ isOwnCollections }) => {

    const dispatch = useAppDispatch();

    return (
        <>
            {isOwnCollections &&
                <IconButton
                    onClick={() => dispatch(openModal('createCollection'))}
                    icon={<AddIcon sx={{ fontSize: 25 }} />}
                />
            }
        </>
    )
}


export default CreateCollectionButton