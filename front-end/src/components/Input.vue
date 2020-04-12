<template>
  <span class="input">
    <span v-show="icon" class="material-icons">{{icon}}</span>
    <input @input="handleInput($event.target.value)" :placeholder="placeholder" :type="type || 'text'">
  </span>
</template>

<script>
export default {
  name: 'Input',
  props: ['value', 'placeholder', 'icon', 'type'],
  methods: {
    handleInput(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  border: 2px solid rgba(0,0,0,.3);
  background: var(--color-background);
  letter-spacing: 0.75px;
  margin-bottom: 24px;
}

.input .material-icons {
  margin-left: 12px;
}

.input:focus-within {
  border: 2px solid var(--color-primary);
}

.input:focus-within .material-icons {
  color: var(--color-primary);
}

input {
  width: 100%;
  padding: 12px 24px 12px 12px;
  font-size: 14px;
  background: transparent;
  outline: none;
  border: none;
}

input::placeholder {
  color: var(--color-text-lightest);
}
</style>