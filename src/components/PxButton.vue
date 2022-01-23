<template>
  <button
    @click="buttonClick"
    class="bg-transparent hover:bg-green-500 font-semibold py-2 px-2 border border-green-500 hover:border-transparent rounded text-green-700 hover:text-white"
  >
    <beat-loader 
      :loading="isLoadingButton"
      :color="'#68d391'"
      :size="8"/>
      <p v-show="!isLoadingButton">
        <slot></slot>
      </p>
  </button>
</template>

<script>
export default {
  name: 'PxButton',
  props: {
    isLoadingButton: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    buttonClick() {
      this.$emit('custonClick')
    }
  }
}
</script>