<template>
  <div class="flex justify-center items-center text-white">
    <div class="bg-gray-800 shadow py-6 px-8 rounded-lg flex gap-24">
      <Month v-if="currentMonth" :month="currentMonth" />

      <Month v-if="nextMonth" :month="nextMonth" />
    </div>
  </div>
</template>

<script>
import { JalaliDateTime } from "jalali-date-time";
import Month from "@/components/Month.vue";

export default {
  name: "DatePicker",
  components: { Month },
  data() {
    return {
      change: 0,
      currentMonth: null,
      nextMonth: null,
    };
  },
  mounted() {
    const jalali = JalaliDateTime();
    const today = jalali.toObject(new Date());

    this.currentMonth = jalali.calendar(
      `${today.year}-${today.month + this.change < 10 ? "0" : ""}${
        today.month + this.change
      }`
    );

    this.nextMonth = jalali.calendar(
      `${today.year}-${today.month + 1 + this.change < 10 ? "0" : ""}${
        today.month + 1 + this.change
      }`
    );
  },
  methods: {},
};
</script>
