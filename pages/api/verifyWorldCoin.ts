import { NextApiRequest, NextApiResponse } from 'next';
import { verifyCloudProof, IVerifyResponse } from '@worldcoin/idkit';
import { actionId, appId } from '@/app/lib/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { proof } = req.body;
  try {
    console.log(proof);
    const response = (await verifyCloudProof(proof, appId, actionId)) as IVerifyResponse;
    console.log(response);
    return res.status(response.success ? 200 : 400).json(response);
  }
  catch (err) {
    console.error(err);
    return res.status(502).json({
      message: 'error in calling cloud proof',
    });
  }
}
