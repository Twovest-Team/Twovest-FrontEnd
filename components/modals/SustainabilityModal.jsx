'use client'

import Modal from "./Modal"
import imagePath from '@/public/static/images/sustainability/sustainability_modal_bg.jpg'

const SustainabilityModal = () => {
    return (
        <Modal size='md' id='sustainableProduct' imageSrc={imagePath}>
            <div className="min-h-[300px]">
                <h1 className="text-h5">Artigo sustentável</h1>
                <p className="text-secondary">Mais sustentável, mais bónus</p>
            </div>

        </Modal>
    )
}

export default SustainabilityModal