<template>
  <div class="grid grid-cols-4 gap-4">
      <button
        v-for="month in months"
        :key="month.value"
        class="py-2 px-2 sm:px-5 text-xs sm:text-base hover:bg-gray-700 rounded"
        :class="{ 'bg-blue-500 text-white': month.value === selectedMonth }"
        @click="selectMonth(month)"
      >
          {{ month.label }}
      </button>
  </div>
</template>

<script>
export default {
    name: 'CalenderMonths',
    computed: {
        englishMonths() {
            return this.$store.getters['getEnglishMonths']
        },
        persianMonths() {
            return this.$store.getters['getPersianMonths']
        },
        currentDate() {
            return this.$store.getters['getCurrentDate']
        },
        months() {
            const dateType = this.$store.getters['getDateType']
            return dateType === 'fa' ? this.persianMonths : this.englishMonths
        },
        dateType() {
            return this.$store.getters['getDateType']
        },
        selectedMonth() {
            return this.$store.getters['getSelectedMonth']
        },
    },
    methods: {
        selectMonth(month) {
            this.$store.commit('setSelectedMonth', month.value)
        }
    }
}
</script>
