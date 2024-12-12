import { EAS, SchemaRegistry, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { Signer } from 'ethers';
import { Wallet } from 'thirdweb/wallets';
import { activeChain } from '@/app/lib/constants';
import { axiosInstance } from '@/app/utils/axiosInstance';
import { EASNetworks, SCHEMA_UID, convertRankingToAttestationFormat, generateRandomString, getPrevAttestationIds } from '../utils';

export enum AttestationState {
  Initial,
  Loading,
  FarcasterDelegate,
  Success,
  Error,
}

type AttestFunc = {
  ranking: {
    id: number
    name: string
    ranking: { RF6Id: string, share: number }[]
  }
  signer: Signer
  wallet: Wallet
  setAttestationState: (state: AttestationState) => void
  setAttestationLink: (link: string) => void
  isBudget?: boolean
}

// 1732032000 -> Tuesday, November 19, 2024 4:00:00 PM GMT
// export const VotingHasEnded = true || (process.env.NODE_ENV === 'production' && Date.now() > 1732032000);
export const VotingHasEnded = false;

export const attest = async ({ ranking, signer, wallet, setAttestationState, setAttestationLink, isBudget }: AttestFunc) => {
  // const localStorageTag = process.env.NEXT_PUBLIC_LOCAL_STORAGE_TAG!;
  // const identityString = localStorage.getItem(localStorageTag);

  // if (!identityString) {
  //   console.error('Identity string is missing!');
  //   router.push('/');
  //   return;
  // }

  // const identity = new Identity(identityString);

  if (!ranking) return;

  setAttestationState(AttestationState.Loading);

  const chainId = activeChain.id;
  const easConfig = EASNetworks[chainId];
  const address = wallet?.getAccount()?.address;

  if (!easConfig) {
    console.error('no eas config');
    return;
  }
  if (!signer || !address) {
    console.error('signer', signer, 'address', address);
    return;
  }

  const eas = new EAS(easConfig.EASDeployment);
  const schemaRegistry = new SchemaRegistry(easConfig.SchemaRegistry);

  eas.connect(signer as any);
  schemaRegistry.connect(signer as any);
  const schema = await schemaRegistry.getSchema({ uid: SCHEMA_UID });
  const schemaEncoder = new SchemaEncoder(schema.schema);
  // let proof = [''];
  // setProgress(ProgressState.Creating);
  try {
    const item = await convertRankingToAttestationFormat(
      ranking.ranking.map(({ RF6Id, share }) => ({ RF6Id, share })),
      ranking.name,
      // comment,
    );

    const schemaData = [
      { name: 'listName', type: 'string', value: item.listName },
      {
        name: 'listMetadataPtr',
        type: 'string',
        value: item.listMetadataPtr,
      },
    ];

    // const signalData = {
    //   category: item.listName,
    //   value: item.listMetadataPtr,
    // };

    // // generate proof of vote
    // const groupId = process.env.NEXT_PUBLIC_BANDADA_GROUP_ID!;
    // const users = await getMembersGroup(groupId);
    // if (users && identityString !== '{}') {
    //   const bandadaGroup = await getGroup(groupId);
    //   let treeDepth = 16;
    //   if (bandadaGroup === null) {
    //     console.log('The Bandada group does not exist:', groupId);
    //   }
    //   else {
    //     treeDepth = bandadaGroup.treeDepth;
    //   }
    //   const group = new Group(groupId, treeDepth, users);
    //   console.log('going to encode signalData: ');
    //   console.log(signalData);
    //   const signal = toBigInt(
    //     encodeBytes32String(signalData.toString()),
    //   ).toString();
    //   const {
    //     proof: tempProof,
    //     merkleTreeRoot,
    //     nullifierHash,
    //   } = await generateProof(identity, group, groupId, signal);
    //   proof = tempProof;
    //   console.log('generated proof of vote: ', proof);

    //   const { data: currentMerkleRoot, error: errorRootHistory }
    //     = await supabase
    //       .from('root_history')
    //       .select()
    //       .order('created_at', { ascending: false })
    //       .limit(1);

    //   if (errorRootHistory) {
    //     console.log(errorRootHistory);
    //   }

    //   if (!currentMerkleRoot) {
    //     console.error('Wrong currentMerkleRoot');
    //   }

    //   if (
    //     currentMerkleRoot == null
    //     || merkleTreeRoot !== currentMerkleRoot[0].root
    //   ) {
    //     // compare merkle tree roots
    //     const {
    //       data: dataMerkleTreeRoot,
    //       error: errorMerkleTreeRoot,
    //     } = await supabase
    //       .from('root_history')
    //       .select()
    //       .eq('root', merkleTreeRoot);

    //     if (errorMerkleTreeRoot) {
    //       console.log(errorMerkleTreeRoot);
    //     }

    //     console.log('merkleTreeRoot: ', merkleTreeRoot);
    //     console.log('dataMerkleTreeRoot: ', dataMerkleTreeRoot);

    //     if (!dataMerkleTreeRoot) {
    //       console.error('Wrong dataMerkleTreeRoot');
    //     }
    //     else if (dataMerkleTreeRoot.length === 0) {
    //       console.log('Merkle Root is not part of the group');
    //     }

    //     console.log('dataMerkleTreeRoot', dataMerkleTreeRoot);
    //     const merkleTreeRootDuration
    //       = bandadaGroup?.fingerprintDuration ?? 0;

    //     if (
    //       dataMerkleTreeRoot
    //       && Date.now()
    //       > Date.parse(dataMerkleTreeRoot[0].created_at)
    //       + merkleTreeRootDuration
    //     ) {
    //       console.log('Merkle Tree Root is expired');
    //     }
    //   }

    //   const { data: nullifier, error: errorNullifierHash }
    //     = await supabase
    //       .from('nullifier_hash')
    //       .select('nullifier')
    //       .eq('nullifier', nullifierHash);

    //   if (errorNullifierHash) {
    //     console.log(errorNullifierHash);
    //   }

    //   if (!nullifier) {
    //     console.log('Wrong nullifier');
    //   }
    //   else if (nullifier.length > 0) {
    //     console.log('You are using the same nullifier twice');
    //   }

    //   const { error: errorNullifier } = await supabase
    //     .from('nullifier_hash')
    //     .insert([{ nullifier: nullifierHash }]);

    //   if (errorNullifier) {
    //     console.error(errorNullifier);
    //   }

    //   const { data: dataFeedback, error: errorFeedback }
    //     = await supabase
    //       .from('feedback')
    //       .insert([{ signal: schemaData }])
    //       .select()
    //       .order('created_at', { ascending: false });

    //   if (errorFeedback) {
    //     console.error(errorFeedback);
    //   }

    //   if (!dataFeedback) {
    //     console.error('Wrong dataFeedback');
    //   }

    //   // TODO everything is good so add the proof in attestation : Mahdi
    // }

    const schemaDataWithProof = [
      ...schemaData,
      {
        name: 'proof',
        type: 'string[]',
        value: [generateRandomString(20)],
      },
    ];

    console.log('sdwp', schemaDataWithProof);
    const encodedData = schemaEncoder.encodeData(schemaDataWithProof);

    const prevAttestations = await getPrevAttestationIds(
      address,
      SCHEMA_UID,
      easConfig.gqlUrl,
      ranking.name,
    );

    if (prevAttestations.length > 0) {
      for (const id of prevAttestations) {
        const revokedTransactions = await eas.revoke({
          schema: SCHEMA_UID,
          data: { uid: id },
        });
        await revokedTransactions.wait();
      }
    }

    const tx = await eas.attest({
      schema: SCHEMA_UID,
      data: {
        data: encodedData,
        recipient: address,
        revocable: true,
      },
    });

    const newAttestationUID = await tx.wait();

    // posthog.capture('Attested', {
    //   attestedCategory: category?.data.collection?.name,
    // });

    console.log('attestaion id', newAttestationUID);
    // await finishCollections(collectionId);

    const attestationLink = `${easConfig.explorer}/attestation/view/${newAttestationUID}`;

    await axiosInstance.post('/flow/report-attest', {
      collectionId: ranking.id,
      attestationId: attestationLink,
    });

    setAttestationLink(attestationLink);
    if (isBudget == true) {
      setAttestationState(AttestationState.Success);
      return;
    }
    setAttestationState(AttestationState.FarcasterDelegate);
  }
  catch (e) {
    console.error('error on sending tx:', e);
    setAttestationState(AttestationState.Error);
  }
};
