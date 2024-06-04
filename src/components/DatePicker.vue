<template>
  <div class="flex flex-col gap-y-4 w-full" :dir="direction">
      <div v-if="selectedFirstDay" class="text-gray-300 text-sm flex items-center gap-x-1 mx-auto">
          <span>{{ selectedLabel }}:</span>

          <div class="flex items-center gap-x-1 text-white">
              {{ selectedFirstDay.date }}

              <template v-if="selectedSecondDay">
                  <span class="text-xs">
                      {{ dateType === 'fa' ? 'تا' : 'until' }}
                  </span>

                  {{ selectedSecondDay.date }}
              </template>
          </div>
      </div>

    <div
      class="mx-auto w-full sm:w-fit flex flex-col gap-y-10 items-center text-white bg-gray-800 shadow px-2 py-4 sm:py-6 sm:px-4 rounded-lg min-h-[300px] sm:min-w-[551px]"
      :class="{ 'max-h-[300px]': currentCalenderType === 'year' }"
    >
      <div class="flex flex-col sm:flex-row gap-4 items-center justify-between w-full">
          <CalenderType v-model="currentCalenderType" :lang="dateType" />

          <DateType
            :lang="dateType"
          />
      </div>

      <div class="flex gap-24 overflow-auto scroller">
        <template v-if="currentCalenderType === 'dates'">
            <Dates
              v-if="currentMonth"
              :month="currentMonth"
              :show-previous-button="true"
              :show-next-button="mobileView"
              :lang="dateType"
              @goToPreviousMonth="goToPreviousMonth"
            />

            <Dates
              v-if="nextMonth"
              :month="nextMonth"
              :show-next-button="true"
              :lang="dateType"
              class="hidden md:flex"
              @goToNextMonth="goToNextMonth"
            />
        </template>

        <Months v-else-if="currentCalenderType === 'month'" />

        <Years v-else />
      </div>

      <Time :lang="dateType" />
    </div>
  </div>
</template>

<script>
import {JalaliDateTime} from "jalali-date-time"
import Dates from "@/components/Dates.vue"
import CalenderType from "@/components/CalenderType.vue"
import Months from "@/components/Months.vue"
import Years from "@/components/Years.vue"
import DateType from "@/components/DateType.vue"
import Time from "@/components/Time.vue"

export default {
  name: "DatePicker",
  components: { Dates, CalenderType, Months, Years,DateType, Time },
  data() {
    return {
      change: 0,
      currentMonth: null,
      nextMonth: null,
      currentCalenderType: 'dates',
    };
  },
  computed: {
      dateType() {
          return this.$store.getters['getDateType']
      },
      direction() {
          return this.dateType === 'fa' ? 'rtl' : 'ltr'
      },
      selectedLabel() {
          return this.dateType === 'fa' ? 'تاریخ(های) انتخابی' : 'Selected Date(s)'
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
      },
      mobileView() {
          return this.viewportWidth < 768
      }
  },
  watch: {
      dateType() {
          this.resetMonthAndYear()
          this.initiateCalender()
      },
      selectedMonth() {
          this.initiateCalender()
      },
      selectedYear() {
          this.initiateCalender()
      },
  },
  mounted() {
      this.initiateCalender()

      this.$store.dispatch('calculateMinuteOptions')
      this.$store.dispatch('calculateHourOptions')
  },
  methods: {
      initiateCalender() {
          if (this.dateType === 'fa') {
            const jalali = JalaliDateTime();
            const today = jalali.toObject(new Date());
            this.$store.commit('setCurrentDate', today)

            this.currentMonth = jalali.calendar(
                `${this.selectedYear || today.year}-${(this.selectedMonth || today.month) < 10 ? "0" : ""}${
                    this.selectedMonth || today.month
                  }`
            );

            this.nextMonth =
                (this.selectedMonth ? (this.selectedMonth + 1) : (today.month + 1)) <= 12 ?
                  jalali.calendar(
                      `${this.selectedYear || today.year}-${(this.selectedMonth ? (this.selectedMonth + 1) : (today.month + 1)) < 10 ? "0" : ""}${
                          (this.selectedMonth ? (this.selectedMonth + 1) : (today.month + 1))
                      }`
                  )
                : jalali.calendar(
                      `${this.selectedYear ? (this.selectedYear + 1) : (today.year + 1)}-01`
                )
            this.$store.commit('setSelectedMonth', this.selectedMonth || today.month)
            this.$store.commit('setSelectedYear', this.selectedYear || today.year)
          } else {
              const now = new Date()
              this.$store.commit('setCurrentDate', {
                  day: now.getDate(),
                  hour: now.getHours(),
                  minute: now.getMinutes(),
                  month: now.getMonth() + 1,
                  second: now.getSeconds(),
                  week: now.getDay() === 0 ? 7 : now.getDay(),
                  year: now.getFullYear(),
              })
              this.$store.commit('setSelectedMonth', this.selectedMonth || now.getMonth() + 1)
              this.$store.commit('setSelectedYear', this.selectedYear || now.getFullYear())

              this.currentMonth = this.getEnglishCalendar()
              this.nextMonth = this.getEnglishCalendar(true)
          }
      },
      goToPreviousMonth() {},
      goToNextMonth() {},
      getEnglishCalendar(nextMonth = false) {
          const now = new Date()
          const monthNames = this.$store.getters['getEnglishMonths']

          let year = this.selectedYear || now.getFullYear()
          let month = this.selectedMonth ? (this.selectedMonth - 1) : now.getMonth()

          if (nextMonth) {
              month++
              if (month > 11) {
                  month = 0
                  year++
              }
          }

          const monthTitle = `${monthNames[month].label} ${year}`
          const monthIdentifier = `${year}-${String(month + 1).padStart(2, '0')}`
          const daysInMonth = new Date(year, month + 1, 0).getDate()
          const firstDayOfMonth = new Date(year, month, 1).getDay()

          const weeks = []
          let week = []

          if (firstDayOfMonth !== 0) {
              const prevMonthDays = new Date(year, month, 0).getDate()
              const prevMonth = month === 0 ? 11 : month - 1
              const prevYear = month === 0 ? year - 1 : year
              for (let i = firstDayOfMonth; i > 0; i--) {
                  const prevDay = prevMonthDays - i + 1
                  const date = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(prevDay).padStart(2, '0')}`
                  week.push({
                      date: date,
                      day: String(prevDay).padStart(2, '0'),
                      month: `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}`
                  })
              }
          }

          for (let day = 1; day <= daysInMonth; day++) {
              const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
              week.push({
                  date: date,
                  day: String(day).padStart(2, '0'),
                  month: monthIdentifier
              })

              if (week.length === 7) {
                  weeks.push(week)
                  week = []
              }
          }

          if (week.length > 0) {
              let nextMonthDay = 1
              const nextMonth = month + 1 > 11 ? 0 : month + 1
              const nextYear = month + 1 > 11 ? year + 1 : year
              while (week.length < 7) {
                  const date = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(nextMonthDay).padStart(2, '0')}`
                  week.push({
                      date: date,
                      day: String(nextMonthDay).padStart(2, '0'),
                      month: `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}`
                  })
                  nextMonthDay++
              }
              weeks.push(week)
          }

          return {
              title: monthTitle,
              month: monthIdentifier,
              weeks: weeks
          }
      },
      resetMonthAndYear() {
          this.$store.commit('setSelectedMonth', null)
          this.$store.commit('setSelectedYear', null)
      }
  },
};
</script>
