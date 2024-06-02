<template>
  <div id="app" dir="rtl">
    <div class="bg-black min-h-[100vh] flex justify-center items-center">
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
