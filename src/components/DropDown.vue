<template>
  <div ref="dropdown" class="relative">
      <button
        class="rounded-lg py-1 px-4 bg-gray-700 min-w-[40px] hover:bg-gray-600"
        @click="toggleDropdown"
      >
          {{ model < 10 ? `0${model}` : model }}
      </button>

      <div
        v-if="dropdownOpen"
        class="scroller z-10 flex flex-col absolute bottom-[30px] left-0 rounded bg-gray-800 border border-solid border-gray-700 shadow-lg w-[110px] sm:w-[120px] h-[150px] overflow-auto"
      >
          <div
            v-for="option in options"
            :key="option"
            class="text-sm text-gray-300 p-3 tw-cursor-pointer"
            @click="selectOption(option)"
          >
              {{ option }}
          </div>
      </div>
  </div>
</template>

<script>
import vModel from '@/mixins/vModel'

export default {
    name: 'DropDown',
    mixins: [vModel],
    props: {
        options: { type: Array, required: true },
    },
    data() {
        return {
            dropdownOpen: false
        }
    },
    watch: {
        model(newValue) {
            this.$emit('onChange', newValue)
        },
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside)
    },
    methods: {
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen
        },
        selectOption(option) {
            this.model = option
            this.toggleDropdown()
        },
        handleClickOutside(event) {
            if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
                this.dropdownOpen = false
            }
        },
    },
}
</script>
