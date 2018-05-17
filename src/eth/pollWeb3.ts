import Web3 from 'web3'
import store from '../app/store'

const pollWeb3 = function (state: any) {
  const web3 = new Web3((<any>window).web3.currentProvider)

  return setInterval(() => {
    if (!web3 || !store.state.web3.web3Instance) {
      return
    }

    if (web3.eth.coinbase !== store.state.web3.coinbase) {
      const { coinbase } = web3.eth
      web3.eth.getBalance(coinbase, (err: any, newBalance: any) => {
        if (err) {
          console.log(err)
          return
        }

        store.dispatch('pollWeb3', {
          coinbase,
          balance: parseInt(newBalance, 10)
        })
      })

      return
    }

    web3.eth.getBalance(store.state.web3.coinbase, (err: any, polledBalance: any) => {
      if (err) {
        console.log(err)
        return
      }

      if (parseInt(polledBalance, 10) !== store.state.web3.balance) {
        store.dispatch('pollWeb3', {
          coinbase: store.state.web3.coinbase,
          balance: polledBalance
        })
      }
    })
  }, 500)
}

export default pollWeb3
