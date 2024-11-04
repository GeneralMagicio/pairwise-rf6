'use client';

import HeaderRF6 from '@/app/comparison/card/Header-RF6';
import { fetchDailyDelegations, fetchDelegations, IGetDelegationsResponse } from '@/app/getDelegations/utils';

const GetDelegations = () => {
  const getDailyDelegations = async () => {
    const delegations = await fetchDailyDelegations();
    handleDownload(delegations);
  };

  const getDelegations = async () => {
    const delegations = await fetchDelegations();
    handleDownload(delegations);
  };

  const handleDownload = (list: IGetDelegationsResponse[]) => {
    if (list.length === 0) {
      window.alert('No delegations found!');
      return;
    }
    const headers = Object.keys(list[0]);
    const rows = list.map(row => Object.values(row));
    const csvContent = [
      headers.join(','), // Add headers
      ...rows.map(row => row.join(',')), // Add each row
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'data.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <HeaderRF6 />
      <div className="mt-5 text-center">
        <button
          onClick={getDailyDelegations}
          className="m-3 gap-4 rounded-md
         border border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-100"
        >
          Get Daily Delegations
        </button>
        <button
          onClick={getDelegations}
          className="m-3 gap-4 rounded-md border
         border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-100"
        >
          Get Total Delegations
        </button>
      </div>
    </div>
  );
};

export default GetDelegations;
