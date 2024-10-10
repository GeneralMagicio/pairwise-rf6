interface SiweData {
  address: string
  chainId: string
  nonce: string
}

export interface JWTPayload {
  sub: string
  scope: string
  isBadgeholder: boolean
  category: 'OP_STACK_RESEARCH_AND_DEVELOPMENT' | 'OP_STACK_TOOLING' | 'ETHEREUM_CORE_CONTRIBUTIONS'
  siwe: SiweData
  exp: number
  iat: number
  nbf: number
}

export interface VerifyResponse {
  access_token: string
  token_type: 'JWT'
  expires_in: number
}
