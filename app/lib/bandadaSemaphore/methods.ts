import { Identity } from '@semaphore-protocol/identity';
import { Group as SemaphoreGroup } from '@semaphore-protocol/group';
import { ApiSdk, Group } from '@bandada/api-sdk';

const bandadaApi = new ApiSdk();

const apiKey = process.env.NEXT_PUBLIC_BANDADA_API_KEY!;
const attestationGroupID = process.env.NEXT_PUBLIC_BANDADA_GROUP_ID!;

export const createSemaphoreIdentity = (signature: string): string => {
  /* determinsitic Identity from Signature */
  const identity = new Identity(signature);
  console.log('identity.commitment: ', identity.commitment);
  localStorage.setItem('SemaphoreIdentity', identity.commitment.toString());
  return identity.commitment.toString();
};

export const getUsersInBandadaGroup = async (): Promise<string[] | null> => {
  try {
    const { members } = await bandadaApi.getGroup(attestationGroupID);
    return members;
  }
  catch (error: any) {
    console.error(error);
    return null;
  }
};

export const getUserBandadaGroup = async (signature: string): Promise<Group | null> => {
  const users = await getUsersInBandadaGroup();
  let identityString = localStorage.getItem('SemaphoreIdentity');
  if (!identityString) {
    identityString = createSemaphoreIdentity(signature);
  }
  if (!users || !users.includes(identityString)) {
    /* create bandada group */
    try {
      await bandadaApi.addMemberByApiKey(attestationGroupID, identityString, apiKey);
      /* create group using semaphore */
      const groupArray = await getUsersInBandadaGroup();
      /* store the root in DB */
      if (!groupArray) {
        return null;
      }
      const group = new SemaphoreGroup(groupArray);
      const groupRoot = group.root;
      /* save group root in database */
      return (await bandadaApi.getGroup(attestationGroupID));
    }
    catch (error: any) {
      console.error(error);
      if (error.response) {
        console.error(error.response.statusText);
      }
      return null;
    }
  }
  return (await bandadaApi.getGroup(attestationGroupID));
};
