import { useState, useEffect } from 'react';
import { optimismSepolia } from 'thirdweb/chains';
import { type Address } from 'viem';
import { useActiveWallet } from 'thirdweb/react';
import { ethers6Adapter } from 'thirdweb/adapters/ethers6';
import { axiosInstance } from '@/app/utils/axiosInstance';
import { client } from '@/app/utils/wallet/provider';
import { activeChain } from '@/app/lib/constants';

export type EASConfig = {
  EASDeployment: Address
  SchemaRegistry: Address
};

export function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

type Signer = Awaited<ReturnType<typeof ethers6Adapter.signer.toEthers>>;

export function useSigner() {
  const wallet = useActiveWallet();

  const [signer, setSigner] = useState<Signer>();

  useEffect(() => {
    async function getSigner() {
      console.log('In useSigner');
      if (!wallet) return;

      console.log('wallet', wallet);
      const account = wallet.getAccount();

      console.log('account', account);
      if (!account) return;

      const ethersSigner = await ethers6Adapter.signer.toEthers({
        client,
        chain: activeChain,
        account,
      });

      setSigner(ethersSigner);
    }

    getSigner();
  }, [wallet]);
  return signer;
}

interface Config extends EASConfig {
  explorer: string
  gqlUrl: string
}

export const EASNetworks: Record<number, Config> = {
  // Optimism
  10: {
    EASDeployment: '0x4200000000000000000000000000000000000021',
    SchemaRegistry: '0x4200000000000000000000000000000000000020',
    explorer: 'https://optimism.easscan.org',
    gqlUrl: 'https://optimism.easscan.org/graphql',
  },
  // Optimism Sepolia
  [optimismSepolia.id]: {
    EASDeployment: '0x4200000000000000000000000000000000000021',
    SchemaRegistry: '0x4200000000000000000000000000000000000020',
    explorer: 'https://optimism-sepolia.easscan.org',
    gqlUrl: 'https://optimism-sepolia.easscan.org/graphql',
  },
};

export const SCHEMA_UID = process.env.NEXT_PUBLIC_EAS_SCHEMA_UID || '0x8c12749f56c911dbc13a6a6685b6964c3ea03023f246137e9c53ba97974e4b75';

export const pinFileToIPFS = async (list: object) => {
  try {
    const res = await axiosInstance.post<string>('/flow/pinJSONToIPFS', {
      json: list,
    });
    return res.data;
  }
  catch (error) {
    console.log(error);
  }
};

type Ranking = {
  RF6Id: string
  share: number
}

export const convertRankingToAttestationFormat = async (
  ranking: Ranking[],
  collectionName: string,
  // collectionDescription: string,
) => {
  const obj = {
    // listDescription: `${collectionDescription}`,
    impactEvaluationLink: 'https://pairwise.vote',
    impactCategory: ['PAIRWISE'],
    impactEvaluationDescription: `This list has been carefully curated and ranked by Pairwise among projects related to ${collectionName}.`,
    listContent: ranking.map(item => ({
      RF6_Application_UID: item.RF6Id,
      allocation: item.share,
    })),
  };

  const listName = collectionName;
  const listMetadataPtrType = 1;

  const url = await pinFileToIPFS(obj);

  return {
    listName,
    listMetadataPtrType,
    listMetadataPtr: `https://giveth.mypinata.cloud/ipfs/${url}`,
  };
};

export const getPrevAttestationIds = async (
  address: string,
  schemaId: string,
  gqlUrl: string,
  collectionName: string,
): Promise<string[]> => {
  const query = `
  query PrevAttestationsQuery($where: AttestationWhereInput) {
    groupByAttestation(
      where: $where,
      by: [id, decodedDataJson]
    ) {
      id
      decodedDataJson
    }
  }
`;

  const res = await axiosInstance.post(gqlUrl, {
    query: query,
    operationName: 'PrevAttestationsQuery',
    variables: {
      where: {
        revocable: { equals: true },
        revoked: { equals: false },
        schemaId: {
          equals: schemaId,
        },
        attester: { equals: address },
      },
      by: null,
    },
  });

  const temp = res.data.data.groupByAttestation.map((item: any) => ({
    ...item,
    data: JSON.parse(item.decodedDataJson),
  }));

  return temp
    .filter((item: any) => item.data[0].value.value === collectionName)
    .map((item: any) => item.id);
};
