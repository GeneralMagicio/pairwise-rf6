import { IProject, ProjectMetadata } from '../utils/types';

// @ts-ignore
const mockProjectMetadata1: ProjectMetadata = {
  id: '0x73543d9891641bb794f4bb0448d4ba190198400b12416ad2d1aeb9db926502b7',
  applicationId:
    '0x73543d9891641bb794f4bb0448d4ba190198400b12416ad2d1aeb9db926502b7',
  projectId:
    '0x98877a3c5f3d5eee496386ae93a23b17f0f51b70b3041b3c8226f98fbeca09ec',
  category: 'Governance',
  applicationCategory: 'GOVERNANCE_INFRA_AND_TOOLING',
  organization: null,
  name: 'Pairwise',
  description:
    'Pairwise was designed to make voting in Retro Funding simple and fun. Pairwise is an open-source, off-chain voting dapp (like Snapshot) that streamlines community signaling by letting users select between just two options and then aggregating their choices into a quantifiable result.\nPairwise is designed to be user-friendly and intuitive, allowing users to make many simple choices and then the algorithm behind the scenes pumps out a final ranking for them to adjust or approve. \n\n* RF3: Served as an alternative tool for creating lists and subcategories for 600+ projects.\n* RF4: Ran its own independent experiment enabling different stakeholder groups to signal how to distribute RF promoting project discovery with pseudonymous voting.\n* RF5: After our great work on RF4, we were invited to be an official voting option to gamify and simplify the badgeholder decision making process. Allowing Badgeholders to create their ballot using our app.',
  profileAvatarUrl:
    'https://storage.googleapis.com/op-atlas/7b641f97-44df-400e-a029-0b6c39e18820.png',
  projectCoverImageUrl:
    'https://storage.googleapis.com/op-atlas/0db1d5cb-679f-4704-b35e-b63c7a6da671.png',
  socialLinks: {
    website: ['https://www.pairwise.vote/'],
    farcaster: ['https://warpcast.com/pairwise'],
    twitter: 'https://x.com/pairwisevote',
    mirror: 'https://paragraph.xyz/@pairwise',
  },
  team: [
    {
      fid: 488597,
      object: 'user',
      pfp_url: 'https://i.imgur.com/UlhckK1.jpg',
      profile: {
        bio: {
          text: '🧙‍♂️Magician @Generalmagicio  |Building🔨with Friends| Donate🎁for free on @Giveth and get rewarded 🚀|',
        },
      },
      username: 'zeptimus',
      power_badge: false,
      display_name: 'ZeptimusQ',
      active_status: 'inactive',
      verifications: ['0x3ef1b0db4d10d2e3ce06699c0bd4ef0aaf897614'],
      follower_count: 15,
      custody_address: '0x7560d719a153cb61e84b8909d8b7b46d12cb4a3e',
      following_count: 17,
      verified_accounts: null,
      verified_addresses: {
        eth_addresses: ['0x3ef1b0db4d10d2e3ce06699c0bd4ef0aaf897614'],
        sol_addresses: [],
      },
    },
    {
      fid: 538276,
      object: 'user',
      pfp_url:
        'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/f3b720fc-fa13-4ed5-da38-f6947f900c00/rectcrop3',
      profile: {
        bio: {
          text: 'Designer, Etherean, Neo-Generalist. Head of Design @Generalmagicio // \nPrev @ConsenSys @SpruceID\n',
        },
      },
      username: 'markop',
      power_badge: false,
      display_name: 'Marko',
      active_status: 'inactive',
      verifications: ['0x6d97d65adff6771b31671443a6b9512104312d3d'],
      follower_count: 23,
      custody_address: '0x898ab2c944a521d6d415c2e1fa90fbc7a086fd4b',
      following_count: 83,
      verified_accounts: null,
      verified_addresses: {
        eth_addresses: ['0x6d97d65adff6771b31671443a6b9512104312d3d'],
        sol_addresses: [],
      },
    },
    {
      fid: 437679,
      object: 'user',
      pfp_url: 'https://i.imgur.com/dI7rZSq.jpg',
      profile: {
        bio: {
          text: 'Public Goods Maxi\nFounder: Giveth, General Magic, dappnode & Commons Stack\nDAO Delegate: ENS, Arbitrum, Optimism & more\nWill probably convince you $GIV is Good',
        },
      },
      username: 'griff.eth',
      power_badge: false,
      display_name: 'griff.eth',
      active_status: 'inactive',
      verifications: ['0x839395e20bbb182fa440d08f850e6c7a8f6f0780'],
      follower_count: 317,
      custody_address: '0x05bc36f838375e90dd3209006750498598f3c031',
      following_count: 152,
      verified_accounts: null,
      verified_addresses: {
        eth_addresses: ['0x839395e20bbb182fa440d08f850e6c7a8f6f0780'],
        sol_addresses: [],
      },
    },
    {
      fid: 10699,
      object: 'user',
      pfp_url: 'https://i.imgur.com/6K9w5Pt.jpg',
      profile: { bio: { text: '' } },
      username: 'krati',
      power_badge: false,
      display_name: 'Krati',
      active_status: 'inactive',
      verifications: ['0x44ac194359fa44ece6cb2e53e8c90547bccb95a0'],
      follower_count: 18,
      custody_address: '0xf62ec323ea6133a10c8c693a6938ac80cc4c9b1f',
      following_count: 5,
      verified_accounts: null,
      verified_addresses: {
        eth_addresses: ['0x44ac194359fa44ece6cb2e53e8c90547bccb95a0'],
        sol_addresses: [],
      },
    },
    {
      fid: 541145,
      object: 'user',
      pfp_url:
        'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/7e403808-5608-4105-4fc0-13c10254f000/original',
      profile: { bio: { text: '🎀✨🪷🦋' } },
      username: 'freshelle',
      power_badge: false,
      display_name: 'freshelle 🌷',
      active_status: 'inactive',
      verifications: ['0x38f80f8f76b1c44b2beefb63bb561f570fb6ddb6'],
      follower_count: 17,
      custody_address: '0xfb43e21ebe9351be89dc7d1a529b9af1aca8f460',
      following_count: 14,
      verified_accounts: null,
      verified_addresses: {
        eth_addresses: ['0x38f80f8f76b1c44b2beefb63bb561f570fb6ddb6'],
        sol_addresses: [],
      },
    },
    {
      fid: 765452,
      object: 'user',
      pfp_url:
        'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/eeb847d9-9bc3-407f-a8f7-2cf99a9ec600/rectcrop3',
      profile: { bio: { text: '' } },
      username: 'anamarija',
      power_badge: false,
      display_name: 'Anamarija',
      active_status: 'inactive',
      verifications: [],
      follower_count: 7,
      custody_address: '0xf9be421e3cf3f525db40f94b450c2e44865a27e1',
      following_count: 44,
      verified_accounts: null,
      verified_addresses: { eth_addresses: [], sol_addresses: [] },
    },
    {
      fid: 13970,
      object: 'user',
      pfp_url:
        'https://openseauserdata.com/files/e1bea8c8179d45fa024826cf35a6d803.svg',
      profile: {
        bio: {
          text: 'Designer at General Magic 🪄\nDM for design requests 💌\nayaz.me',
        },
      },
      username: 'ayaz',
      power_badge: false,
      display_name: 'Sk Ayaz',
      active_status: 'inactive',
      verifications: ['0x9d0a3e2b1669b9d272db2800dd55418837f21645'],
      follower_count: 66,
      custody_address: '0x457a528b600fae44c484e1ba2ba59d84c94f63a4',
      following_count: 57,
      verified_accounts: null,
      verified_addresses: {
        eth_addresses: ['0x9d0a3e2b1669b9d272db2800dd55418837f21645'],
        sol_addresses: [],
      },
    },
    {
      fid: 860410,
      object: 'user',
      pfp_url:
        'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/a54da47a-4ef0-46ef-7ea0-f315a1d57a00/rectcrop3',
      profile: { bio: { text: 'Product guy.' } },
      username: 'moenick',
      power_badge: false,
      display_name: 'Moenick',
      active_status: 'inactive',
      verifications: [],
      follower_count: 4,
      custody_address: '0xcf5d0405bf195268e5455c765f34ea55ff0e2ee2',
      following_count: 7,
      verified_accounts: null,
      verified_addresses: { eth_addresses: [], sol_addresses: [] },
    },
    {
      fid: 864191,
      object: 'user',
      pfp_url:
        'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/bca39fea-bb47-4ab0-6aee-3b4c2de79f00/rectcrop3',
      profile: {
        bio: { text: 'Software and computer science enthusiast' },
      },
      username: 'mahdiii',
      power_badge: false,
      display_name: 'Mahdi Ghajary',
      active_status: 'inactive',
      verifications: [],
      follower_count: 0,
      custody_address: '0x98dd50fdf93fe77007f20a98c5f5eb6432b6a5ef',
      following_count: 0,
      verified_accounts: null,
      verified_addresses: { eth_addresses: [], sol_addresses: [] },
    },
  ],
  github: [
    {
      url: 'https://github.com/GeneralMagicio',
      name: '',
      description: '',
    },
    {
      url: 'https://github.com/GeneralMagicio/pw-frontend',
      name: 'Pairwise RF 3 Frontend',
      description:
        'The open-source repository for Pairwise in Retro Funding 3, featuring a galaxy-themed frontend where badgeholders could rank projects and submit their ballots.',
    },
    {
      url: 'https://github.com/GeneralMagicio/pairwise-rf4',
      name: 'Pairwise RF4',
      description:
        'The open-source repository for Pairwise in Retro Funding 4, designed to promote project discovery and experiment with community involvement. It also includes the implementation of pseudonymous voting for the round and mobile UX.',
    },
    {
      url: 'https://github.com/GeneralMagicio/pw-backend',
      name: 'Pairwise RF 3 Backend',
      description:
        'The open-source repository for Pairwise in Retro Funding 3, containing the algorithm and backend work necessary to power the ranking system.',
    },
    {
      url: 'https://github.com/GeneralMagicio/pairwise-rf5',
      name: 'Pairwise RF5',
      description:
        'The open-source repository for Pairwise in Retro Funding 5, designed voting option to gamify and simplify the badgeholder decision making process, with star rating.',
    },
  ],
  packages: [],
  links: [],
  contracts: [],
  grantsAndFunding: {
    ventureFunding: [],
    grants: [
      {
        grant: 'token-house-mission',
        link: 'https://gov.optimism.io/t/final-pairwise-tinder-ux-for-web3-community-signaling/6142',
        amount: '95000',
        date: '2023-06-25',
        details:
          'Token House approved this grant with the goal of enhancing the RetroPGF process by using a fun and interactive UX for voting. Pairwise implements proven ranking algorithms, similar to chess and football, to help badgeholders efficiently signal impact. ',
      },
    ],
    revenue: [],
    retroFunding: [
      {
        grant: 'retroFunding',
        link: null,
        amount: '7805.18',
        date: '',
        details: 'Round 2',
      },
      {
        grant: 'retroFunding',
        link: null,
        amount: '96809.50',
        date: '',
        details: 'Round 3',
      },
    ],
  },
  pricingModel: 'free',
  impactStatement: {
    category: 'GOVERNANCE_INFRA_AND_TOOLING',
    subcategory: [
      'Governance Tooling::Tools which are used by Delegates or Citizens participate in Optimism Governance  tools which are used by Delegates and/or Citizens asuch as voting clients. Tools which support delegates and citizens insights into governance performance and history',
    ],
    statement: [
      {
        answer:
          'We developed Pairwise for RF3, and introduced category voting to make the impact measurement in the Retro Funding more organic and manageable.\n\nIn RF3, 185 users engaged, 27 badgeholders using their key.\n\nIn RF4, we expanded into a community experiment using pseudonymous voting with zk-tech. This allowed all stakeholders—badgeholders, token holders, recipients, and delegates—to participate freely without pressure and promote project discovery. We also distributed 4,000 OP as rewards, a 100OP to 40 lucky winners. Here you can find the [final results](https://www.pairwise.vote/rf4-results), and our [blog conclusions](https://paragraph.xyz/@pairwise) for more details on our outcomes.\n\nThe feedback from RF4 was very positive, leading to an invite to build with Optimism for RF5. For this round, we developed a star rating system, enabling participants to assign stars to projects before comparing them. This system grouped projects into tiers, significantly reducing the number of comparisons.',
        question:
          'How did your infrastructure or tooling support Optimism Governance?',
      },
      {
        answer:
          'The main target when developing the product were badgeholders, who can use Pairwise, to rank Retro Funding projects in a fun way that promotes project discovery.\n\nHowever, the entire Optimism community that used the app discovered impactful projects, bringing more visibility to emerging initiatives.\n\nProjects benefited from this increased exposure to potential users. Pairwise also sparks discussions by comparing its results to official ones, fostering deeper insights and driving more meaningful participation and progress to decentralization.\n\nThe foundation’s implementation of RetroFunding was clearly informed by our work and [feedback](https://gov.optimism.io/t/retropgf-round-3-feedback-thread/6177/150?u=griff). Enabling categorical voting, and ranking projects then adjusting percentages were done in Pairwise before they were considered to be implemented in RF5&RF6. Subtracting grant amounts and soliciting comments from badgeholders were also inspired by our work, but cut from scope.',
        question:
          'Who has benefited most from your infrastructure and tooling?',
      },
    ],
  },
  testimonials:
    'https://www.metricsgarden.xyz/projects/0x98877a3c5f3d5eee496386ae93a23b17f0f51b70b3041b3c8226f98fbeca09ec/contributions/0x98877a3c5f3d5eee496386ae93a23b17f0f51b70b3041b3c8226f98fbeca09ec',
  impactMetrics: {
    count_total_attestations: 15,
    count_citizen_attestations: 13,
    count_delegate_attestations: 4,
    avg_nps_score: 7.6,
    most_positive_superlative: false,
    cant_live_without_superlative: false,
    percentage_distributions: {
      citizens: {
        extremely_upset: 0.38461538461538464,
        somewhat_upset: 0.38461538461538464,
        neutral: 0.23076923076923078,
      },
      top_delegates: {
        extremely_upset: 0,
        somewhat_upset: 0.5,
        neutral: 0.5,
      },
    },
    elected_governance_reviews: {
      anticapture_commission: {
        count_attestations: 2,
        avg_pmf_score: 1,
        avg_nps_score: 4.5,
      },
      grants_council: {
        count_attestations: 3,
        avg_pmf_score: 1.3333333333333333,
        avg_nps_score: 5.666666666666667,
      },
    },
  },
};

// @ts-ignore
const mockProjectMetadata2: ProjectMetadata = {
  id: '0x7ebd785a295d691be7045ee2cb3b12e8fa6175bac58a8f285ede6221f8a4e906',
  applicationId:
    '0x7ebd785a295d691be7045ee2cb3b12e8fa6175bac58a8f285ede6221f8a4e906',
  projectId:
    '0x32942ffa0d751769bb55b53d9c32085463e9bfe668ae8aa5d4a736c46b4130c5',
  category: 'Governance',
  applicationCategory: 'GOVERNANCE_INFRA_AND_TOOLING',
  organization: {
    name: 'Agora',
    description:
      'Agora is the governance system of the Optimism Collective. Our application and contracts are also used widely by projects in Ethereum like ENS, Uniswap, and other superchain rollups like Cyber, and Lyra.',
    organizationAvatarUrl:
      'https://storage.googleapis.com/op-atlas/584ad1fc-960d-41fa-9318-322ee9ce4044.png',
    organizationCoverImageUrl:
      'https://storage.googleapis.com/op-atlas/a8863ac4-54de-4a29-840e-7c611ce41df1.png',
    socialLinks: {
      website: [
        'vote.optimism.io',
        'vote.uniswapfoundation.io',
        'agora.ensdao.org',
        'gov.cyber.co',
        'vote.lyra.finance',
        'agora.xyz',
      ],
      farcaster: ['https://warpcast.com/agora'],
      twitter: 'https://x.com/AgoraGovernance',
      mirror: '',
    },
    team: ['2610', '101', '5092', '192845'],
  },
  name: 'OP Governance App',
  description:
    'Agora built and maintains the voting application of the Optimism Token House. Over 70 proposals have been conducted through this interface we\'ve developed with an average of 8.7k voters on each vote.\n\nAgora developed unique capabilities for the Optimism Governor such as: \n1. Approval voting for multiple choice voting, typically used funding collective intents\n2. Optimistic voting, typically used for code of conduct enforcement.\n3. Multiple proposal types with unique quorums and approval thresholds that conform to the Collective\'s operating manual.\n\nWe\'ve also been continuously making UX improvements on the application such as:\n1. Displaying charts for vote progress\n2. Improving the UI to reduce the potential of error in casting approval votes\n3. Improving the proposal creation flow for the OP Foundation\n\nNote – all of Agora\'s projects are being worked on by our full team of 12 (viewable here https://www.agora.xyz/#About) Contributors listed on our projects are only the admins involved in completing our profile and do not represent the full headcount involved in projects.',
  profileAvatarUrl:
    'https://storage.googleapis.com/op-atlas/079112e8-c1a5-44eb-a4e8-339bdb2463f3.png',
  projectCoverImageUrl:
    'https://storage.googleapis.com/op-atlas/ab399434-c57c-4c78-95a7-f8a88ab6d443.png',
  socialLinks: {
    website: ['vote.optimism.io', 'agora.xyz'],
    farcaster: ['https://warpcast.com/agora'],
    twitter: 'https://x.com/AgoraGovernance',
    mirror: null,
  },
  team: [
    {
      fid: 5092,
      object: 'user',
      pfp_url:
        'https://i.seadn.io/gae/K_nUxh4Zv4thfyBlgr3e4WO1YXcWU_Eu5W1wApR-tsRjjk7b2fSn3CuRQmn7vILXbqYviV6J37o8eTfBjTYr_rc2l96Nee-qnor0Kqo?w=500&auto=format',
      profile: {
        bio: {
          text: 'Building Agora. Know lots about blockchain indexing. Bought Jack a coffee once. He refused it.',
        },
      },
      username: 'kent',
      power_badge: true,
      display_name: 'Kent {{Agora}}',
      active_status: 'inactive',
      verifications: ['0xc323ee1d28d2508667f4bebfc26f93c60abdd203'],
      follower_count: 1520,
      custody_address: '0x696b85acf6cef6b924b9acb15670a27eeec53643',
      following_count: 143,
      verified_accounts: null,
      verified_addresses: {
        eth_addresses: ['0xc323ee1d28d2508667f4bebfc26f93c60abdd203'],
        sol_addresses: [],
      },
    },
    {
      fid: 101,
      object: 'user',
      pfp_url:
        'https://lh3.googleusercontent.com/NQPf9r7QgvV3rzcGg1GOWzm5D6VNU8tlvkdoYtYEMwtCycXXP697UCR3ll4tNAfH6OYhiYhNkwgmHdkF0LfAKdMlAu3b160IPUGvsw',
      profile: { bio: { text: 'working on agora.xyz' } },
      username: 'yitong',
      power_badge: true,
      display_name: 'Yitong',
      active_status: 'inactive',
      verifications: ['0xc3fdadbae46798cd8762185a09c5b672a7aa36bb'],
      follower_count: 251275,
      custody_address: '0x2596e027e19d7122798284010f9575c0eb18bbea',
      following_count: 350,
      verified_accounts: null,
      verified_addresses: {
        eth_addresses: ['0xc3fdadbae46798cd8762185a09c5b672a7aa36bb'],
        sol_addresses: [],
      },
    },
    {
      fid: 2610,
      object: 'user',
      pfp_url: 'https://i.imgur.com/NhgO2VL.jpg',
      profile: {
        bio: {
          text: 'Building @agora agora.xyz ✨ Prev. clearco/fintech',
        },
      },
      username: 'charliecf',
      power_badge: false,
      display_name: 'Charlie Feng',
      active_status: 'inactive',
      verifications: ['0xfdfc6e1bbec01288447222fc8f1aee55a7c72b7b'],
      follower_count: 219,
      custody_address: '0x90125e26c9347636e40cb35662cee9a8974b9456',
      following_count: 86,
      verified_accounts: null,
      verified_addresses: {
        eth_addresses: ['0xfdfc6e1bbec01288447222fc8f1aee55a7c72b7b'],
        sol_addresses: [],
      },
    },
    {
      fid: 192845,
      object: 'user',
      pfp_url: 'https://i.imgur.com/4SRGUzd.jpg',
      profile: {
        bio: {
          text: 'I like walking around the city or out in nature 🌲',
        },
      },
      username: 'marcela',
      power_badge: false,
      display_name: 'Marcela Ochoa',
      active_status: 'inactive',
      verifications: ['0x8edce2d4d2a7892f93017eeb43e9742460547ec0'],
      follower_count: 86,
      custody_address: '0x4dc002815234944872e46a4c2f133f059443e79a',
      following_count: 179,
      verified_accounts: null,
      verified_addresses: {
        eth_addresses: ['0x8edce2d4d2a7892f93017eeb43e9742460547ec0'],
        sol_addresses: [],
      },
    },
  ],
  github: [
    {
      url: 'https://github.com/voteagora/agora-next',
      name: 'Agora Next',
      description:
        'This repo contains the code for the voting application of the Optimism Token House Governance.',
    },
  ],
  packages: [],
  links: [
    {
      url: 'https://vote.optimism.io/',
      name: 'Optimism Token House website',
      description:
        'The Optimism Token House voting interface shows all the votes that have been conducted on the Optimism Governor.\n\nIn total, more than 70 votes have been conducted with an average of 8700 addresses voting per proposal.',
    },
  ],
  contracts: [],
  grantsAndFunding: {
    ventureFunding: [
      {
        amount: '1m-5m',
        year: '2024',
        details:
          'Raised strategic seed round to allow us to work with more protocols, hire more engs, and build more open source code.',
      },
    ],
    grants: [
      {
        grant: 'foundation-mission',
        link: 'https://github.com/ethereum-optimism/ecosystem-contributions/issues/64#issuecomment-1634588737',
        amount: '400000',
        date: '2023-07-13',
        details:
          'Note – Agora has disclosed all grants and funding received by our entire organization on every project. We ask voters to please evaluate the sum of our contributions against the sum of our funding.',
      },
    ],
    revenue: [],
    retroFunding: [
      {
        grant: 'retroFunding',
        link: null,
        amount: '101992.05',
        date: '',
        details: 'Round 2',
      },
      {
        grant: 'retroFunding',
        link: null,
        amount: '150000',
        date: '',
        details: 'Round 3',
      },
    ],
  },
  pricingModel: 'freemium',
  impactStatement: {
    category: 'GOVERNANCE_INFRA_AND_TOOLING',
    subcategory: [
      'Governance Infrastructure::Technical infrastructure which powers the voting process within Optimism Governance',
      'Governance Tooling::Tools which are used by Delegates or Citizens participate in Optimism Governance  tools which are used by Delegates and/or Citizens asuch as voting clients. Tools which support delegates and citizens insights into governance performance and history',
      'Grants Tooling::Tools which support the Token House mission process, including the operation of the grants council. Tools which power or support the Retro Funding process.',
    ],
    statement: [
      {
        answer:
          'The OP governance app (vote.optimism.io) is how users interact with the contracts powering the core logic of Token House voting. From Oct 1, 2023 - September 18th 2024, around 50 proposals were created and voted on by an average of 8.7k voters each. \n\nThese proposals have ranged from critical protocol upgrades for OP like Fault Proofs to mission requests allocating millions of OP to fund the Collective\'s intents.\n\nDuring this period, we\'ve also introduced several major innovations to the voting app that\'s made the OP token house UX better, such as:\n\n1. Improving the approval voting experience to reduce the error rate\n2. Improving the proposal creation flow to make the process easier to manage',
        question:
          'How did your infrastructure or tooling support Optimism Governance?',
      },
      {
        answer:
          'Token House voters: delegates vote on proposals on the app\n\nOP foundation: the foundation manage creates proposals on the app\n\nMission request recipients: all intents and mission requests are funded using an approval vote.\n\nGrant council, Security Council, Developer advisory board: all committees on Optimism are appointed through the use of an approval vote.',
        question:
          'Who has benefited most from your infrastructure and tooling?',
      },
    ],
  },
  testimonials:
    'https://www.metricsgarden.xyz/projects/0x32942ffa0d751769bb55b53d9c32085463e9bfe668ae8aa5d4a736c46b4130c5/contributions/0x32942ffa0d751769bb55b53d9c32085463e9bfe668ae8aa5d4a736c46b4130c5',
  impactMetrics: {
    count_total_attestations: 11,
    count_citizen_attestations: 10,
    count_delegate_attestations: 3,
    avg_nps_score: 8.909090909090908,
    most_positive_superlative: false,
    cant_live_without_superlative: false,
    percentage_distributions: {
      citizens: {
        extremely_upset: 0.6,
        somewhat_upset: 0.4,
        neutral: 0,
      },
      top_delegates: {
        extremely_upset: 0.6666666666666666,
        somewhat_upset: 0.3333333333333333,
        neutral: 0,
      },
    },
    elected_governance_reviews: {
      anticapture_commission: {
        count_attestations: 2,
        avg_pmf_score: 3,
        avg_nps_score: 10,
      },
      grants_council: {
        count_attestations: 1,
        avg_pmf_score: 3,
        avg_nps_score: 10,
      },
    },
  },
};

export const mockProject1: IProject = {
  aiSummary: [],
  description: mockProjectMetadata1.description,
  metadata: mockProjectMetadata1,
  id: 10,
  image: '',
  parentId: 1,
  name: mockProjectMetadata1.name,
  rating: 3,
  RF6Id: mockProjectMetadata1.id,
  pollId: 1,
  type: 'project',
  url: '',
  createdAt: '',
};

export const mockProject2: IProject = {
  aiSummary: [],
  description: mockProjectMetadata2.description,
  metadata: mockProjectMetadata2,
  id: 20,
  image: '',
  parentId: 1,
  name: mockProjectMetadata2.name,
  rating: 3,
  RF6Id: mockProjectMetadata2.id,
  pollId: 1,
  type: 'project',
  url: '',
  createdAt: '',
};
