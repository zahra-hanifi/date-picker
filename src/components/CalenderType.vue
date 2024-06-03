<template>
  <div class="bg-gray-700 rounded p-2 flex items-center gap-x-4">
      <button
        v-for="type in types[lang]"
        :key="type.value"
        class="text-base py-2 px-4 rounded text-gray-300 hover:bg-gray-600"
        :class="{'bg-blue-500 !text-white hover:bg-blue-500': type.value === model}"
        @click="setType(type)"
      >
          {{ type.label }}
      </button>
  </div>
</template>

<script>
import vModel from '@/mixins/vModel'

export default {
    name: 'CalenderType',
    mixins: [vModel],
    props: {
        lang: { type: String, default: 'fa' }
    },
    data() {
        return {
            types: this.$store.getters['getCalenderTypes']
        }
    },
    methods: {
        setType(type) {
            this.model = type.value
        }
    }
}
</script>
