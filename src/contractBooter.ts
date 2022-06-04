import { AbiItem } from "web3-utils";
import { Contract } from "ethers";
import Web3 from "web3";
import Publication from "./interfaces/Publication.json";

export const checksumAddress = (address: string) =>
  Web3.utils.toChecksumAddress(address);

// ? To "Boot" up a set of contracts, call this function and pass in a provider/web3 instance
  //@ts-ignore
export function getWeb3Contracts(web3) {
  // example contract creations
  const publicationContract = new web3.eth.Contract(
    Publication.abi as AbiItem[],
    //@ts-ignore
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  );

  const contracts = {
    publicationContract,
  };
  return contracts;
}
  //@ts-ignore
export function getEthersContracts(provider) {
  // example contract creations
  const publicationContract = new Contract(
      //@ts-ignore
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    Publication.abi,
    provider
  );

  const contracts = {
    publicationContract,
  };
  return contracts;
}
