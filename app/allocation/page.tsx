'use client';

import HeaderRF6 from '../comparison/card/Header-RF6';

const AllocationPage = () => {
  return (
    <div>
      <HeaderRF6
        progress={30}
        category="category"
        question="Which project had the greatest impact on the OP Stack?"
        isFirstSelection={false}
      />
      <p className="mt-8 p-4"> Allocation page... </p>
    </div>
  );
};

export default AllocationPage;
