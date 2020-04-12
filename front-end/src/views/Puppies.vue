<template>
  <div class="Puppies">
    <PuppyList />
  </div>
</template>

<script>
// @ is an alias to /src
import PuppyList from '@/components/PuppyList.vue'

export default {
  name: 'Puppies',
  components: {
    PuppyList
  }
}
</script>

<style scoped>
.Puppies {
  box-sizing: border-box;
  padding: 32px;
}
</style>