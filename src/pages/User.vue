<template>
  <div class="user">
    {{user}}
  </div>
</template>

<script lang='ts'>
import {defineComponent, ref,reactive, toRefs} from 'vue'

export default defineComponent({
  name: 'User',
  props: {
    
  },
  components: {
    
  },
  setup(){
    const  user= ref(0)
    return {user}
  }
})
</script>

<style scoped lang='scss'>
  
</style>