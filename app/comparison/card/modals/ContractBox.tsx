import { useCollapse } from 'react-collapsed';
import { base, fraxtal, mode, optimism, zora } from 'viem/chains';
import Image from 'next/image';
import { ArrowDownIcon } from '@/public/assets/icon-components/ArrowDown';
import { ArrowUpIcon } from '@/public/assets/icon-components/ArrowUp';

interface IContractBoxProps {
  address: string
  chainId: number
  description: string
}

export const ContractBox = ({
  address,
  chainId,
  description,
}: IContractBoxProps) => {
  const { isExpanded, getToggleProps, getCollapseProps } = useCollapse();

  const chain = [optimism, base, mode, zora, fraxtal].find(
    c => c.id === Number(chainId)
  );
  const { name, blockExplorers } = chain ?? {};
  const { url } = blockExplorers?.default ?? {};
  const icon = `https://icons.llamao.fi/icons/chains/rsz_${
    name === 'Mode Mainnet' ? 'mode' : name?.toLowerCase()
  }.jpg`;

  const renderTitle = () => {
    const title = address || 'Contract';

    return (
      <a
        href={`${url}/address/${address}`}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-gray-700 hover:underline"
        onClick={e => e.stopPropagation()}
      >
        {title}
      </a>
    );
  };

  const renderIcon = () => {
    return (
      <Image
        src={icon}
        alt={name || chainId.toString()}
        width={20}
        height={20}
        className="rounded-full"
      />
    );
  };

  const shouldCollapse = description.length > 0;

  return (
    <div
      {...(shouldCollapse && getToggleProps())}
      className={`max-w-full rounded-lg border border-gray-200 bg-gray-50 p-2 ${
        shouldCollapse ? 'cursor-pointer' : ''
      }`}
    >
      <div
        className={`flex items-center justify-between ${
          isExpanded && shouldCollapse ? 'mb-4' : ''
        }`}
      >
        <div className="flex items-center gap-2">
          {renderIcon()}
          {renderTitle()}
        </div>
        {shouldCollapse && (
          <button className="text-sm text-gray-600 hover:underline">
            {isExpanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </button>
        )}
      </div>
      {shouldCollapse && (
        <section {...getCollapseProps()}>
          <p className="mb-2 text-gray-600">{description}</p>
        </section>
      )}
    </div>
  );
};
