<template>
  <div class="modal" @click.self="close()">
    <slot><div class="default">Add children!</div></slot>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.6);
  box-sizing: border-box;
}

.modal > div {
  box-shadow: var(--shadow-8dp);
  max-height: 90vh;
  overflow-y: auto;
}

.default {
  background: var(--color-background);
  width: 200px;
  height: 100px;
}

@media only screen and (max-width: 799px) {
  .modal {
    z-index: 1000;
  }

  .modal > div {
    max-height: 80%;
  }
}
</style>