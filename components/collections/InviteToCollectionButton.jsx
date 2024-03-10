'use client'

import { useAppDispatch } from '@/redux/hooks';
import IconButton from '../buttons/icons/IconButton';
import Modal from '@/components/modals/Modal';
import { openModal } from '@/redux/slices/modalSlice';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import CopyButton from '../buttons/icons/CopyButton';
import { createShareLink } from '@/utils/handleCollections';

const InviteToCollectionButton = ({ collectionId, collectionShareId }) => {

  const dispatch = useAppDispatch()
  const shareLink = createShareLink(collectionId, collectionShareId)

  return (
    <>
      <IconButton
        icon={<PersonAddOutlinedIcon />}
        onClick={() => dispatch(openModal(`inviteToCollection${collectionId}`))}
      />

      <Modal id={`inviteToCollection${collectionId}`}>
        <div>
          <h6 className='font-semibold'>Convidar para a coleção</h6>
          <p className='text-secondary'>Copia o link para partilhares a coleção com outras pessoas.</p>
        </div>

        <p>{shareLink}</p>
        <CopyButton copy={shareLink} />

      </Modal>
    </>



  )
}

export default InviteToCollectionButton