<template>
    <div class="w-full px-2 flex items-center gap-x-4">
        <span>{{ label }}:</span>

        <div class="flex items-center gap-x-2">
            <DropDown
                v-model="minute"
                :options="minutes"
                :class="{ 'order-3': lang === 'en' }"
                @onChange="minuteChange"
            />

            <span :class="{ 'order-2': lang === 'en' }">:</span>

            <DropDown
                v-model="hour"
                :options="hours"
                :class="{ 'order-1': lang === 'en' }"
                @onChange="hourChange"
            />
        </div>
    </div>
</template>

<script>
import DropDown from "@/components/DropDown.vue";

export default {
    name: 'SelectTime',
    components: { DropDown },
    props: {
        lang: { type: String, default: 'fa' }
    },
    data() {
        return {
            hour: null,
            minute: null

        }
    },
    computed: {
        currentDate() {
            return this.$store.getters['getCurrentDate']
        },
        minutes() {
            return this.$store.getters['getMinuteOptions']
        },
        hours() {
            return this.$store.getters['getHourOptions']
        },
        label() {
            return this.lang === 'fa' ? 'انتخاب زمان' : 'Select Time'
        },
    },
    mounted() {
        this.hour = new Date().getHours()
        this.minute = new Date().getMinutes()
    },
    methods: {
        minuteChange(minute) {
            this.$store.commit('setSelectedMinute', minute)
        },
        hourChange(hour) {
            this.$store.commit('setSelectedHour', hour)
        },
    }
}
</script>
