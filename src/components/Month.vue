<template>
  <div class="flex flex-col gap-y-6">
    <span class="text-center">{{ month.title }}</span>

    <div class="flex flex-col gap-y-3">
      <div class="flex items-center gap-x-4">
        <span
          v-for="weekDay in persianWeekDays"
          :key="weekDay"
          class="w-[62px] text-center"
        >
          {{ weekDay }}
        </span>
      </div>

      <template v-for="(week, index) in month.weeks">
        <div class="flex items-center gap-x-4" :key="index">
          <div
            v-for="(day, index2) in week"
            :key="index2"
            class="w-[62px] flex justify-center items-center"
            :class="{ 'text-gray-600': day.month !== month.month }"
          >
            <button
              class="hover:bg-gray-700 rounded-full p-2 aspect-square w-10 h-10 flex justify-center items-center"
              @click="selectDay(day)"
            >
              <span class="pt-[2px]">
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
  name: "CalenderMonth",
  props: {
    month: { type: Object, required: true },
  },
  data() {
    return {
      persianWeekDays: [
        "شنبه",
        "یک‌شنبه",
        "دوشنبه",
        "سه‌شنبه",
        "چهارشنبه",
        "پنج‌شنبه",
        "جمعه",
      ],
    };
  },
  methods: {
    selectDay(day) {
      console.log(day);
    },
  },
};
</script>
