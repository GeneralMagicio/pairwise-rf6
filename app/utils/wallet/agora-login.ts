import { SIWEConfig } from 'connectkit';
import { SiweMessage } from 'siwe';
import { decodeJwt } from 'jose';
import { JWTPayload, VerifyResponse } from './types';
import { axiosInstance } from '../axiosInstance';
import { AgoraBallotPost } from '../../comparison/ballot/useGetBallot';
import StorageLabel from '../../lib/localStorage';

// TODO: this should probably be an environment variable
// const BASE_URL = `https://vote.optimism.io`
const BASE_URL = 'https://vote.optimism.io';
const API_PREFIX = '/api/v1';
export const AGORA_SIGN_IN = 'Sign in to Agora with Ethereum';

/* There's currently nothing stored on the backend to maintain session state.
// All session state is stateless and stored in the JWT issued by the server.
// Address, nonce, and chainId are all stored in the JWT, along with a particular
// time to live/expiry.
//
// For signOut, the client should remove JWT from storage as applicable, and is otherwise
// a no-op (pending AGORA-2015, or potential JWT-token tracking on our backend DB).
//
// JWT tokens for SIWE should therefore be issued with a short expiry time.
*/

// const isSiweEnabled = () => {
//   return process.env.NEXT_PUBLIC_SIWE_ENABLED === 'true'
// }

export const loginToAgora = async (message: string, signature: `0x${string}`) => {
  const isVerified = await verifyMessage({ message, signature });

  return isVerified;
};

export const getMessageAndSignature = async (address: `0x${string}`, chainId: number, signFunc: ({ message }: { message: string }) => Promise<`0x${string}`>) => {
  const nonce = await getNonce();
  const message = await createMessage({
    address,
    chainId,
    nonce,
  });

  const signature = await signFunc({ message });

  return { message, signature };
};

const getNonce = async () => {
  const res = await axiosInstance.get(`${BASE_URL}${API_PREFIX}/auth/nonce`);

  return res.data;
};

const createMessage: SIWEConfig['createMessage'] = ({ nonce, address, chainId }) =>
  new SiweMessage({
    version: '1',
    domain: window.location.host,
    uri: window.location.origin,
    statement: AGORA_SIGN_IN,
    address,
    chainId,
    nonce,
  }).prepareMessage();

const verifyMessage = async ({ message, signature }: { message: string, signature: string }) => {
  const res = await axiosInstance.post<VerifyResponse>(`${BASE_URL}${API_PREFIX}/auth/verify`, JSON.stringify({
    message,
    signature,
  }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // save JWT from verify to local storage
  const token = res.data;
  localStorage.setItem(StorageLabel.AGORA_SIWE_JWT, JSON.stringify(token));
  const payload: JWTPayload = decodeJwt(token.access_token);
  return payload;
};

export const isLoggedInToAgora = async (address: string): Promise<JWTPayload | false> => {
  try {
    const agoraJwt = localStorage.getItem(StorageLabel.AGORA_SIWE_JWT);
    const parsed: VerifyResponse = JSON.parse(agoraJwt || '');
    const decoded: JWTPayload = decodeJwt(parsed.access_token);

    await axiosInstance.get(`${BASE_URL}${API_PREFIX}/retrofunding/rounds/6/ballots/${address}`, {
      headers: {
        'Authorization': `Bearer ${parsed.access_token}`,
        'Content-Type': 'application/json',
      },
    });
    return decoded;
  }
  catch (e) {
    return false;
  }
};

export const uploadBallot = async (
  ballot: AgoraBallotPost,
  address: string,
) => {
  const agoraJwt = localStorage.getItem(StorageLabel.AGORA_SIWE_JWT);
  const parsed: VerifyResponse = JSON.parse(agoraJwt || '');

  const { data } = await axiosInstance.post(`${BASE_URL}${API_PREFIX}/retrofunding/rounds/6/ballots/${address}/projects`,
    ballot, {
      headers: {
        'Authorization': `Bearer ${parsed.access_token}`,
        'Content-Type': 'application/json',
      },
    });
  return data;
};

export const signOutFromAgora = () => {
  localStorage.removeItem(StorageLabel.AGORA_SIWE_JWT);
};

export const getJWTData = (): JWTPayload => {
  if (typeof window !== 'undefined') {
    const agoraJwt = localStorage.getItem(StorageLabel.AGORA_SIWE_JWT);
    if (!agoraJwt) {
      return {} as JWTPayload;
    }
    const parsed: VerifyResponse = JSON.parse(agoraJwt || '');
    const decoded: JWTPayload = decodeJwt(parsed.access_token);

    return decoded;
  }
  else {
    return {} as JWTPayload;
  }
};
