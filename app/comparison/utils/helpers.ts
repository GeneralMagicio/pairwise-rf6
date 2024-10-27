import { JWTPayload } from '@/app/utils/wallet/types';

export const convertCategoryNameToId = (category: JWTPayload['category']) => {
  switch (category) {
    case 'GOVERNANCE_LEADERSHIP':
      return 1;
    case 'GOVERNANCE_INFRA_AND_TOOLING':
      return 2;
    case 'GOVERNANCE_ANALYTICS':
      return 3;
    default:
      throw new Error(`Invalid category name: ${category}`);
  }
};

export const convertCategoryToLabel = (category: JWTPayload['category']) => {
  const labels = {
    GOVERNANCE_LEADERSHIP: 'Governance Leadership',
    GOVERNANCE_INFRA_AND_TOOLING: 'Governance Infrastructure & Tooling',
    GOVERNANCE_ANALYTICS: 'Governance Analytics',
  };

  if (!(category in labels)) throw new Error ('Invalid category name');

  return labels[category];
};

export const categoryIdSlugMap = new Map([
  [1, 'GOVERNANCE_LEADERSHIP'],
  [2, 'GOVERNANCE_INFRA_AND_TOOLING'],
  [3, 'GOVERNANCE_ANALYTICS'],
]);

export const categoryIdTitleMap = new Map([
  [1, 'Governance Leadership'],
  [2, 'Governance Infrastructure & Tooling'],
  [3, 'Governance Analytics'],
]);

export const categorySlugIdMap = new Map([
  ['GOVERNANCE_LEADERSHIP', 1],
  ['GOVERNANCE_INFRA_AND_TOOLING', 2],
  ['GOVERNANCE_ANALYTICS', 3],
]);

// export const getCategoryCount = (category: JWTPayload['category']) => {
//   const labels = {
//     GOVERNANCE_LEADERSHIP: 30,
//     GOVERNANCE_INFRA_AND_TOOLING: 29,
//     GOVERNANCE_ANALYTICS: 20,
//   };
//   return category in labels ? labels[category] : 30;
// };

export function shortenWalletAddress(
  address: string,
  startLength: number = 7,
  endLength: number = 7
): string {
  // Check if the address is valid (starts with '0x' and has 42 characters)
  if (!address.startsWith('0x') || address.length !== 42) {
    throw new Error('Invalid wallet address format');
  }

  // Ensure start and end lengths are not greater than half the remaining address length
  const maxLength = Math.floor((address.length - 2) / 2);
  startLength = Math.min(startLength, maxLength);
  endLength = Math.min(endLength, maxLength);

  // Extract the start and end parts of the address
  const start = address.slice(0, startLength);
  const end = address.slice(-endLength);

  // Combine the parts with ellipsis
  return `${start}...${end}`;
}

export function formatBudget(budget: number | undefined): string {
  if (budget === undefined) {
    return 'N/A';
  }
  return budget.toLocaleString('en-US');
}
