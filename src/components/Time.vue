<template>
    <div class="w-full px-2 flex items-center gap-x-4">
        <span>انتخاب ساعت:</span>

        <div class="flex items-center gap-x-2">
            <DropDown v-model="minute" :options="minutes" @onChange="minuteChange"/>

            <span>:</span>

            <DropDown v-model="hour" :options="hours" @onChange="hourChange"/>
        </div>
    </div>
</template>

<script>
import DropDown from "@/components/DropDown.vue";

export default {
    name: 'SelectTime',
    components: { DropDown },
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
