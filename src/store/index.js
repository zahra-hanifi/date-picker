import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    englishMonth: [
      {
        label: 'January',
        value: 1
      },
      {
        label: 'February',
        value: 2
      },
      {
        label: 'March',
        value: 3
      },
      {
        label: 'April',
        value: 4
      },
      {
        label: 'May',
        value: 5
      },
      {
        label: 'June',
        value: 6
      },
      {
        label: 'July',
        value: 7
      },
      {
        label: 'August',
        value: 8
      },
      {
        label: 'September',
        value: 9
      },
      {
        label: 'October',
        value: 10
      },
      {
        label: 'November',
        value: 11
      },
      {
        label: 'December',
        value: 12
      },
    ],
    persianMonths: [
      {
        label: 'فرودین',
        value: 1
      },
      {
        label: 'اردیبهشت',
        value: 2
      },
      {
        label: 'خرداد',
        value: 3
      },
      {
        label: 'تیر',
        value: 4
      },
      {
        label: 'مرداد',
        value: 5
      },
      {
        label: 'شهریور',
        value: 6
      },
      {
        label: 'مهر',
        value: 7
      },
      {
        label: 'آبان',
        value: 8
      },
      {
        label: 'آذر',
        value: 9
      },
      {
        label: 'دی',
        value: 10
      },
      {
        label: 'بهمن',
        value: 11
      },
      {
        label: 'اسفند',
        value: 12
      },
    ],
    currentDate: null,
    calenderTypes: {
      fa: [
        {
          label: 'روز',
          value: 'dates',
        },
        {
          label: 'ماه',
          value: 'month',
        },
        {
          label: 'سال',
          value: 'year',
        },
      ],
      en: [
        {
          label: 'Dates',
          value: 'dates',
        },
        {
          label: 'Month',
          value: 'month',
        },
        {
          label: 'Year',
          value: 'year',
        },
      ]
    },
    persianYears: [],
    englishYears: [],
    dateType: 'fa',
    persianWeekDays: [
      'ش',
      'ی',
      'د',
      'س',
      'چ',
      'پ',
      'ج',
    ],
    englishWeekDays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    selectedFirstDay: null,
    selectedSecondDay: null,
    selectedMonth: null,
    selectedYear: null,
    minuteOptions: [],
    hourOptions: [],
    selectedMinute: null,
    selectedHour: null,
  },
  getters: {
    getEnglishMonths: (state) => state.englishMonth,
    getPersianMonths: (state) => state.persianMonths,
    getCurrentDate: (state) => state.currentDate,
    getCalenderTypes: (state) => state.calenderTypes,
    getPersianYears: (state) => state.persianYears,
    getEnglishYears: (state) => state.englishYears,
    getDateType: (state) => state.dateType,
    getPersianWeekDays: (state) => state.persianWeekDays,
    getEnglishWeekDays: (state) => state.englishWeekDays,
    getSelectedFirstDay: (state) => state.selectedFirstDay,
    getSelectedSecondDay: (state) => state.selectedSecondDay,
    getSelectedMonth: (state) => state.selectedMonth,
    getSelectedYear: (state) => state.selectedYear,
    getMinuteOptions: (state) => state.minuteOptions,
    getHourOptions: (state) => state.hourOptions,
    getSelectedMinute: (state) => state.selectedMinute,
    getSelectedHour: (state) => state.selectedHour,
  },
  mutations: {
    setCurrentDate(state, payload) {
      state.currentDate = payload
    },
    setPersianYears(state, payload) {
      state.persianYears = payload
    },
    setEnglishYears(state, payload) {
      state.englishYears = payload
    },
    setDateType(state, payload) {
      state.dateType = payload
    },
    setSelectedFirstDay(state, payload) {
      state.selectedFirstDay = payload
    },
    setSelectedSecondDay(state, payload) {
      state.selectedSecondDay = payload
    },
    setSelectedMonth(state, payload) {
      state.selectedMonth = payload
    },
    setSelectedYear(state, payload) {
      state.selectedYear = payload
    },
    setMinuteOptions(state, payload) {
      state.minuteOptions = payload
    },
    setHourOptions(state, payload) {
      state.hourOptions = payload
    },
    setSelectedMinute(state, payload) {
      state.selectedMinute = payload
    },
    setSelectedHour(state, payload) {
      state.selectedHour = payload
    },
  },
  actions: {
    calculatePersianYears({ commit }, currentYear) {
      let years = []
      for (let i = currentYear; i >= 1300; i--) {
        years.push(i)
      }
      commit('setPersianYears', years)
    },
    calculateEnglishYears({ commit }, currentYear) {
      let years = []
      for (let i = currentYear; i >= 1979; i--) {
        years.push(i)
      }
      commit('setEnglishYears', years)
    },
    calculateMinuteOptions({ commit }) {
      let options = []
      for (let i = 0; i <= 59; i++) {
        options.push(i)
      }

      commit('setMinuteOptions', options)
    },
    calculateHourOptions({ commit }) {
      let options = []
      for (let i = 0; i <= 23; i++) {
        options.push(i)
      }

      commit('setHourOptions', options)
    },
  },
})
