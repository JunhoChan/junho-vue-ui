<template>
  <div>
    <img
      v-if="!isMute"
      alt=""
      title="关闭声音"
      src="@/icons/voice-icon.svg"
      class="jc-play-icon jc-icon" @click="toggleMuteVoice"/>
    <img
      v-else
      alt=""
      title="开启声音"
      src="@/icons/mute-icon.svg"
      class="jc-play-icon jc-icon" @click="toggleMuteVoice"/>
    <div
      ref="slider"
      class="jc-sound-progress"
      @click="onDragging">
      <div
        :style="progressStyle"
        class="jc-sound-bg">
      </div>
      <button
        @mousedown="mousedown"
        :style="btnStyle"
        class="jc-sound-btn">
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name:'JcSoundProgress',

  data() {
    return {
      hovering: false,
      dragging: false,
      startX: 0,
      volume: '50%',
      slideWidth: 0,
      isMute: false
    }
  },
   
  computed: {
    btnStyle() {
      return {
        left: this.volume
      }
    },
    progressStyle() {
      return {
        width: this.volume
      }
    }
  },

  mounted() {
    this.initPosition()
  },

  methods: {
    initPosition() {
      this.$nextTick(() => {
        const element = this.$refs.slider;
        if (!element) throw Error(`System can't get current voice element, init error!`);
        this.startX = element.getBoundingClientRect().left;
        this.slideWidth = element.getBoundingClientRect().width;
      })
    },
    getCurrentXPosition(event) {
      return event.type === 'touchmove'
        ? event.touches[0].clientX
        : event.clientX
    },
    // 鼠标点击
    mousedown() {
      if (this.isMute) return;
      window.addEventListener('mousemove', this.onDragging);
      window.addEventListener('touchmove', this.onDragging);
      window.addEventListener('mouseup', this.onDragEnd);
      window.addEventListener('touchend', this.onDragEnd);
      window.addEventListener('contextmenu', this.onDragEnd);
    },
    onDragging(event) {
      if (this.isMute) return;
      const currentX = this.getCurrentXPosition(event)
      const diff = (currentX - this.startX) / this.slideWidth;
      this.volume = (diff > 1 ? 1 : diff < 0 ? 0 : diff) * 100 + '%';
      this.$emit('change-volume', this.volume)
    },
    onDragEnd() {
      window.removeEventListener('mousemove', this.onDragging);
      window.removeEventListener('touchmove', this.onDragging);
      window.removeEventListener('mouseup', this.onDragEnd);
      window.removeEventListener('touchend', this.onDragEnd);
      window.removeEventListener('contextmenu', this.onDragEnd);
    },
    toggleMuteVoice() {
      this.isMute = !this.isMute;
      this.$emit('change-volume', this.isMute ? 0 : this.volume)
    }
  }
}
</script>