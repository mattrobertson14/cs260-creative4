<template>
  <div class="PuppyEdit">
    <div class="loading" v-if="loading">
      <LoadingBlocks />
    </div>
    <div v-else class="content">
      <div classe="form">
        <h2>Edit {{ name }}&apos;s Information</h2>
        <button type="raised" class="deleteButton" @click="() => deletePuppy()">Delete</button>
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
        <p v-show="saved && changes">
          Saved
          <i class="material-icons">check_circle_outline</i>
        </p>
        <p class="unsaved" v-show="!saved && changes">
          Unsaved Changes
        </p>
        <span class="spacer" />
        <button class="cancel" type="text" @click="() => this.$router.push('/admin')">cancel</button>
        <button v-if="!submitting" type="raised" @click="() => savePuppy()">{{submitting ? 'saving...' : 'save'}}</button>
        <button v-else disabled type="raised">saving...</button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import Input from '@/components/Input.vue'
import LoadingBlocks from '@/components/LoadingBlocks.vue'

export default {
  name: 'PuppyEdit',
  components: {
    Input,
    LoadingBlocks
  },
  data() {
    return {
      loading: false,
      submitting: false,
      saved: true,
      changes: false,
      name: '',
      birthday: moment().format('YYYY-MM-DD'),
      breed1: '',
      breed2: '',
      breed3: '',
      owner1: '',
      owner2: '',
      owner3: ''
    }
  },
  created() {
    this.getPuppy().then(() => {this.saved = true; this.changes = false})
  },
  methods: {
    async getPuppy() {
      this.loading = true;
      const { id } = this.$route.params
      try {
        let { data } = await axios.get(`/api/puppies/${id}`)
        const { name, birthday, breed, owners } = data
        this.name = name || ''
        this.birthday = birthday? moment(birthday).utc().format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')
        this.breed1 = breed && breed[0]? breed[0] : '',
        this.breed2 = breed && breed[1]? breed[1] : '',
        this.breed3 = breed && breed[2]? breed[2] : '',
        this.owner1 = owners && owners[0]? owners[0] : ''
        this.owner2 = owners && owners[1]? owners[1] : ''
        this.owner3 = owners && owners[2]? owners[2] : ''
        return true
      } catch (err) {
        window.console.error(err)
      } finally {
        this.loading = false
      }
    },
    async savePuppy() {
      const { id } = this.$route.params
      this.submitting = true
      try {
        await axios.put(`/api/puppies/${id}`, {
          name: this.name,
          breed: [this.breed1,this.breed2,this.breed3].filter(b=>!!b),
          owners: [this.owner1,this.owner2,this.owner3].filter(o=>!!o),
          birthday: this.birthday,
        })
        this.saved = true
        return true
      } catch (err) {
        window.console.error(err)
      } finally {
        this.submitting = false
      }
    },
    async deletePuppy() {
      const { id } = this.$route.params
      let confirmation = confirm(`Are you sure you want to delete ${this.name}?\n\nTHIS ACTION CANNOT BE UNDONE.`)
      if (!confirmation) return
      this.loading = true
      try {
        await axios.delete(`/api/puppies/${id}`)
      } catch (err) {
        window.console.error(err)
      } finally {
        this.loading = false
        this.$router.push('/admin')
      }
    },
  },
  watch: {
    name() { this.changes = true; this.saved = false },
    birthday() { this.changes = true; this.saved = false },
    breed1() { this.changes = true; this.saved = false },
    breed2() { this.changes = true; this.saved = false },
    breed3() { this.changes = true; this.saved = false },
    owner1() { this.changes = true; this.saved = false },
    owner2() { this.changes = true; this.saved = false },
    owner3() { this.changes = true; this.saved = false },
  }
}
</script>

<style scoped>
.PuppyEdit {
  width: 400px;
  margin: 0px auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.loading {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

h2 {
  margin: 0px;
  line-height: 40px;
  margin-bottom: 14px;
}

.deleteButton, .deleteButton:active,
.deleteButton:focus, .deleteButton:focus:hover {
  background: var(--color-error);
}

.deleteButton:hover {
  background: var(--color-error-70);
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 24px;
}

.buttons .cancel {
  margin-right: 8px;
}

.buttons p {
  display: flex;
  align-items: center;
  color: green;
  opacity: .9;
  margin: 0;
}

.buttons p.unsaved {
  color: red;
}

.buttons i {
  margin: 0px 12px 0px 8px;
  font-size: 18px;
  display: flex;
  align-items: center;
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
  .PuppyEdit {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
  }
}
</style>