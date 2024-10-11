import { verifyCloudProof, IVerifyResponse } from "@worldcoin/idkit";
import { actionId, appId } from "@/app/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log(req);
  const { proof } = await req.json();
  try {
    console.log(proof);
    const response = (await verifyCloudProof(
      proof,
      appId,
      actionId
    )) as IVerifyResponse;
    console.log(response);
    return NextResponse.json(response, {
      status: response.success ? 200 : 400,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "error in calling cloud proof",
      },
      { status: 302 }
    );
  }
}
