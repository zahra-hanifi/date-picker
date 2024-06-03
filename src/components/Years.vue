<template>
    <div class="grid grid-cols-4 gap-4">
        <button
          v-for="year in years"
          :key="year"
          class="py-2 px-2 sm:px-5 text-xs sm:text-base hover:bg-gray-700 rounded"
          :class="{ 'bg-blue-500 text-white': year === selectedYear }"
          @click="selectYear(year)"
        >
            {{ year }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'CalenderYears',
    computed: {
        currentDate() {
            return this.$store.getters['getCurrentDate']
        },
        years() {
            const dateType = this.$store.getters['getDateType']
            if (dateType === 'fa') {
                this.$store.dispatch('calculatePersianYears', this.currentDate.year)
                return this.$store.getters['getPersianYears']
            } else {
                this.$store.dispatch('calculateEnglishYears', this.currentDate.year)
                return this.$store.getters['getEnglishYears']
            }
        },
        selectedYear() {
            return this.$store.getters['getSelectedYear']
        }
    },
    methods: {
        selectYear(year) {
            this.$store.commit('setSelectedYear', year)
        }
    }
}
</script>
