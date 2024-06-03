<template>
  <div class="flex items-center gap-x-8 text-sm sm:text-base text-white">
      <div
        v-for="type in types[lang]"
        :key="type.value"
        class="flex items-center gap-x-2"
        dir="rtl"
      >
          <input
            v-model="currentType"
            type="radio"
            name="type"
            :id="type.value"
            :value="type.value"
            @input="setDateType(type.value)"
          >
          <label :for="type.value" class="cursor-pointer">{{ type.label }}</label>
      </div>
  </div>
</template>

<script>
export default {
    name: 'DateType',
    props: {
        lang: { type: String, default: 'fa' }
    },
    data() {
        return {
            types: {
                fa: [
                    {
                        label: 'فارسی',
                        value: 'fa'
                    },
                    {
                        label: 'انگلیسی',
                        value: 'en'
                    }
                ],
                en: [
                    {
                        label: 'Persian',
                        value: 'fa'
                    },
                    {
                        label: 'English',
                        value: 'en'
                    }
                ]
            },
            currentType: this.$store.getters['getDateType']
        }
    },
    methods: {
        setDateType(type) {
            this.$store.commit('setDateType', type)
            this.$store.commit('setSelectedFirstDay', null)
            this.$store.commit('setSelectedSecondDay', null)
        },
    },
}
</script>
