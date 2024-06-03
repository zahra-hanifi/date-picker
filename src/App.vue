<template>
  <div id="app">
    <div class="bg-black min-h-[100vh] p-4 m-auto flex items-center justify-center">
      <DatePicker />
    </div>
  </div>
</template>

<script>
import DatePicker from './components/DatePicker.vue'

export default {
  name: 'App',
  components: {
    DatePicker
  }
}
</script>
