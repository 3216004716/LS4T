<script setup lang="ts">
import { ref } from 'vue'
import TriangleCanvas from './components/TriangleCanvas.vue'
import Toolbar from './components/Toolbar.vue'
import sampleTriangles from './data/triangles.json'

const triangles = ref(sampleTriangles)
const settings = ref({
  sizeRange: [10, 100],
  spacing: 20,
  randomLayout: false
})

function handleSettingsUpdate(newSettings: any) {
  settings.value = newSettings
  // TODO: Update triangles based on new settings
}
</script>

<template>
  <div class="app-container">
    <Toolbar @updateSettings="handleSettingsUpdate" />
    <TriangleCanvas 
      :triangles="triangles" 
      :spacing="settings.spacing" 
    />
  </div>
</template>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
