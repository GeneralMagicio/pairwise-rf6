import { JWTPayload } from '@/app/utils/wallet/types';

export const convertCategoryNameToId = (category: JWTPayload['category']) => {
  switch (category) {
    case 'OP_STACK_RESEARCH_AND_DEVELOPMENT':
      return 1;
    case 'ETHEREUM_CORE_CONTRIBUTIONS':
      return 2;
    case 'OP_STACK_TOOLING':
      return 3;
    default:
      throw new Error(`Invalid category name: ${category}`);
  }
};

export const convertCategoryToLabel = (category: JWTPayload['category']) => {
  const labels = {
    ETHEREUM_CORE_CONTRIBUTIONS: 'Ethereum Core Contributors',
    OP_STACK_RESEARCH_AND_DEVELOPMENT: 'OP Stack R&D',
    OP_STACK_TOOLING: 'OP Stack Tooling',
  };
  return labels[category] || 'OP Stack';
};

export const categoryIdSlugMap = new Map([
  [1, 'OP_STACK_RESEARCH_AND_DEVELOPMENT'],
  [2, 'ETHEREUM_CORE_CONTRIBUTIONS'],
  [3, 'OP_STACK_TOOLING'],
]);

export const categoryIdTitleMap = new Map([
  [1, 'OP Stack R&D'],
  [2, 'Ethereum Core Contributors'],
  [3, 'OP Stack Tooling'],
]);

export const categorySlugIdMap = new Map([
  ['OP_STACK_RESEARCH_AND_DEVELOPMENT', 1],
  ['ETHEREUM_CORE_CONTRIBUTIONS', 2],
  ['OP_STACK_TOOLING', 3],
]);

export const getCategoryCount = (category: JWTPayload['category']) => {
  const labels = {
    ETHEREUM_CORE_CONTRIBUTIONS: 30,
    OP_STACK_RESEARCH_AND_DEVELOPMENT: 29,
    OP_STACK_TOOLING: 20,
  };
  return category in labels ? labels[category] : 30;
};

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
