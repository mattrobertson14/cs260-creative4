<template>
  <div v-if="puppy._id" class="PuppyOverview">
    <div class="header">
      <span class="avatar">
        <img v-if="puppy.image" alt="puppy" :src="puppy.image" />
        <img v-else alt="generic dog" src="/dog_avatar.png" />
      </span>
      <div class="info">
        <h2>{{ puppy.name }}</h2>
        <p>
          <span class="label">Birthday</span>
          <span class="value">{{ this.formatBirthday() }}</span>
        </p>
        <p>
          <span class="label">Breeds</span>
          <span class="value">{{ this.formatBreeds() }}</span>
        </p>
        <p>
          <span class="label">Owners</span>
          <span class="value">{{ this.formatOwners() }}</span>
        </p>
      </div>
      <div class="spacer" />
      <div class="buttons">
        <button type="outlined" @click="handleAdminClick()">
          <i class="material-icons">build</i>
          Admin
        </button>
      </div>
    </div>
    <div class="actions">
      <PuppyActions :puppy="puppy" :onDataChange="() => refetchHistory()"/>
    </div>
    <div class="history">
      <h2>Recent Activity</h2>
      <div v-if="historyLoading" class="loading"><LoadingBlocks /></div>
      <div v-else class="list">
        <div v-for="key in Object.keys(history)" :key="key">
          <h3>{{formatDate(key)}}</h3>
          <div v-for="entry in history[key]" :key="entry._id">
            <p class="entry" v-if="entry.type === 'bathroom'">
              <i class="fas fa-toilet"></i>
              <span class="text">
                <span class="line1">{{puppy.name}} went {{entry.pee? entry.poop? 'pee & ' : 'pee' : ''}}{{entry.poop? 'poop' : ''}} {{entry.outside? 'outside' : 'inside'}}</span>
                <span class="line2">{{entry.time}}</span>
              </span>
              <span class="spacer" />
              <i class="material-icons" @click="deleteBathroom(entry._id)">close</i>
            </p>
            <p class="entry" v-else>
              <i class="material-icons">directions_walk</i>
              <span class="text">
                <span class="line1">{{puppy.name}} went on a {{entry.distance}} {{entry.distance_unit}} walk at {{entry.location}}</span>
                <span class="line2">{{entry.time}}</span>
              </span>
              <span class="spacer" />
              <i class="material-icons" @click="deleteWalk(entry._id)">close</i>
            </p>
          </div>
        </div>
      </div>
   </div>
  </div>
  <div v-else-if="loading" class="loading">
    <LoadingBlocks />
  </div>
  <div v-else>Error retrieiving Puppy</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import LoadingBlocks from '@/components/LoadingBlocks.vue'
import PuppyActions from '@/components/PuppyActions.vue'

export default {
  name: 'PuppyOverview',
  components: {
    LoadingBlocks,
    PuppyActions
  },
  data() {
    return {
      puppy: {},
      loading: false,
      history: {},
      historyLoading: false,
      formatDate: (date) => {
        if (moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')){
          return 'Today'
        }
        if (moment(date).format('YYYY-MM-DD') === moment().subtract(1,'d').format('YYYY-MM-DD')){
          return 'Yesterday'
        }
        return moment(date).format('dddd - MM/DD/YYYY')
      }
    }
  },
  created() {
    this.getPuppy()
    this.getHistory(true)
  },
  methods: {
    async getPuppy() {
      this.loading = true;
      const { id } = this.$route.params
      try {
        let { data } = await axios.get(`/api/puppies/${id}`)
        this.puppy = data
        return true
      } catch (err) {
        window.console.error(err)
      } finally {
        this.loading = false
      }
    },
    async getHistory(showLoading) {
      this.historyLoading = showLoading
      const { id } = this.$route.params
      try {
        let { data } = await axios.get(`/api/puppies/${id}/history`)
        let historyObj = {}
        data.map(e => {
          let obj = {
            ...e,
            time: moment(e.date).format('hh:mm a'),
          }
          let key = moment(e.date).format('YYYY-MM-DD')
          if (!historyObj[key]){
            historyObj[key] = [obj]
          } else {
            historyObj[key].push(obj)
          }
        })
        this.history = historyObj
        return true
      } catch (err) {
        window.console.error(err)
      } finally {
        this.historyLoading = false
      }
    },
    async refetchHistory() {
      await this.getHistory(false)
    },
    formatBirthday() {
      const { birthday } = this.puppy
      if (!birthday) return 'Unknown'
      const bday = moment(birthday)
      return bday.utc().format('MMMM Do, YYYY')
    },
    formatBreeds() {
      const { breed } = this.puppy
      if (!breed || !Array.isArray(breed)) return 'Unknown'
      return breed.join(', ')
    },
    formatOwners() {
      const { owners } = this.puppy
      if (!owners || !Array.isArray(owners)) return 'Unknown'
      if (owners.length < 3) return owners.join(' & ')
      return owners.join(', ')
    },
    handleAdminClick() {
      const { _id } = this.puppy
      this.$router.push(`/admin/puppies/${_id}`)
    },
    async deleteBathroom(id) {
      try {
        console.log('here')
        await axios.delete(`/api/bathrooms/${id}`)
        console.log('here2')
        await this.getHistory(false)
        console.log('here3')
      } catch (err) {
        window.console.error(err)
      }
    },
    async deleteWalk(id) {
      try {
        await axios.delete(`/api/walks/${id}`)
        return true
      } catch (err) {
        window.console.error(err)
      } finally {
        this.refetchHistory()
      }
    }
  },
}
</script>

<style scoped>
.PuppyOverview {
  padding: 32px;
  max-width: 1000px;
  margin: 0px auto;
}

.loading {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header {
  display: flex;
  align-items: center;
}

.avatar {
  display: block;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 32px;
}

.avatar img {
  width: 100%;
  height: 100%;
}

.info h2 {
  margin: 0;
  line-height: 40px;
}

.info p {
  margin: 0;
  line-height: 24px;
}

.info .label {
  display: inline-block;
  width: 60px;
  color: var(--color-text-light);
  margin-right: 8px;
}

.actions {
  margin-top: 24px;
  width: 100%;
}

.history {
  width: 500px;
  margin: 0px auto;
}

.entry {
  height: 65px;
  margin-bottom: 6px;
  margin-top: 0px;
  background: var(--color-background-lvl1);
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.line2 {
  display: block;
  line-height: 14px;
  font-size: 14px;
  color: var(--color-text-light);
}

.entry .text {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.entry i {
  margin: 0px 12px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-text-primary);
  cursor: pointer;
}

.entry i:first-child {
  color: var(--color-primary);
  cursor: initial;
}

.list h3 {
  color: var(--color-text-secondary);
}

.break {
  display: none;
}

@media only screen and (max-width: 799px) {
  .PuppyOverview {
    padding: 12px;
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 32px;
  }

  .header {
    flex-direction: column;
  }
  
  .header .avatar {
    margin: 0px;
  }

  .header .info h2 {
    text-align: center;
  }

  .header .spacer {
    display: none;
  }

  .header .buttons {
    margin-top: 16px;
  }

  .history {
    width: 100%;
  }
}
</style>