import Web3 from 'web3'
import { address, abi } from './socoCoinContract'

const getContract = () => new Promise((resolve, reject) => {
  const w: any = window
  const web3 = new Web3(w.web3.currentProvider)
  const lotteryContract = web3.eth.contract(JSON.parse(abi))
  const lotteryContractInstance: any = lotteryContract.at(address)

  if (!lotteryContractInstance) {
    return reject(new Error(`Contract not found at ${address}`))
  }

  return resolve(lotteryContractInstance)
})

export default getContract
