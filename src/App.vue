<template>
  <div id="app">
    <Motivationskalendern />
  </div>
</template>

<script>
import Motivationskalendern from './components/Motivationskalendern.vue'

export default {
  name: 'App',
  components: {
    Motivationskalendern
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
