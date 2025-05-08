<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['updateSettings'])

const settings = ref({
  sizeRange: [10, 100],
  spacing: 20,
  randomLayout: false
})

function updateSettings() {
  emit('updateSettings', settings.value)
}
</script>

<template>
  <div class="toolbar">
    <div>
      <label>Size Range:</label>
      <input type="range" v-model="settings.sizeRange[0]" min="5" max="50">
      <input type="range" v-model="settings.sizeRange[1]" min="51" max="150">
    </div>
    <div>
      <label>Spacing:</label>
      <input type="number" v-model.number="settings.spacing" min="0" max="100">
    </div>
    <div>
      <label>
        <input type="checkbox" v-model="settings.randomLayout">
        Random Layout
      </label>
    </div>
    <button @click="updateSettings">Apply</button>
  </div>
</template>

<style scoped>
.toolbar {
  padding: 1rem;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
}
</style>
