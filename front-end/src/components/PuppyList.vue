<template>
  <div class="root">
    <Input v-model="puppySearch" placeholder="Search" icon="search"/>
    <div class="puppylist">
      <div class="puppy" v-for="puppy in filteredPuppies" :key="puppy._id" @click="handlePuppyClick(puppy._id)">
        <span class="avatar">
          <img v-if="puppy.image" alt="puppy" :src="puppy.image" />
          <span v-else class="material-icons">pets</span>
        </span>
        <span class="info">
          <h2>{{puppy.name}}</h2>
          <p>{{puppy.breed && puppy.breed[0] ? puppy.breed[0] : 'Unknown'}}</p>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Input from './Input.vue'

export default {
  name: 'PuppyList',
  components: {
    Input
  },
  data() {
    return {
      puppies: [],
      puppySearch: '',
    }
  },
  created() {
    this.getPuppies()
  },
  methods: {
    async getPuppies() {
      try {
        let { data } = await axios.get('/api/puppies')
        this.puppies = data
        return true
      } catch (err) {
        window.console.error(err)
      }
    },
    handlePuppyClick(id) {
      this.$router.push(`/puppies/${id}`)
    }
  },
  computed: {
    filteredPuppies() {
      return this.puppies.filter(pup => {
        const search = this.puppySearch.toLowerCase()
        const name = pup.name.toLowerCase()
        const nameMatch = name.includes(search)
        const breedMatch = pup.breed.find(b => b.toLowerCase().includes(search))

        return nameMatch || breedMatch
      })
    }
  }
}
</script>

<style scoped>
.root * {
  box-sizing: border-box;
}

.root {
  width: 700px;
  margin: 0px auto;
}

.puppy {
  display: flex;
  width: 100%;
  box-shadow: var(--shadow-4dp);
  background: var(--color-background-lvl1);
  padding: 16px;
  border-radius: 4px;
  transition-property: filter, box-shadow;
  transition-duration: .2s;
  transition-timing-function: ease-in-out;
  cursor: pointer;
  margin-bottom: 12px;
}

.puppy:hover {
  background: var(--color-background-lvl2);
  box-shadow: var(--shadow-6dp);
}

h2, p {
  margin: 0;
}

.info {
  margin-left: 16px;
}

h2 {
  line-height: 40px;
}

img {
  height: 100%;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar .material-icons {
  background: var(--color-primary-dark);
  height: 48px;
  width: 48px;
  color: white;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 48px;
}
</style>