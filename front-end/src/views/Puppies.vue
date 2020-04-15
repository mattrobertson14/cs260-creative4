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

@media only screen and (max-width: 799px) {
  .Puppies {
    padding: 12px;
    width: 100%;
  }
}
</style>