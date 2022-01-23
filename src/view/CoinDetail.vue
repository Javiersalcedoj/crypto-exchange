<template>
  <div class="flex-col" >
    <div class="flex justify-center">
      <bounce-loader 
      :loading="isLoading"
      :color="'#68d391'"
      :size="100"
    />
    </div>

    <template v-if="!isLoading">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            class="w-20 h-20 mr-5"
            :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
            :alt="asset.name"
          />
          <h1 class="text-5xl">
            {{asset.name}}
            <small class="sm:mr-2 text-gray-500">{{asset.symbol}}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{asset.rank}}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{asset.priceUsd | dollar}}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{min | dollar}}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{max | dollar}}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{avg | dollar}}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase" >Variación 24hs</b>
              <span :class="asset.changePercent24Hr.includes('-') ? 'text-red-600': 'text-green-600'">{{asset.changePercent24Hr | percent}}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            @click="toggleConverter"
            class=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounde "
          >
            {{fromUsd ? `USD a ${asset.symbol}` :`${asset.symbol} a USD`}}
          </button>
          
          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                v-model="convertValue"
                id="convertValue"
                type="number"
                class=" text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-norma "
                :placeholder="`Valor en ${fromUsd ? 'USD' :asset.symbol}`"
              />
            </label>
          </div>

          <span class="text-xl">{{convertResult}} {{fromUsd ? asset.symbol : 'USD'}}</span>
        </div>
      </div>

      <line-chart
        class="ny-10"
        :color="['orange']"
        :min="min"
        :max="max"
        :data="history.map(h=>[h.date, parseFloat(h.priceUsd)])"
      />

      <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table>
        <tr v-for="m in markets" :key="`${m.exchange}-${m.priceUsd}`" class="border-b">
          <td>
            <b>{{m.exchangeId}}</b>
          </td>
          <td>{{m.priceUsd|dollar}}</td>
          <td>{{m.baseSymbol}} / {{m.quoteSymbol}}</td>
          <td>
            <px-button 
              :isLoadingButton="m.isloading"
              v-if="!m.url"
              @custonClick="getWebSite(m)"
            >
              <slot>Obtener Link</slot>
            </px-button>
            <a
            v-else
            class="hover:underline text-green-600" target="_blanck"
            :href="m.url"
            >
              {{m.url}}
            </a>
          
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import api from '../api.js'
import PxButton from '../components/PxButton.vue'
export default {
  name: 'coinDetail',
  components: {PxButton},
  data() {
    return {
      asset: {},
      history: [],
      markets: [],
      isLoading: false,
      fromUsd: true,
      convertValue: null,
    }
  },
  created(){
    this.getCoin()
  },
  computed: {
    convertResult(){
      if (!this.convertValue) {
        return 0
      }
      const result = () => {
        if (this.fromUsd) {
          return this.convertValue / this.asset.priceUsd
        } else {
          return this.convertValue * this.asset.priceUsd
        }
      }

      return result().toFixed(4)
    },
    min(){
      const price = this.history.map(elemt => (Number(elemt.priceUsd)))
      return Math.min(...price)
    },
    max(){
      const price = this.history.map(elemt => (Number(elemt.priceUsd)))
      return Math.max(...price)
    },
    avg(){
      const sum = this.history.reduce(
        (sum, elemt)=>sum + Number(elemt.priceUsd), 0)
      return  sum / this.history.length
    },
  },
  watch:{
    $route(){
      this.getCoin()
    }
  },
  methods: {
    toggleConverter(){
      this.fromUsd = !this.fromUsd
    },
    getCoin () {
      const id = this.$route.params.id
      this.isLoading = true
      Promise.all([
        api.getAsset(id),
        api.getAssetHistory(id),
        api.getMarkets(id)
      ])
      .then(([asset, history, markets])=>{
        this.asset = asset;
        this.history = history;
        this.markets = markets;
      })
      .catch(error => console.error(error))
      .finally(()=> this.isLoading = false )
    },
    getWebSite(exchange){
      this.$set(exchange, 'isloading', true)
      return api.getExchange(exchange.exchangeId)
        .then(res => {
          if (res.exchangeUrl === 'https://api.crypto.com/') {
            res.exchangeUrl = 'https://crypto.com/'
          }
          this.$set(exchange, 'url', res.exchangeUrl)
        })
        .catch(()=>{
          if(!exchange.url) {
            this.$set(exchange, 'url', `https://${exchange.exchangeId.split(' ')[0].toLowerCase()}.com`)
          }
        })
        .finally(()=> {this.$set(exchange, 'isloading', false);
        })
    }
  }
}
</script>
<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>

