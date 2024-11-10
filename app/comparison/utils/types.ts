export type ProjectMetadata = ({
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: string[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: string[]
    twitter: string
    mirror: string
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: {
      platform: string
      username: string
    }[]
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  }[]
  github: any[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: {
      amount: string
      year: string
      details: string
    }[]
    grants: any[]
    revenue: any[]
    retroFunding: any[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    count_delegate_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
    }
    elected_governance_reviews: {
      grants_council?: undefined
      anticapture_commission?: undefined
    }
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: string[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: string[]
    twitter: string
    mirror: string
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: {
      platform: string
      username: string
    }[]
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  }[]
  github: any[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: {
      amount: string
      year: string
      details: string
    }[]
    grants: any[]
    revenue: any[]
    retroFunding: any[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: null
        somewhat_upset: null
        neutral: null
      }
    }
    elected_governance_reviews: {
      grants_council?: undefined
      anticapture_commission?: undefined
    }
    count_delegate_attestations?: undefined
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: string[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: string[]
    twitter: string
    mirror: string
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: {
      platform: string
      username: string
    }[]
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: string[]
    }
  }[]
  github: any[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: {
      amount: string
      year: string
      details: string
    }[]
    grants: {
      grant: string
      link: string
      amount: string
      date: string
      details: string
    }[]
    revenue: any[]
    retroFunding: {
      grant: string
      link: null
      amount: string
      date: string
      details: string
    }[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    count_delegate_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
    }
    elected_governance_reviews: {
      grants_council: {
        count_attestations: number
        avg_pmf_score: number
        avg_nps_score: number
      }
      anticapture_commission?: undefined
    }
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: any[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: any[]
    twitter: string
    mirror: string
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  }[]
  github: any[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: {
      amount: string
      year: string
      details: string
    }[]
    grants: any[]
    revenue: any[]
    retroFunding: {
      grant: string
      link: null
      amount: string
      date: string
      details: string
    }[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: null
        somewhat_upset: null
        neutral: null
      }
    }
    elected_governance_reviews: {
      grants_council?: undefined
      anticapture_commission?: undefined
    }
    count_delegate_attestations?: undefined
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: string[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: string[]
    twitter: string
    mirror: string
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  }[]
  github: {
    url: string
    name: string
    description: string
  }[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: any[]
    grants: {
      grant: string
      link: string
      amount: string
      date: string
      details: string
    }[]
    revenue: any[]
    retroFunding: {
      grant: string
      link: null
      amount: string
      date: string
      details: string
    }[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics?: undefined
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: any[]
      twitter: string
      mirror: null
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: any[]
    twitter: string
    mirror: null
  }
  team: ({
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: {
      platform: string
      username: string
    }[]
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  } | {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: string[]
    }
  })[]
  github: any[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: any[]
    grants: {
      grant: string
      link: string
      amount: string
      date: string
      details: string
    }[]
    revenue: any[]
    retroFunding: any[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics?: undefined
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: string[]
      twitter: string
      mirror: null
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: any[]
    twitter: null
    mirror: string
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  }[]
  github: any[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: any[]
    grants: {
      grant: string
      link: string
      amount: string
      date: string
      details: string
    }[]
    revenue: any[]
    retroFunding: any[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: null
        somewhat_upset: null
        neutral: null
      }
    }
    elected_governance_reviews: {
      grants_council: {
        count_attestations: number
        avg_pmf_score: number
        avg_nps_score: number
      }
      anticapture_commission?: undefined
    }
    count_delegate_attestations?: undefined
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: string[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: string[]
    twitter: string
    mirror: string
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: {
      platform: string
      username: string
    }[]
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: string[]
    }
  }[]
  github: {
    url: string
    name: string
    description: string
  }[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: {
      amount: string
      year: string
      details: string
    }[]
    grants: {
      grant: string
      link: string
      amount: string
      date: string
      details: string
    }[]
    revenue: any[]
    retroFunding: {
      grant: string
      link: null
      amount: string
      date: string
      details: string
    }[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    count_delegate_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
    }
    elected_governance_reviews: {
      anticapture_commission: {
        count_attestations: number
        avg_pmf_score: number
        avg_nps_score: number
      }
      grants_council: {
        count_attestations: number
        avg_pmf_score: number
        avg_nps_score: number
      }
    }
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: string[]
      twitter: string
      mirror: null
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: string[]
    twitter: string
    mirror: string
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: string[]
    }
  }[]
  github: {
    url: string
    name: string
    description: string
  }[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: {
    address: string
    deploymentTxHash: string
    deployerAddress: string
    verificationProof: string
    chainId: number
  }[]
  grantsAndFunding: {
    ventureFunding: any[]
    grants: {
      grant: string
      link: string
      amount: string
      date: string
      details: string
    }[]
    revenue: any[]
    retroFunding: any[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    count_delegate_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
    }
    elected_governance_reviews: {
      grants_council?: undefined
      anticapture_commission?: undefined
    }
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: string[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: string[]
    twitter: string
    mirror: null
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  }[]
  github: any[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: {
      amount: string
      year: string
      details: string
    }[]
    grants: {
      grant: string
      link: string
      amount: string
      date: string
      details: string
    }[]
    revenue: any[]
    retroFunding: {
      grant: string
      link: null
      amount: string
      date: string
      details: string
    }[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    count_delegate_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
    }
    elected_governance_reviews: {
      grants_council?: undefined
      anticapture_commission?: undefined
    }
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: string[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: any[]
    twitter: null
    mirror: null
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  }[]
  github: {
    url: string
    name: string
    description: string
  }[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: any[]
    grants: any[]
    revenue: any[]
    retroFunding: {
      grant: string
      link: null
      amount: string
      date: string
      details: string
    }[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    count_delegate_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
    }
    elected_governance_reviews: {
      grants_council?: undefined
      anticapture_commission?: undefined
    }
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: string[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: string[]
    twitter: string
    mirror: null
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  }[]
  github: {
    url: string
    name: string
    description: string
  }[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: {
      amount: string
      year: string
      details: string
    }[]
    grants: {
      grant: string
      link: string
      amount: string
      date: string
      details: string
    }[]
    revenue: any[]
    retroFunding: {
      grant: string
      link: null
      amount: string
      date: string
      details: string
    }[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    count_delegate_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
    }
    elected_governance_reviews: {
      anticapture_commission: {
        count_attestations: number
        avg_pmf_score: number
        avg_nps_score: number
      }
      grants_council?: undefined
    }
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: any[]
      farcaster: any[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: any[]
    twitter: string
    mirror: null
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  }[]
  github: any[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: {
      amount: string
      year: string
      details: string
    }[]
    grants: any[]
    revenue: any[]
    retroFunding: {
      grant: string
      link: null
      amount: string
      date: string
      details: string
    }[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics?: undefined
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: string[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: string[]
    twitter: string
    mirror: string
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  }[]
  github: {
    url: string
    name: string
    description: string
  }[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: {
    address: string
    deploymentTxHash: string
    deployerAddress: string
    verificationProof: string
    chainId: number
  }[]
  grantsAndFunding: {
    ventureFunding: any[]
    grants: {
      grant: string
      link: string
      amount: string
      date: string
      details: string
    }[]
    revenue: any[]
    retroFunding: {
      grant: string
      link: null
      amount: string
      date: string
      details: string
    }[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    count_delegate_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
    }
    elected_governance_reviews: {
      anticapture_commission: {
        count_attestations: number
        avg_pmf_score: number
        avg_nps_score: number
      }
      grants_council: {
        count_attestations: number
        avg_pmf_score: number
        avg_nps_score: number
      }
    }
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: any[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: any[]
    twitter: null
    mirror: null
  }
  team: ({
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: string[]
    }
  } | {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: {
      platform: string
      username: string
    }[]
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  })[]
  github: any[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: any[]
    grants: {
      grant: string
      link: string
      amount: string
      date: string
      details: string
    }[]
    revenue: any[]
    retroFunding: any[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics?: undefined
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: string[]
      twitter: string
      mirror: null
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: string[]
    twitter: string
    mirror: null
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  }[]
  github: any[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: {
      amount: string
      year: string
      details: string
    }[]
    grants: {
      grant: string
      link: string
      amount: string
      date: string
      details: string
    }[]
    revenue: any[]
    retroFunding: any[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: null
        somewhat_upset: null
        neutral: null
      }
    }
    elected_governance_reviews: {
      anticapture_commission: {
        count_attestations: number
        avg_pmf_score: number
        avg_nps_score: number
      }
      grants_council: {
        count_attestations: number
        avg_pmf_score: number
        avg_nps_score: number
      }
    }
    count_delegate_attestations?: undefined
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: any[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: any[]
    twitter: string
    mirror: null
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: any[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: any[]
      sol_addresses: any[]
    }
  }[]
  github: {
    url: string
    name: string
    description: string
  }[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: any[]
    grants: any[]
    revenue: any[]
    retroFunding: any[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    count_delegate_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
    }
    elected_governance_reviews: {
      grants_council?: undefined
      anticapture_commission?: undefined
    }
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: null
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: string[]
    twitter: string
    mirror: null
  }
  team: null
  github: {
    url: string
    name: string
    description: string
  }[]
  packages: {
    url: string
    name: null
    description: null
  }[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: {
    address: string
    deploymentTxHash: string
    deployerAddress: string
    verificationProof: string
    chainId: number
  }[]
  grantsAndFunding: {
    ventureFunding: {
      amount: string
      year: string
      details: string
    }[]
    grants: {
      grant: string
      link: string
      amount: string
      date: string
      details: string
    }[]
    revenue: any[]
    retroFunding: {
      grant: string
      link: null
      amount: string
      date: string
      details: string
    }[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics?: undefined
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: string[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: any[]
    farcaster: any[]
    twitter: null
    mirror: null
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: {
      platform: string
      username: string
    }[]
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  }[]
  github: {
    url: string
    name: string
    description: string
  }[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: any[]
    grants: any[]
    revenue: any[]
    retroFunding: any[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics?: undefined
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: null
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: string[]
    twitter: string
    mirror: null
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: string[]
    }
  }[]
  github: {
    url: string
    name: string
    description: string
  }[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: any[]
    grants: any[]
    revenue: any[]
    retroFunding: any[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: null
        somewhat_upset: null
        neutral: null
      }
    }
    elected_governance_reviews: {
      grants_council?: undefined
      anticapture_commission?: undefined
    }
    count_delegate_attestations?: undefined
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: any[]
      farcaster: string[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: string[]
    twitter: string
    mirror: string
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: {
      platform: string
      username: string
    }[]
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: string[]
    }
  }[]
  github: {
    url: string
    name: string
    description: string
  }[]
  packages: any[]
  links: any[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: any[]
    grants: any[]
    revenue: any[]
    retroFunding: any[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: null
        somewhat_upset: null
        neutral: null
      }
    }
    elected_governance_reviews: {
      grants_council?: undefined
      anticapture_commission?: undefined
    }
    count_delegate_attestations?: undefined
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: null
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: string[]
    twitter: string
    mirror: null
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  }[]
  github: {
    url: string
    name: string
    description: string
  }[]
  packages: any[]
  links: any[]
  contracts: {
    address: string
    deploymentTxHash: string
    deployerAddress: string
    verificationProof: string
    chainId: number
  }[]
  grantsAndFunding: {
    ventureFunding: {
      amount: string
      year: string
      details: string
    }[]
    grants: {
      grant: string
      link: string
      amount: string
      date: string
      details: string
    }[]
    revenue: any[]
    retroFunding: {
      grant: string
      link: null
      amount: string
      date: string
      details: string
    }[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    count_delegate_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
    }
    elected_governance_reviews: {
      grants_council?: undefined
      anticapture_commission?: undefined
    }
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: any[]
      farcaster: any[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: any[]
    twitter: string
    mirror: null
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: any[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: any[]
      sol_addresses: any[]
    }
  }[]
  github: {
    url: string
    name: string
    description: string
  }[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: {
      amount: string
      year: string
      details: string
    }[]
    grants: {
      grant: string
      link: string
      amount: string
      date: string
      details: string
    }[]
    revenue: any[]
    retroFunding: {
      grant: string
      link: null
      amount: string
      date: string
      details: string
    }[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics?: undefined
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: null
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: any[]
    twitter: string
    mirror: null
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: {
      platform: string
      username: string
    }[]
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  }[]
  github: {
    url: string
    name: string
    description: string
  }[]
  packages: any[]
  links: any[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: any[]
    grants: any[]
    revenue: any[]
    retroFunding: {
      grant: string
      link: null
      amount: string
      date: string
      details: string
    }[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: null
        somewhat_upset: null
        neutral: null
      }
    }
    elected_governance_reviews: {
      grants_council: {
        count_attestations: number
        avg_pmf_score: number
        avg_nps_score: number
      }
      anticapture_commission?: undefined
    }
    count_delegate_attestations?: undefined
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: string[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: string[]
    twitter: string
    mirror: string
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  }[]
  github: {
    url: string
    name: string
    description: string
  }[]
  packages: {
    url: string
    name: null
    description: null
  }[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: any[]
    grants: {
      grant: string
      link: string
      amount: string
      date: string
      details: string
    }[]
    revenue: any[]
    retroFunding?: undefined
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    count_delegate_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
    }
    elected_governance_reviews: {
      grants_council: {
        count_attestations: number
        avg_pmf_score: number
        avg_nps_score: number
      }
      anticapture_commission?: undefined
    }
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: string[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: string[]
    twitter: string
    mirror: string
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  }[]
  github: {
    url: string
    name: string
    description: string
  }[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: any[]
    grants: any[]
    revenue: any[]
    retroFunding: {
      grant: string
      link: null
      amount: string
      date: string
      details: string
    }[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: null
        somewhat_upset: null
        neutral: null
      }
    }
    elected_governance_reviews: {
      grants_council?: undefined
      anticapture_commission?: undefined
    }
    count_delegate_attestations?: undefined
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: any[]
      twitter: string
      mirror: null
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: any[]
    twitter: string
    mirror: string
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  }[]
  github: {
    url: string
    name: null
    description: null
  }[]
  packages: any[]
  links: any[]
  contracts: {
    address: string
    deploymentTxHash: string
    deployerAddress: string
    verificationProof: string
    chainId: number
  }[]
  grantsAndFunding: {
    ventureFunding: {
      amount: string
      year: string
      details: string
    }[]
    grants: any[]
    revenue: any[]
    retroFunding: {
      grant: string
      link: null
      amount: string
      date: string
      details: string
    }[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    count_delegate_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
    }
    elected_governance_reviews: {
      anticapture_commission: {
        count_attestations: number
        avg_pmf_score: number
        avg_nps_score: number
      }
      grants_council?: undefined
    }
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: null
    socialLinks: {
      website: string[]
      farcaster: string[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: string[]
    twitter: string
    mirror: string
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  }[]
  github: {
    url: string
    name: string
    description: string
  }[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: {
      amount: string
      year: string
      details: string
    }[]
    grants: {
      grant: string
      link: string
      amount: string
      date: string
      details: string
    }[]
    revenue: any[]
    retroFunding: {
      grant: string
      link: null
      amount: string
      date: string
      details: string
    }[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    count_delegate_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
    }
    elected_governance_reviews: {
      grants_council: {
        count_attestations: number
        avg_pmf_score: number
        avg_nps_score: number
      }
      anticapture_commission?: undefined
    }
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: any[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: any[]
    twitter: string
    mirror: null
  }
  team: null
  github: {
    url: string
    name: string
    description: string
  }[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: {
      amount: string
      year: string
      details: string
    }[]
    grants: any[]
    revenue: any[]
    retroFunding: any[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics?: undefined
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: string[]
      twitter: string
      mirror: string
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: string[]
    twitter: string
    mirror: null
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  }[]
  github: {
    url: string
    name: string
    description: string
  }[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: any[]
  grantsAndFunding: {
    ventureFunding: any[]
    grants: {
      grant: string
      link: string
      amount: string
      date: string
      details: string
    }[]
    revenue: any[]
    retroFunding: {
      grant: string
      link: null
      amount: string
      date: string
      details: string
    }[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    count_delegate_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
    }
    elected_governance_reviews: {
      grants_council: {
        count_attestations: number
        avg_pmf_score: number
        avg_nps_score: number
      }
      anticapture_commission?: undefined
    }
  }
} | {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string
    socialLinks: {
      website: string[]
      farcaster: any[]
      twitter: string
      mirror: null
    }
    team: string[]
  }
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: any[]
    farcaster: any[]
    twitter: null
    mirror: null
  }
  team: {
    fid: number
    object: string
    pfp_url: string
    profile: {
      bio: {
        text: string
      }
    }
    username: string
    power_badge: boolean
    display_name: string
    active_status: string
    verifications: string[]
    follower_count: number
    custody_address: string
    following_count: number
    verified_accounts: null
    verified_addresses: {
      eth_addresses: string[]
      sol_addresses: any[]
    }
  }[]
  github: {
    url: string
    name: string
    description: string
  }[]
  packages: any[]
  links: {
    url: string
    name: string
    description: string
  }[]
  contracts: {
    address: string
    deploymentTxHash: string
    deployerAddress: string
    verificationProof: string
    chainId: number
  }[]
  grantsAndFunding: {
    ventureFunding: any[]
    grants: {
      grant: string
      link: string
      amount: string
      date: string
      details: string
    }[]
    revenue: any[]
    retroFunding: any[]
  }
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: {
      answer: string
      question: string
    }[]
  }
  testimonials: string
  impactMetrics: {
    count_total_attestations: number
    count_citizen_attestations: number
    avg_nps_score: number
    most_positive_superlative: boolean
    cant_live_without_superlative: boolean
    percentage_distributions: {
      citizens: {
        extremely_upset: number
        somewhat_upset: number
        neutral: number
      }
      top_delegates: {
        extremely_upset: null
        somewhat_upset: null
        neutral: null
      }
    }
    elected_governance_reviews: {
      grants_council?: undefined
      anticapture_commission?: undefined
    }
    count_delegate_attestations?: undefined
  }
});

export interface ICategory {
  id: number
  name: string
  pollId: number
  url: string
  description: string
  impactDescription: string
  contributionDescription: null | string
  RF6Id: null | number
  parentId: null | number
  image: string | null
  metadata: ProjectMetadata
  created_at: string
  type: string
  progress: CollectionProgressStatus
}

export interface IProject {
  id: number
  rating: number | null
  name: string
  aiSummary: ProjectAiSummary
  pollId: number
  url: string | null
  description: string
  RF6Id: string
  parentId: number | null
  image: string | null
  metadata: ProjectMetadata
  createdAt: string
  type: 'collection' | 'project'
}

export interface IProjectRanking {
  project: IProject
  projectId: number
  rank: number
  star: number
  name: string
  share: number
  locked: boolean
  coi: boolean
}

export type ProjectAiSummary = {
  subHeader: string
  points: string[]
}[];

export type CollectionProgressStatus =
  | 'Attested'
  | 'Finished'
  | 'WIP - Threshold'
  | 'WIP'
  | 'Filtered'
  | 'Filtering'
  | 'Pending'
  | 'Delegated';

export enum CollectionProgressStatusEnum {
  Attested = 'Attested',
  Finished = 'Finished',
  WIPThreshold = 'WIP - Threshold',
  WIP = 'WIP',
  Filtered = 'Filtered',
  Filtering = 'Filtering',
  Pending = 'Pending',
  Delegated = 'Delegated',
}
