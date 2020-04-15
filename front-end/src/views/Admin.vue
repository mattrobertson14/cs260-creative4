<template>
  <div class="admin">
    <h1>Admin</h1>
    <div class="puppyTable" v-show="currentTab === 'puppy'">
      <PuppyList editable="true" />
    </div>
  </div>
</template>

<script>
import PuppyList from '@/components/PuppyList.vue'

export default {
  name: 'Admin',
  components: {
    PuppyList,
  },
  data() {
    return {
      currentTab: 'puppy'
    }
  }
}
</script>

<style scoped>
.admin {
  max-width: 800px;
  margin: 0px auto;
}
.tabs {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 32px;
}
.tab {
  cursor: pointer;
  border-bottom: 2px solid rgba(0,0,0,.1);
  width: 33%;
  text-align: center;
  padding: 12px 0px;
}
.tab[active="true"] {
  background: rgba(0,0,0,.1);
  border-bottom: 2px solid var(--color-primary);
}

@media only screen and (max-width: 799px) {
  .admin {
    padding: 12px;
    width: 100%;
    box-sizing: border-box;
  }
}
</style>