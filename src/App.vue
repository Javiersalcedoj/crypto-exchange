<template>
  <main>
    <px-header :links="links" />
    <router-view class="container px-5 sm:px-20 py-20 flex justify-center"/>
  </main>
</template>

<script>
import PxHeader from '@/components/PxHeader.vue';

export default {
  name: "App",
  components: {PxHeader},
  data(){
    return {
      links: [
        {
          title: 'BTC',
          to: { name: 'CoinDetail',  id: 'bitcoin'}
        },
        {
          title: 'ETH',
          to: { name: 'CoinDetail',  id: 'ethereum' }
        },
        {
          title: 'USDT',
          to: { name: 'CoinDetail',  id: 'tether' }
        }
      ]
    }
  }
}  
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
