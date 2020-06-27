<script>
import Utils from '@/utils'
export default {
  name: 'JcInfiniteScroll',
  
  props: {
    height: {// 可视化高度
      type: Number,
      require: true
    },
    scrollDisabled: {
      type: Boolean,
      default: false
    },
    scrollDistance: {
      type: Number,
      default: 0
    },
    delay: { // 节流延时
      type: Number,
      default: 0
    }
  },

  mounted() {
    this.initSCroll()
  },

  destroyed() {
    const element = this.$refs.jcInfiniteScroll
    element && element.removeEventListener('scroll', Utils.debounce(this.scrollEvent, 1000))
  },

  methods: {
    initSCroll() {
      const element = this.$refs.jcInfiniteScroll
      element.addEventListener('scroll', Utils.debounce(this.scrollEvent, 1000))
    },
    /**
     * @description 滚动事件
     */
    scrollEvent() {
      const element = this.$refs.jcInfiniteScroll;
      // 禁止下拉刷新
      if (this.scrollDisabled) element.removeEventListener('scroll', Utils.debounce(this.scrollEvent, 1000));

      if (element.scrollHeight - element.clientHeight <= element.scrollTop + this.scrollDistance) {
        Utils.throttle(() => {
          this.$emit('scroll-bottom')
        }, this.delay)()
      }
    }
  },

  render(createElement) {
    const {
      height
    } = this

    return createElement('div',
      {
        attrs: {
          class: 'jc-infinite-scroll',
          style: `height: ${height}px`
        },
        ref: 'jcInfiniteScroll'
      },
      this.$slots.default
    )
  }
  
}
</script>

<style scoped>
.jc-infinite-scroll {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>