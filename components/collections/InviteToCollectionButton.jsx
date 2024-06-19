'use client'

import { useAppDispatch } from '@/redux/hooks';
import IconButton from '../buttons/icons/IconButton';
import { openModal } from '@/redux/slices/modalSlice';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import InviteToCollectionModal from './InviteToCollectionModal';

const InviteToCollectionButton = (props) => {

  const dispatch = useAppDispatch()

  return (
    <>
      <IconButton
        icon={<PersonAddOutlinedIcon />}
        onClick={() => dispatch(openModal(`inviteToCollection${props.collectionId}`))}
      />

      <InviteToCollectionModal {...props} />
    </>
  )
}

export default InviteToCollectionButton