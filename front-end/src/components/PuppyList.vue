<template>
  <div class="root">
    <Input v-model="puppySearch" placeholder="Search" icon="search"/>
    <button v-show="editable" type="raised" class="addButton" @click="handleAddClick">+ add puppy</button>
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
        <span class="spacer" />
      </div>
    </div>
    <Dialog v-show="showForm" @close="showForm=false">
      <div class="modalContents">
        <h2>New Puppy</h2>
        <div classe="form">
          <p>Name</p>
          <Input type="text" v-model="name" />
          <p>Birthday</p>
          <input type="date" v-model="birthday" />
          <p>Breeds</p>
          <Input type="text" v-model="breed1" placeholder="Breed 1"/>
          <Input type="text" v-model="breed2" placeholder="Breed 2"/>
          <Input type="text" v-model="breed3" placeholder="Breed 3"/>
          <p>Owners</p>
          <Input type="text" v-model="owner1" placeholder="Owner 1" />
          <Input type="text" v-model="owner2" placeholder="Owner 2" />
          <Input type="text" v-model="owner3" placeholder="Owner 3" />
        </div>
        <div class="buttons">
          <button type="text" @click="showForm=false">cancel</button>
          <button v-if="!submitting" type="raised" @click="() => addPuppy()">{{submitting ? 'saving...' : 'save'}}</button>
          <button v-else disabled type="raised">saving...</button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import axios from 'axios';
import Input from './Input.vue'
import Dialog from './Dialog.vue'
import moment from 'moment'

export default {
  name: 'PuppyList',
  props: ['editable'],
  components: {
    Input,
    Dialog
  },
  data() {
    return {
      puppies: [],
      puppySearch: '',
      showForm: false,
      submitting: false,
      name: '',
      breed1: '',
      breed2: '',
      breed3: '',
      owner1: '',
      owner2: '',
      owner3: '',
      birthday: moment().format('YYYY-MM-DD')
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
    async addPuppy() {
      try {
        await axios.post('/api/puppies', {
          name: this.name,
          breed: [this.breed1,this.breed2,this.breed3].filter(b=>!!b),
          owners: [this.owner1,this.owner2,this.owner3].filter(o=>!!o),
          birthday: this.birthday,
          image: ''
        })
        this.getPuppies()
        this.showForm = false
      } catch (err) {
        window.console.error(err)
      } finally {
        this.submitting = false
      }
    },
    handleAddClick() {
      this.resetForm();
      this.showForm = true
    },
    resetForm() {
      this.name =  ''
      this.breed1 =  ''
      this.breed2 =  ''
      this.breed3 =  ''
      this.owner1 =  ''
      this.owner2 =  ''
      this.owner3 =  ''
      this.birthday =  moment().format('YYYY-MM-DD')
    },
    handlePuppyClick(id) {
      if (this.editable){
        this.$router.push(`/admin/puppies/${id}`)
      } else {
        this.$router.push(`/puppies/${id}`)
      }
        
    },
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

.addButton {
  margin-bottom: 24px;
  width: 100%;
  justify-content: center;
}

.modalContents {
  width: 400px;
  background: var(--color-background);
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.modalContents h2 {
  margin: 0px;
  line-height: 40px;
  margin-bottom: 14px;
}

.modalContents .buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 24px;
}

.modalContents .buttons button:first-child {
  margin-right: 8px;
}

input[type="date"] {
  box-sizing: border-box;
  font-family: 'Baloo Paaji 2', sans-serif;
  flex: 1;
  background: transparent;
  border: 1px solid rgba(0,0,0,.3);
  border-radius: 4px;
  padding: 6px;
  outline: none;
  margin-right: 14px;
  line-height: 18px;
  font-size: 14px;
  height: 35px;
}

@media only screen and (max-width: 799px) {
  .root {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>