export type FarcasterUserByFid = {
  result: {
    user: {
      fid: number
      username: string
      displayName: string
      pfp: {
        url: string
        verified: boolean
      }
      profile: {
        bio: {
          text: string
          mentions: any[]
          channelMentions: any[]
        }
        location: {
          placeId: string
          description: string
        }
      }
      followerCount: number
      followingCount: number
      activeOnFcNetwork: boolean
      connectedAccounts: any[]
      viewerContext: {
        following: boolean
        followedBy: boolean
        canSendDirectCasts: boolean
        enableNotifications: boolean
        hasUploadedInboxKeys: boolean
      }
    }
    collectionsOwned: any[]
    extras: {
      fid: number
      custodyAddress: string
    }
  }
};

export type TargetDelegate = {
  displayName: string
  username: string
  profilePicture: string
}
