/* eslint-disable @stylistic/max-len */
import { IProject } from '../utils/types';

export const mockProject1: IProject = {
  id: 14,
  name: 'Lodestar',
  pollId: 1,
  url: null,
  description:
    'Lodestar is a Typescript ecosystem for Ethereum consensus, developed by ChainSafe Systems. Our flagship products are our production-capable beacon chain and validator client. In addition, we maintain public repositories of useful tools for public use. Some of these libraries include JS implementations for BLS, SSZ, Discv5, Gossipsub, Noise and Yamux. Our work contributes to the backbone infrastructure required to keep the Ethereum blockchain progressing within the rules as defined by the specification.\n\nLodestar’s niche is in its implementation language, TypeScript. Our software and tooling is uniquely situated as the go-to for researchers and developers for rapid prototyping such as our Prover, a verified web3 provider using light clients to increase decentralization and security of the JSON-RPC. Millions of developers around the world are familiar with Typescript, and Lodestar’s high-quality codebases are excellent introductions to the Ethereum protocol, with the goal of increasing client diversity and attracting new talent from one of the largest groups of developers in the world.',
  RPGF5Id: '0x716ad2474c6acff63481ec2283e01a2c4bef79250a1e85119324edae7b8d53ce',
  parentId: 1,
  image:
    'https://storage.googleapis.com/op-atlas/973ba7db-8101-405b-98a0-1f7d93a0f344.png',
  // @ts-ignore
  metadata: {
    id: '0x716ad2474c6acff63481ec2283e01a2c4bef79250a1e85119324edae7b8d53ce',
    applicationId:
        '0x716ad2474c6acff63481ec2283e01a2c4bef79250a1e85119324edae7b8d53ce',
    projectId:
        '0x8ec88058175ef4c1c9b1f26910c4d4f2cfa733d6fcd1dbd9385476a313d9e12d',
    category: 'Utility',
    applicationCategory: 'ETHEREUM_CORE_CONTRIBUTIONS',
    organization: null,
    name: 'Lodestar',
    description:
        'Lodestar is a Typescript ecosystem for Ethereum consensus, developed by ChainSafe Systems. Our flagship products are our production-capable beacon chain and validator client. In addition, we maintain public repositories of useful tools for public use. Some of these libraries include JS implementations for BLS, SSZ, Discv5, Gossipsub, Noise and Yamux. Our work contributes to the backbone infrastructure required to keep the Ethereum blockchain progressing within the rules as defined by the specification.\n\nLodestar’s niche is in its implementation language, TypeScript. Our software and tooling is uniquely situated as the go-to for researchers and developers for rapid prototyping such as our Prover, a verified web3 provider using light clients to increase decentralization and security of the JSON-RPC. Millions of developers around the world are familiar with Typescript, and Lodestar’s high-quality codebases are excellent introductions to the Ethereum protocol, with the goal of increasing client diversity and attracting new talent from one of the largest groups of developers in the world.',
    profileAvatarUrl:
        'https://storage.googleapis.com/op-atlas/973ba7db-8101-405b-98a0-1f7d93a0f344.png',
    projectCoverImageUrl:
        'https://storage.googleapis.com/op-atlas/3bb2834a-dcfd-4a71-ae2f-1e4fbef4209c.png',
    socialLinks: {
      website: [
        'https://lodestar.chainsafe.io',
        'https://github.com/ChainSafe/lodestar',
        'https://chainsafe.github.io/lodestar/',
        'https://chainsafe.io',
      ],
      farcaster: ['https://warpcast.com/lodestar'],
      twitter: 'https://x.com/lodestar_eth',
      mirror: '',
    },
    team: [
      {
        fid: 20822,
        object: 'user',
        pfp_url: 'https://i.imgur.com/NrXG60i.jpg',
        profile: {
          bio: {
            text: 'Building /ethereum to become the globally neutral settlement layer with @lodestar + @chainsafe | Follow us on /ethclients. | $ -> phil.fkey.id | 📸 with /pics',
          },
        },
        username: 'philknows',
        power_badge: false,
        display_name: 'Phil Ngo',
        active_status: 'inactive',
        verifications: ['0xdadd7c883288cfe2e257b0a361865e5e9349808b'],
        follower_count: 256,
        custody_address: '0x68cc36e836940897ea4ff562d33c3c949c361ae1',
        following_count: 117,
        verified_addresses: {
          eth_addresses: ['0xdadd7c883288cfe2e257b0a361865e5e9349808b'],
          sol_addresses: [],
        },
      },
    ],
    github: [
      {
        id: '',
        type: '',
        verified: false,
        openSource: true,
        containsContracts: false,
        createdAt: '',
        updatedAt: '',
        projectId: '',
        metrics: {
          artifact_url: '',
          trust_rank_for_repo_in_category: '19.0',
          num_contributors: '35.0',
          num_trusted_contributors: '2.0',
          num_contributors_last_6_months: '19.0',
          num_stars: '227',
          num_trusted_stars: '13.0',
          trust_weighted_stars: '0.0107888958114171',
          num_forks: '46',
          num_trusted_forks: '2.0',
          trust_weighted_forks: '0.0011979582433935',
          age_of_project_years: '2.0',
          license: 'AGPL-3.0',
        },
        url: 'https://github.com/ChainSafe/lodestar',
        name: 'Lodestar',
        description: 'TypeScript Implementation of Ethereum Consensus',
      },
    ],
    packages: [],
    links: [
      {
        url: 'https://explorer.rated.network/o/ChainSafe%20-%20Lido?network=mainnet&timeWindow=30d&idType=poolShare',
        name: 'ChainSafe Validator Metrics',
        description:
            'This page shows the performance of Lodestar as a validator client, run by ChainSafe infrastructure to support client diversity on mainnet validators via Lido.',
      },
      {
        url: 'https://probelab.io/ethereum/discv5/2024-34/',
        name: 'Probelab Discv5 Distribution',
        description:
            'This page represents the distribution of various user agents within the Ethereum discv5 DHT.',
      },
      {
        url: 'https://npm-stat.com/charts.html?package=%40chainsafe%2Flodestar&from=2021-06-26&to=2024-08-26',
        name: 'NPM Download Stats',
        description:
            'This mono-repository contains a suite of Ethereum Consensus packages.',
      },
    ],
    contracts: [],
    grantsAndFunding: {
      grants: [
        {
          grant: 'retroFunding',
          link: null,
          amount: '248448.21',
          date: '',
          details: null,
        },
        {
          grant: 'retroFunding',
          link: null,
          amount: '79662.51',
          date: '',
          details: null,
        },
      ],
      revenue: null,
      investment: [],
    } as any,
    pricingModel: { type: 'free', details: '' },
    impactStatement: {
      category: 'ETHEREUM_CORE_CONTRIBUTIONS',
      subcategory: [
        'Ethereum client implementations',
        'Ethereum test networks',
        'Infrastructure to test and deploy chains',
        'Research which informs Ethereum core development',
      ],
      statement: {
        create: [
          {
            answer:
              'Lodestar provides ongoing research, development and implementation of core infrastructure relied upon by OP Stack for consensus on Layer 1. Most notably, EIP-4844 (Shard Blob Transactions) has allowed for scaling Ethereum to allow L2s such as OP to utilize blob transactions instead of calldata for efficiencies in cost for utilizing Ethereum settlement. By contributing to the Typescript implementation, testing infrastructure and maintaining other libraries required for its success (such as nodeJS bindings for c-kzg), we were able to deliver this feature for the benefit of OP. In addition, EIPs such as EIP-4788 allows for embedding L1 beacon block roots into Layer 2 to reduce trust assumptions relating to Ethereum\'s consensus state. ',
            question:
              'How does your project support, or is a dependency of, the OP Stack?',
          },
          {
            answer:
              'Without the impact of Lodestar and its efforts to Ethereum protocol R&D, the specification would lack input from engineers familiar with the consensus specifications and how it impacts protocol implementation on a Typescript-based client. We regularly contribute to research, spec design, devnets, testnets and provide continuous infrastructure to support a increasingly larger network which requires more than one entity to provide stability and reliability, especially for networks where nothing is actually at stake (e.g. public testnets). ',
            question:
              'How would it impact the OP Stack if your project ceased to exist?',
          },
        ],
      } },
    testimonials: 'https://www.metricsgarden.xyz/projects/Lodestar',

  },
  createdAt: '2024-09-15T09:52:43.489Z',
  type: 'project',
  rating: null,
};

export const mockProject2: IProject = {
  id: 15,
  name: 'hevm',
  pollId: 1,
  url: '',
  description:
    'hevm is an open source, state-of-the art, fast symbolic and concrete EVM execution engine. It has a library interface and can be used as a component in high level tooling. It can be used stand-alone for ad-hoc analysis and symbolic unit test execution.',
  RPGF5Id: '0x43a266d84aa8ce67af3e6afc1bed4021fd7a06693e9eee94e1ef4767b429cc0d',
  parentId: 1,
  image:
    'https://storage.googleapis.com/op-atlas/d7cf4059-4f9c-48aa-a37a-df2f8c81933c.png',
  // @ts-ignore
  metadata: {
    id: '0x43a266d84aa8ce67af3e6afc1bed4021fd7a06693e9eee94e1ef4767b429cc0d',
    applicationId:
      '0x43a266d84aa8ce67af3e6afc1bed4021fd7a06693e9eee94e1ef4767b429cc0d',
    projectId:
      '0x2c97e213fef2bd3f30a71edf6ed48232640368d0083dc0a134a1b59391639bde',
    category: 'Utility',
    applicationCategory: 'ETHEREUM_CORE_CONTRIBUTIONS',
    organization: {
      name: 'Formal Verification @ Ethereum Foundation',
      description:
        'Ethereum Foundation team dedicated at developing Formal Verification Tools for Ethereum Smart Contracts',
      organizationAvatarUrl:
        'https://storage.googleapis.com/op-atlas/5b371001-feaf-4002-8671-c4314150460c.png',
      organizationCoverImageUrl: '',
      socialLinks: {
        website: ['https://fv.ethereum.org'],
        farcaster: [],
        twitter: '',
        mirror: '',
      },
      team: ['843949', '844134', '845018', '848682'],
    },
    name: 'hevm',
    description:
      'hevm is an open source, state-of-the art, fast symbolic and concrete EVM execution engine. It has a library interface and can be used as a component in high level tooling. It can be used stand-alone for ad-hoc analysis and symbolic unit test execution.',
    profileAvatarUrl:
      'https://storage.googleapis.com/op-atlas/d7cf4059-4f9c-48aa-a37a-df2f8c81933c.png',
    projectCoverImageUrl:
      'https://storage.googleapis.com/op-atlas/020d34f6-e8bb-43b5-8508-7935d2b00583.png',
    socialLinks: {
      website: ['https://hevm.dev/', 'https://github.com/ethereum/hevm/'],
      farcaster: [],
      twitter: '',
      mirror: '',
    },
    team: [
      {
        fid: 843949,
        object: 'user',
        pfp_url:
          'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/3c06e9f4-a279-46c8-95ca-8f442b82a800/rectcrop3',
        profile: { bio: { text: '' } },
        username: 'zoepar',
        power_badge: false,
        display_name: 'Zoe Par',
        active_status: 'inactive',
        verifications: [],
        follower_count: 0,
        custody_address: '0xa5ccabf951e698fdd5fb8351f209b67dfe800d57',
        following_count: 0,
        verified_addresses: { eth_addresses: [], sol_addresses: [] },
      },
      {
        fid: 844134,
        object: 'user',
        pfp_url:
          'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/2ecdf9e0-8529-4ed6-716f-ecb9b6087600/rectcrop3',
        profile: {
          bio: { text: 'Symbolic Execution, SAT solving, Model Counting' },
        },
        username: 'msoos',
        power_badge: false,
        display_name: 'Mate Soos',
        active_status: 'inactive',
        verifications: [
          '0x5e8c31a0fdc254703aa47f6a56acc841c7695f6c',
          '0x5e8c31a0fdc254703aa47f6a56acc841c7695f6c',
        ],
        follower_count: 1,
        custody_address: '0xaa0a0e3ea0377a068f5ddd1a97b88d37397d41ea',
        following_count: 0,
        verified_addresses: {
          eth_addresses: [
            '0x5e8c31a0fdc254703aa47f6a56acc841c7695f6c',
            '0x5e8c31a0fdc254703aa47f6a56acc841c7695f6c',
          ],
          sol_addresses: [],
        },
      },
      {
        fid: 845018,
        object: 'user',
        pfp_url:
          'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/7687568d-7499-457f-3d33-4457de55a800/rectcrop3',
        profile: { bio: { text: '' } },
        username: 'blishko',
        power_badge: false,
        display_name: 'blishko',
        active_status: 'inactive',
        verifications: [],
        follower_count: 0,
        custody_address: '0x85dc38e7ed932370fad4d865384401f3720e6099',
        following_count: 0,
        verified_addresses: { eth_addresses: [], sol_addresses: [] },
      },
      {
        fid: 848682,
        object: 'user',
        pfp_url:
          'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/d1157019-9a42-4db6-5c83-4082c1343e00/rectcrop3',
        profile: { bio: { text: '' } },
        username: 'dxo-',
        power_badge: false,
        display_name: 'dxo',
        active_status: 'inactive',
        verifications: [],
        follower_count: 0,
        custody_address: '0xa5543ddbb26700244b1b9b5f8721f204ca199abe',
        following_count: 0,
        verified_addresses: { eth_addresses: [], sol_addresses: [] },
      },
    ],
    github: [
      {
        id: '',
        type: '',
        verified: false,
        openSource: true,
        containsContracts: false,
        createdAt: '',
        updatedAt: '',
        projectId: '',
        url: 'https://github.com/ethereum/hevm',
        name: 'hevm',
        description: 'hevm source code',
        metrics: {
          artifact_url: '',
          trust_rank_for_repo_in_category: '19.0',
          num_contributors: '35.0',
          num_trusted_contributors: '2.0',
          num_contributors_last_6_months: '19.0',
          num_stars: '227',
          num_trusted_stars: '13.0',
          trust_weighted_stars: '0.0107888958114171',
          num_forks: '46',
          num_trusted_forks: '2.0',
          trust_weighted_forks: '0.0011979582433935',
          age_of_project_years: '2.0',
          license: 'AGPL-3.0',
        },
      },
    ],
    packages: [],
    links: [
      {
        url: 'https://hevm.dev/',
        name: 'hevm documentation and tutorial webpage',
        description: 'documentation and tutorials',
      },
    ],
    contracts: [],
    grantsAndFunding: {
      grants: [],
      revenue: null,
      investment: [],
    } as any,
    pricingModel: { type: 'free', details: '' },
    impactStatement: {
      category: 'ETHEREUM_CORE_CONTRIBUTIONS',
      subcategory: ['Ethereum client implementations'],
      statement: {
        create:
        [
          {
            answer:
            'The application of formal methods is widely recognized as one of the most effective techniques for ensuring correctness in software development. Symbolic execution is generally considered a best practice within smart contract development, as well as in traditional high assurance domains.\n\nhevm is a cutting edge symbolic execution engine for the EVM. Its library interface allows developers to build and experiment with new symbolic analysis tooling. It can be used to analyze programs deployed to any EVM based blockchain.\n\nhevm has been under active development since 2017. Since October 2023 we have made the following improvements:\n\n- Significant performance optimizations\n- Improved ux and documentation\n- A fully symbolic model for addresses\n- An abstract gas model\n- Support for the Cancun hardfork (WIP)\n- Expanded support for testing specific features ("cheat-codes")\n\nThese improvements make hevm faster, easier to use, and expand the range of programs that can be analyzed.',
            question:
            'How does your project support, or is a dependency of, the OP Stack?',
          },
          {
            answer:
            'OP stack developers would lose access to a powerful and cutting edge symbolic EVM implementation. Development of analysis tooling for the OP stack would become harder. Application developers targeting the OP stack would lose access to tools checking for safety and correctness.',
            question:
            'How would it impact the OP Stack if your project ceased to exist?',
          },
        ] },
    },
    testimonials: 'https://www.metricsgarden.xyz/projects/hevm',
  },
  createdAt: '2024-09-15T09:52:43.489Z',
  type: 'project',
  rating: 3,
};
