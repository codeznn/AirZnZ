import { useState } from 'react'
import { Modal } from '../../context/Modal';
import SpotReviewForm from './SpotReviewForm'
import'./SpotReviewForm.css'

function SpotReviewFormModal({ spot }) {
    const [showModal, setShowModal] = useState(false)

    return(
        <>
            <div onClick={() => setShowModal(true)}>{spot.numReviews} reviews</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SpotReviewForm spot={spot} />
                </Modal>
            )}
        </>
    )
}

export default SpotReviewFormModal
