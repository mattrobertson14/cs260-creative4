<template>
  <div class="PuppyActions">
    <div class="action" @click="openPottyForm()">
      <i class="material-icons">priority_high</i>
      <p>Record Potty</p>
    </div>
    <div class="action" @click="openWalkForm()">
      <i class="material-icons">directions_walk</i>
      <p>Record Walk</p>
    </div>
    <Dialog v-show="formType === 'potty'" @close="formType=null">
      <div class="modalContents">
        <h2>New Potty Entry</h2>
        <div class="form">
          <span class="formLabel">What Time?</span>
          <label>
            <input type="radio" v-model="showDatePicker" :value="false">
            Just Now
          </label>
          <label>
            <input type="radio" v-model="showDatePicker" :value="true">
            Earlier
          </label>
          <p class="date">
            <span class="label">Date</span>
            <span class="value">{{formattedDate}}</span>
          </p>
          <div v-show="showDatePicker" class="date-picker">
            <input type="date" v-model="date" :max="maxDate" @change="handleDateChange($event)" />
            <span class="time">
              <select v-model="hour" @change="handleHourChange($event)">
                <option v-for="i in 12" :key="i" :value="i">{{formatInt(i)}}</option>
              </select>
              :
              <select v-model="minute" @change="handleMinuteChange($event)">
                <option v-for="i in 59" :key="i" :value="i">{{formatInt(i)}}</option>
              </select>
              <label>
                <input type="radio" v-model="tod" value="am">
                AM
              </label>
              <label v-show="showPM">
                <input type="radio" v-model="tod" value="pm">
                PM
              </label>
            </span>
          </div>
        </div>
        <div class="buttons">
          <button type="text" @click="formType=null">cancel</button>
          <button type="raised">save</button>
        </div>
      </div>
    </Dialog>
    <Dialog v-show="formType === 'walk'" @close="formType=null">
      <div class="form">

      </div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from './Dialog.vue'
import moment from 'moment'

export default {
  name: 'PuppyActions',
  components: {
    Dialog
  },
  data() {
    return {
      formType: null,
      showDatePicker: false,
      date: moment().format('YYYY-MM-DD'),
      hour: moment().format('h'),
      minute: moment().format('m'),
      tod: moment().format('a'),
    }
  },
  methods: {
    openPottyForm() {
      this.formType = 'potty'
    },
    openWalkForm() {
      this.formType = 'walk'
    },
    formatInt(i){
      return i > 9 ? i : `0${i}`
    },
    handleDateChange(ev) {
      const { value } = ev.target
      if (moment().format('YYYY-MM-DD') === value && moment().format('a') === 'am'){
        this.tod = 'am'
      }
    },
    handleHourChange(ev) {
      const { value } = ev.target
      const mom = moment()
      if (value > mom.format('h')
            && mom.format('YYYY-MM-DD') === this.date
            && this.tod === 'pm'
      ){
        this.tod = 'am'
      } else if (value > mom.format('h') && mom.format('YYYY-MM-DD') === this.date){
        this.date = mom.subtract(1,'d').format('YYYY-MM-DD')
        this.tod = 'pm'
      }
    },
    handleMinuteChange(ev) {
      const { value } = ev.target
      console.log(value)
      const mom = moment()
      if (
        value > mom.format('m')
          && mom.format('h') === this.hour
          && mom.format('YYYY-MM-DD') === this.date
          && this.hour > 1
      ){
        this.hour = this.hour - 1
      } else if (
        value > mom.format('m')
          && mom.format('h') === this.hour
          && mom.format('YYYY-MM-DD') === this.date
          && mom.format('a') === 'pm'
      ){
        this.tod = 'am'
      } else if (
        value > mom.format('m')
          && mom.format('h') === this.hour
          && mom.format('YYYY-MM-DD') === this.date
      ){
        this.date = mom.subtract(1, 'd').format('YYYY-MM-DD')
        this.tod = 'pm'
      }
    },
  },
  computed: {
    showPM() {
      if (moment().format('YYYY-MM-DD') === this.date && moment().format('a') === 'am'){
        return false
      } else {
        return true
      }
    },
    maxDate() {
      return moment().format('YYYY-MM-DD')
    },
    formattedDate() {
      return moment().format('dddd, MMMM Do, YYYY @ h:mm a')
    }
  }
}
</script>

<style scoped>
.PuppyActions {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action, .action:active {
  height: 30px;
  padding: 12px;
  border-radius: 4px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: var(--color-background-lvl1);
  box-shadow: var(--shadow-4dp);
  cursor: pointer;
  transition-property: background box-shadow;
  transition-duration: .1s;
  transition-timing-function: ease-in-out;
  user-select: none;
}

.action:first-child {
  margin-right: 24px;
}

.action:hover,
  .action:focus {
  filter: brightness(102%);
  box-shadow: var(--shadow-6dp);
}

.action i {
  color: var(--color-primary);
}

.action p {
  margin: 0px;
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

input[type="radio"] {
  margin-right: 2px;
  margin-left: 14px;
  cursor: pointer;
}

label {
  cursor: pointer;
}

.date-picker {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 8px;
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

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-family: 'Baloo Paaji 2', sans-serif;
  background: transparent;
  border: 1px solid rgba(0,0,0,.4);
  border-radius: 4px;
  padding: 6px;
  outline: none;
  line-height: 18px;
  font-size: 14px;
  cursor: pointer;
  height: 35px;
  box-sizing: border-box;
}

.time select:nth-child(2) {
  margin-right: 8px;
}

.date {
  margin-top: 2px;
}

.date .label {
  color: var(--color-text-light);
  margin-right: 8px;
}

.date .value {
  letter-spacing: .8px;
}
</style>