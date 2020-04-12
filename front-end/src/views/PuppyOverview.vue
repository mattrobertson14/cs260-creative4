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
      <PuppyActions />
    </div>
    <div class="raw">
      <pre>{{ JSON.stringify(puppy, null, 2) }}</pre>
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
    }
  },
  created() {
    this.getPuppy(this.$route.params.id)
  },
  methods: {
    async getPuppy(id) {
      this.loading = true;
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
    }
  }
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

</style>