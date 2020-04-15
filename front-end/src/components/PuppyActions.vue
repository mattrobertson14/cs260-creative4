<template>
  <div class="PuppyActions">
    <div class="action" @click="openPottyForm()">
      <i class="fas fa-toilet"></i>
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
            </span>
            <div class="options">
              <span class="option" :active="tod === 'am'" @click="tod = 'am'">AM</span>
              <span class="option" v-show="showPM" :active="tod === 'pm'" @click="tod = 'pm'">PM</span>
            </div>
          </div>
          <div class="whenOption">
            <p>When?</p>
            <div class="options">
              <span class="option" :active="!showDatePicker" @click="handleJustNowClick()">Just Now</span>
              <span class="option" :active="showDatePicker" @click="showDatePicker = true">Earlier</span>
            </div>
          </div>
          <div class="pottyOption">
            <p>What did {{ puppy.name }} do?</p>
            <div class="options">
              <span class="option" :active="pottyOption === 'pee'" @click="pottyOption = 'pee'">Pee</span>
              <span class="option" :active="pottyOption === 'poop'" @click="pottyOption = 'poop'">Poop</span>
              <span class="option" :active="pottyOption === 'both'" @click="pottyOption = 'both'">Both</span>
            </div>
          </div>
          <div class="whereOption">
            <p>Where?</p>
            <div class="options">
              <span class="option good" :active="whereOption === 'outside'" @click="whereOption = 'outside'">Outside</span>
              <span class="option bad" :active="whereOption === 'inside'" @click="whereOption = 'inside'">Inside</span>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button type="text" @click="formType=null">cancel</button>
          <button v-if="!submitting" type="raised" @click="() => handlePottySubmit()">{{submitting ? 'saving...' : 'save'}}</button>
          <button v-else disabled type="raised">saving...</button>
        </div>
      </div>
    </Dialog>
    <Dialog v-show="formType === 'walk'" @close="formType=null">
      <div class="modalContents">
        <h2>New Walk Entry</h2>
        <div class="form">
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
            </span>
            <div class="options">
              <span class="option" :active="tod === 'am'" @click="tod = 'am'">AM</span>
              <span class="option" v-show="showPM" :active="tod === 'pm'" @click="tod = 'pm'">PM</span>
            </div>
          </div>
          <div class="whenOption">
            <p>When?</p>
            <div class="options">
              <span class="option" :active="!showDatePicker" @click="handleJustNowClick()">Just Now</span>
              <span class="option" :active="showDatePicker" @click="showDatePicker = true">Earlier</span>
            </div>
          </div>
          <p>Where?</p>
          <Input type="text" v-model="location" placeholder="Location"/>
          <p>How far did {{ puppy.name }} walk?</p>
          <div class="distance">
            <Input type="number" v-model="distance" min="0" />
            <div class="switcher">
              <span class="option" :active="unit === 'mi'" @click="unit = 'mi'">mi</span>
              <span class="option" :active="unit === 'km'" @click="unit = 'km'">km</span>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button type="text" @click="formType=null">cancel</button>
          <button v-if="!submitting" type="raised" @click="() => handleWalkSubmit()">{{submitting ? 'saving...' : 'save'}}</button>
          <button v-else disabled type="raised">saving...</button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from './Dialog.vue'
import Input from './Input.vue'
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'PuppyActions',
  props: ['puppy', 'onDataChange'],
  components: {
    Dialog,
    Input
  },
  data() {
    return {
      formType: null,
      showDatePicker: false,
      date: moment().format('YYYY-MM-DD'),
      hour: moment().format('h'),
      minute: moment().format('m'),
      tod: moment().format('a'),
      pottyOption: 'pee',
      whereOption: 'outside',
      distance: 0,
      unit: 'mi',
      location: '',
      submitting: false,
    }
  },
  methods: {
    openPottyForm() {
      this.resetForm()
      this.formType = 'potty'
    },
    openWalkForm() {
      this.resetForm()
      this.formType = 'walk'
    },
    async handlePottySubmit() {
      this.submitting = true
      const { _id } = this.puppy
      const { pottyOption, whereOption } = this
      try {
        axios.post(`/api/puppies/${_id}/bathrooms`, {
          date: this.getDateForApi(),
          poop: pottyOption === 'poop' || pottyOption === 'both',
          pee: pottyOption === 'pee' || pottyOption === 'both',
          outside: whereOption === 'outside',
          puppy_id: _id
        })
        if (this.onDataChange && typeof this.onDataChange === 'function'){
          await this.onDataChange()
        }
        this.formType = null
      } catch (error) {
        window.console.error(error)
      } finally {
        this.submitting = false
      }
    },
    async handleWalkSubmit() {
      this.submitting = true
      const { _id } = this.puppy
      const { distance, unit, location } = this
      try {
        axios.post(`/api/puppies/${_id}/walks`, {
          date: this.getDateForApi(),
          distance,
          distance_unit: unit,
          location,
          puppy_id: _id
        })
        if (this.onDataChange && typeof this.onDataChange === 'function'){
          await this.onDataChange()
        }
        this.formType = null
      } catch (error) {
        window.console.error(error)
      } finally {
        this.submitting = false
      }
    },
    formatInt(i){
      return i > 9 ? i : `0${i}`
    },
    getDateForApi(){
      const { date, hour, minute, tod } = this
      let mmnt = moment(`${date} ${hour}:${minute}${tod}`, 'YYYY-MM-DD h:ma')
      return new Date(mmnt)
    },
    handleJustNowClick() {
      this.date = moment().format('YYYY-MM-DD')
      this.hour = moment().format('h')
      this.minute = moment().format('m')
      this.tod = moment().format('a')
      this.showDatePicker = false
    },
    resetForm() {
      this.showDatePicker = false
      this.date = moment().format('YYYY-MM-DD')
      this.hour = moment().format('h')
      this.minute = moment().format('m')
      this.tod = moment().format('a')
      this.pottyOption = 'pee'
      this.whereOption = 'outside'
      this.submitting = false
      this.distance = 0
      this.unit = 'mi'
      this.location = ''
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
      if (value > parseInt(mom.format('h'))
            && mom.format('YYYY-MM-DD') === this.date
            && this.tod === 'pm'
      ){
        this.tod = 'am'
      } else if (value > parseInt(mom.format('h')) && mom.format('YYYY-MM-DD') === this.date){
        this.date = mom.subtract(1,'d').format('YYYY-MM-DD')
        this.tod = 'pm'
      }
    },
    handleMinuteChange(ev) {
      const { value } = ev.target
      const mom = moment()
      if (
        value > parseInt(mom.format('m'))
          && parseInt(mom.format('h')) == this.hour
          && mom.format('YYYY-MM-DD') === this.date
          && this.hour > 1
      ){
        this.hour = this.hour - 1
      } else if (
        value > parseInt(mom.format('m'))
          && parseInt(mom.format('h')) == this.hour
          && mom.format('YYYY-MM-DD') === this.date
          && mom.format('a') === 'pm'
      ){
        this.tod = 'am'
      } else if (
        value > parseInt(mom.format('m'))
          && parseInt(mom.format('h')) == this.hour
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
      const { date, hour, minute, tod } = this
      return moment(`${date} ${hour}:${minute}${tod}`, 'YYYY-MM-DD h:ma')
        .format('dddd, MMMM Do, YYYY @ h:mm a')
    },
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

.distance {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form .input {
  margin: 0;
}

.distance .input input {
  text-align: center;
}

.distance .switcher {
  margin-left: 24px;
  height: 32px;
  width: 30%;
}

.distance .switcher .option {
  padding: 2px 6px;
}

.options, .switcher {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.switcher {
  justify-content: center;
}

.options .option, .switcher .option {
  display: inline-block;
  text-align: center;
  border: 1px solid rgba(0,0,0,.3);
  color: var(--color-text-light);
  border-radius: 4px;
  padding: 6px 0px;
  cursor: pointer;
}

.switcher .option:first-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.switcher .option:last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.options .option[active="true"], .switcher .option[active="true"] {
  border: 1px solid var(--color-primary);
  background: var(--color-primary-70);
  color: white;
}

.option.good[active="true"] {
  border: 1px solid var(--color-success);
  background: var(--color-success-70);
}

.option.bad[active="true"] {
  border: 1px solid var(--color-error);
  background: var(--color-error-70);
}

.pottyOption .option {
  width: 30%;
}

.whereOption .option, .whenOption .option {
  width: 45%;
}

.date-picker .options {
  width: 80px;
}

.date-picker .options .option {
  width: 45%;
  font-size: 14px;
  line-height: 23px;
  padding: 6px 0px;
}

@media only screen and (max-width: 799px) {
  .modalContents {
    width: 100%;
  }
}
</style>