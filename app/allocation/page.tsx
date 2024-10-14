'use client';

import { useState } from 'react';
import HeaderRF6 from '../comparison/card/Header-RF6';
import Modal from '../utils/Modal';
import EmailLoginModal from './EOA/EmailLoginModal';

const AllocationPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(true);

  return (
    <div>
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <EmailLoginModal closeModal={() => setShowLoginModal(false)} />
      </Modal>
      <HeaderRF6
        progress={30}
        category={'category'}
        question="Which project had the greatest impact on the OP Stack?"
        isFirstSelection={false}
      />
      <p className="mt-8 p-4"> Allocation page... </p>
    </div>
  );
};

export default AllocationPage;
