<template>
  <div class="flex flex-col gap-y-6">
    <div class="flex items-center">
        <button
          v-if="showPreviousButton"
          class="hover:bg-gray-700 rounded-full p-1 aspect-square w-8 h-8"
          @click="previous"
        >
            &lt;
        </button>

        <span class="text-center flex-grow ">{{ month.title }}</span>

        <button
          v-if="showNextButton"
          class="hover:bg-gray-700 rounded-full p-1 aspect-square w-8 h-8"
          @click="next"
        >
            &gt;
        </button>
    </div>

    <div class="flex flex-col gap-y-3 overflow-x-hidden">
      <div class="flex items-center gap-x-4">
        <span
          v-for="weekDay in weekDays"
          :key="weekDay"
          class="w-6 sm:w-10 text-center text-base"
        >
          {{ weekDay }}
        </span>
      </div>

      <template v-for="(week, index) in month.weeks">
        <div class="flex items-center gap-x-4" :key="index">
          <div
            v-for="(day, index2) in week"
            :key="index2"
            class="w-6 sm:w-10 flex justify-center items-center"
          >
            <button
              class="hover:bg-gray-700 rounded-full p-2 aspect-square w-6 h-6 sm:w-8 sm:h-8 flex justify-center items-center"
              :class="{
                'text-gray-600 cursor-text hover:bg-transparent': day.month !== month.month,
                'bg-blue-500 text-white': activeDay(day)
              }"
              :disabled="day.month !== month.month"
              @click="selectDay(day)"
            >
              <span class="pt-0.5 text-sm">
                {{ day.day }}
              </span>
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalenderDates",
  props: {
    month: { type: Object, required: true },
    showPreviousButton: Boolean,
    showNextButton: Boolean,
    lang: { type: String, default: 'fa' }
  },
  computed: {
      currentDate() {
          return this.$store.getters['getCurrentDate']
      },
      currentMonth() {
          const month = this.currentDate.month
          if (month < 10) return `0${month}`
          else return month.toString()
      },
      weekDays() {
          const persian = this.$store.getters['getPersianWeekDays']
          const english = this.$store.getters['getEnglishWeekDays']
          return this.lang === 'fa' ? persian : english
      },
      selectedFirstDay() {
          return this.$store.getters['getSelectedFirstDay']
      },
      selectedSecondDay() {
          return this.$store.getters['getSelectedSecondDay']
      },
      selectedMonth() {
          return this.$store.getters['getSelectedMonth']
      },
      selectedYear() {
          return this.$store.getters['getSelectedYear']
      }
  },
  methods: {
    selectDay(day) {
        if (!this.selectedFirstDay) {
            this.$store.commit('setSelectedFirstDay', day)
        } else if (!this.selectedSecondDay) {
            this.$store.commit('setSelectedSecondDay', day)
        } else {
            this.$store.commit('setSelectedFirstDay', day)
            this.$store.commit('setSelectedSecondDay', null)
        }
    },
    previous() {
        if (this.selectedMonth > 1) {
            this.$store.commit('setSelectedMonth', this.selectedMonth - 1)
        } else {
            this.$store.commit('setSelectedMonth', 12)
            this.$store.commit('setSelectedYear', this.selectedYear - 1)
        }
    },
    next() {
        if (this.selectedMonth < 12) {
            this.$store.commit('setSelectedMonth', this.selectedMonth + 1)
        } else {
            this.$store.commit('setSelectedMonth', 1)
            this.$store.commit('setSelectedYear', this.selectedYear + 1)
        }
    },
    activeDay(day) {
        if (!this.selectedFirstDay) {
            return Number(day.day) === Number(this.currentDate.day) && this.currentMonth === day.month.split('-')[1] && this.currentDate.year === Number(day.month.split('-')[0])
        } else {
            return (
                (Number(day.day) === Number(this.selectedFirstDay.day) && this.selectedFirstDay.month.split('-')[1] === day.month.split('-')[1] && this.currentDate.year === Number(day.month.split('-')[0]))
                  ||
                (this.selectedSecondDay && Number(day.day) === Number(this.selectedSecondDay.day) && this.selectedSecondDay.month.split('-')[1] === day.month.split('-')[1] && this.currentDate.year === Number(day.month.split('-')[0]))
            )
        }
    }
  },
};
</script>
