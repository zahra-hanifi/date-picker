export default {
    data() {
        return {
            viewportWidth: window.innerWidth
        }
    },
    mounted() {
        window.addEventListener('resize', this.updateViewportWidth);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateViewportWidth);
    },
    methods: {
        updateViewportWidth() {
            this.viewportWidth = window.innerWidth;
        }
    }
}
