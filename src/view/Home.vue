<template>
  <div>
    <bounce-loader 
      :loading="isLoading"
      :color="'#68d391'"
      :size="100"
    />
    <px-table :assets="assets" v-if="!isLoading"/>
  </div>
</template>

<script>
import PxTable from "../components/PxTable.vue";
import api from "@/api.js"

export default {
  name: "Home",
  components: { PxTable },
  data(){
    return {
      assets: [],
      isLoading: false,
    }
  },
  created() {
    this.isLoading = true;
    api.getAssets()
      .then(assets => (this.assets =  assets))
      .catch(error => console.error(error))
      .finally(() => this.isLoading = false)
  }
};
</script>