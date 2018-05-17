import Web3 from 'web3'
import { address, abi } from './lotteryContract'

const getContract = () => new Promise((resolve, reject) => {
  const web3 = new Web3((<any>window).web3.currentProvider)
  const lotteryContract = web3.eth.contract(JSON.parse(abi))
  const lotteryContractInstance = lotteryContract.at(address)

  if (!lotteryContractInstance) {
    return reject(new Error(`Contract not found at ${address}`))
  }

  return resolve(lotteryContractInstance)
})

export default getContract
