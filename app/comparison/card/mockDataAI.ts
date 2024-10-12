import { ProjectAiSummary } from '../utils/types';

export const mockDataAI: ProjectAiSummary = [
  {
    subHeader: 'Project Overview',
    points: [
      'Lodestar is a TypeScript ecosystem for Ethereum consensus, developed by ChainSafe Systems',
      'Flagship products include production-capable beacon chain and validator client',
      `Maintains public repositories of useful tools like JS implementations for BLS, SSZ,
       Discv5, Gossipsub, Noise, and Yamux`,
    ],
  },
  {
    subHeader: 'Key Impacts',
    points: [
      'Contributes to Ethereum core development, including implementation of EIP-4844 and EIP-4788',
      'Supports OP Stack by providing core infrastructure for consensus on Layer 1',
      'Enhances client diversity and attracts new talent to Ethereum ecosystem',
    ],
  },
  {
    subHeader: 'Metrics and Funding',
    points: [
      'Received retroactive funding grants totaling $328,110.72',
      'NPM download stats available for Lodestar packages',
      'Performance as validator client tracked on Rated Network explorer',
    ],
  },
  {
    subHeader: 'Community and Resources',
    points: [
      'Active on social platforms including Twitter and Farcaster',
      'GitHub repository available with TypeScript implementation of Ethereum Consensus',
      'Provides free access to its software and tools',
    ],
  },
];

export const mockDataAI2: ProjectAiSummary = [
  {
    subHeader: 'Project Overview',
    points: [
      'hevm is an open-source, state-of-the-art EVM execution engine',
      'Developed by the Formal Verification team at Ethereum Foundation',
      'Supports both symbolic and concrete execution for smart contract analysis',
    ],
  },
  {
    subHeader: 'Key Features and Improvements',
    points: [
      'Library interface for integration into high-level tooling',
      'Significant performance optimizations since October 2023',
      'Added fully symbolic model for addresses and abstract gas model',
      'Expanded support for testing specific features (\'cheat-codes\')',
    ],
  },
  {
    subHeader: 'Impact on Ethereum Ecosystem',
    points: [
      'Enhances smart contract development with symbolic execution capabilities',
      'Crucial for ensuring correctness and safety in EVM-based blockchain applications',
      'Supports development of analysis tooling for OP Stack and other EVM-compatible chains',
    ],
  },
  {
    subHeader: 'GitHub Metrics',
    points: [
      '227 stars and 46 forks on GitHub',
      '35 contributors, with 19 active in the last 6 months',
      'Project age: 2 years, licensed under AGPL-3.0',
    ],
  },
];
