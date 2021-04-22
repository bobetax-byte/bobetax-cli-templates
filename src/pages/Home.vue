<template>
  <div class="home">
    <h1>首页</h1>
  </div>
</template>

<script lang='ts'>
import {defineComponent, ref,reactive, toRefs} from 'vue'

export default ({
  setup(){
    const  state=reactive({})
    return  {state}
  }
})
</script>

<style scoped lang='scss'>
  
</style>