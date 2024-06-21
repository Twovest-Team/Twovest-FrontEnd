import Modal from '@/components/modals/Modal';
import CopyButton from '../buttons/icons/CopyButton';
import { createShareLink } from '@/utils/handlers/handleCollections';

const InviteToCollectionModal = ({ collectionId, collectionShareId }) => {

    const shareLink = createShareLink(collectionId, collectionShareId)

    return (
        <Modal id={`inviteToCollection${collectionId}`}>
            <div>
                <h1 className='font-semibold text_h6'>Convidar para a coleção</h1>
                <p className='text-secondary'>Copia o link para partilhares a coleção com outras pessoas.</p>
            </div>

            <p>{shareLink}</p>
            <CopyButton copy={shareLink} />

        </Modal>
    )
}

export default InviteToCollectionModal