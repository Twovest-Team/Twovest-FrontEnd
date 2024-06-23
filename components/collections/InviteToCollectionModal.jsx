import Modal from '@/components/modals/Modal';
import CopyButton from '../buttons/icons/CopyButton';
import { createShareLink } from '@/utils/handlers/handleCollections';

const InviteToCollectionModal = ({ collectionId, collectionShareId }) => {

    const shareLink = createShareLink(collectionId, collectionShareId)

    return (
        <Modal id={`inviteToCollection${collectionId}`}>
            <div>
                <h1 className='font-semibold text-h6'>Convidar para a coleção</h1>
                <p className='text-secondary'>Copia o link para partilhares a coleção com outras pessoas.</p>
            </div>

            <div className='border h-14 px-6 rounded border-grey bg-grey_opacity_50 flex justify-between items-center'>
                <p className='text-secondary' >/invite/<span className='font-semibold'>{collectionShareId}</span></p>
                <CopyButton copy={shareLink} />
            </div>



        </Modal>
    )
}

export default InviteToCollectionModal