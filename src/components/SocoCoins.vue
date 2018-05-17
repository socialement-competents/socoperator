<template>
  <v-btn
    @click.stop="claimReward"
    color="socogreen"
    class="socobutton"
  >{{ balance }} SocoCoins</v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Component from 'vue-class-component'

@Component({
  computed: mapGetters(['contract', 'web3', 'w3i'])
})
export default class Main extends Vue {
  contract: any
  web3: any
  w3i: any
  balance: number

  constructor () {
    super()
    this.balance = 34
  }

  async beforeCreate () {
    await this.$store.dispatch('registerWeb3')
  }

  async created () {
    await this.$store.dispatch('getContractInstance')
  }

  claimReward () {
    const { contract, web3, w3i } = this
    if (!contract || !web3 || !w3i) {
      // TODO: afficher message dans l'UI
      console.error('Something is missing (contract, web3 or w3i)')
      return
    }
    const amount: number = this.balance * (10 ** 18)
    contract.claimReward.sendTransaction(amount, {
      gas: 300000,
      from: web3.coinbase
    }, (err: any, result: any) => {
      if (err) {
        // TODO: traiter l'erreur
        console.error('Error sending the transaction:', err)
        return
      }

      console.log('Transaction requested ... this can take some time')
      console.log(`https://ropsten.etherscan.io/tx/${result}`)

      let interval: any
      interval = setInterval(() => {
        w3i.eth.getTransactionReceipt(result, (err: any, receipt: any) => {
          if (err) {
            console.log('Error getting the receipt:', err)
            return
          }
          if (receipt) {
            // TODO: afficher dans l'UI
            console.log('Transaction approved ! Receipt:', receipt)
            console.log(`https://ropsten.etherscan.io/tx/${result}`)
            clearInterval(interval)
            this.balance = 0
          }
        })
      }, 3000)
    })
  }
}
</script>

<style scoped lang="scss">
.socobutton {
  margin: 24px;
  width: calc(100% - 48px);
  height: 50px;
  box-shadow: 0 7px 13px 0 rgba(2, 250, 168, 0.5);
  border-radius: 8px;
  color: #fff;
}
</style>
