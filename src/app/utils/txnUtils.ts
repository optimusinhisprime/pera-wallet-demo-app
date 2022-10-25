import {SignerTransaction} from "@perawallet/connect/dist/util/model/peraWalletModels";
import algosdk from "algosdk";

import algod from "./algod";

async function generateOptIntoAssetTxns({
  assetID,
  initiatorAddr
}: {
  assetID: number;
  initiatorAddr: string;
}): Promise<SignerTransaction[]> {
  const suggestedParams = await algod.getTransactionParams().do();
  const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: initiatorAddr,
    to: initiatorAddr,
    assetIndex: assetID,
    amount: 0,
    suggestedParams
  });

  return [{txn: optInTxn, signers: [initiatorAddr]}];
}

async function generatePaymentTxns({
  to,
  initiatorAddr
}: {
  to: string;
  initiatorAddr: string;
}) {
  const suggestedParams = await algod.getTransactionParams().do();

  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: initiatorAddr,
    to,
    amount: 1,
    suggestedParams
  });

  return [{txn, signers: [initiatorAddr]}];
}

async function generateAssetTransferTxns({
  to,
  assetID,
  initiatorAddr
}: {
  to: string;
  assetID: number;
  initiatorAddr: string;
}) {
  const suggestedParams = await algod.getTransactionParams().do();

  const asatxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: initiatorAddr,
    to,
    assetIndex: assetID,
    amount: 35000000,
    suggestedParams
  });

  return [{txn: asatxn, signers: [initiatorAddr]}];
}

async function generateLoanPaymentTxns({
  initiatorAddr,
  contract_id
}: {
  initiatorAddr: string;
  contract_id: number;
}) {
  const op = "payment";

  const args = [];
  const accounts = [];

  accounts.push("4EPIPODKXJKT7RDEANYFWILIW24TPUKOQMPEGGKSWIKCR5ULX2ARXZ6H3U");

  const assets = [parseInt("10458941")];

  args.push(new Uint8Array(Buffer.from(op)));
  const params = await algod.getTransactionParams().do();

  const apptxn = algosdk.makeApplicationNoOpTxn(
    initiatorAddr,
    params,
    contract_id,
    args,
    accounts,
    [],
    assets,
    undefined,
    undefined
  );

  return [{txn: apptxn, signers: [initiatorAddr]}];
}

export {
  generateOptIntoAssetTxns,
  generatePaymentTxns,
  generateAssetTransferTxns,
  generateLoanPaymentTxns
};
