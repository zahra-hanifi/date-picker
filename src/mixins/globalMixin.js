export default {
    data() {
        return  {
            viewportWidth: window.innerWidth
        }
    },
    mounted() {
        document.addEventListener('resize', () => {
            this.viewportWidth =  window.innerWidth
        })
    }
}