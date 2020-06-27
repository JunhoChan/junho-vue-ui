<template>
  <div class="jc-player-toolbar">
    <!-- <div style="color: #fff">123</div> -->
    <img
      v-if="isPlaying"
      alt=""
      title="暂停"
      src="@/icons/pause-icon.svg"
      class="jc-play-icon jc-icon"
      @click="playOrPauseVideo"/>

    <img
      v-else
      alt=""
      title="播放"
      src="@/icons/play-icon.svg"
      class="jc-play-icon jc-icon" 
      @click="playOrPauseVideo"/>

    <div class="right-button__wrapper">

      <sound-progress
        @change-volume="changeVolume" />

      <img
        alt=""
        title="画中画"
        src="@/icons/picture-icon.svg"
        class="jc-play-icon jc-icon" 
        @click="showPicVideo"/>

      <img
        alt=""
        title="全屏"
        class="jc-play-icon jc-icon"
        src="@/icons/full-icon.svg"
        @click="clickFullScreen"/>
    </div>
  </div>
</template>

<script>
import SoundProgress from './soundProgress'
export default {
  name:'PlayerToolbar',
  
  components: {
    SoundProgress
  },

  computed: {
    isPlaying() {
      return this.$parent.isPlaying;
    }
  },
  
  methods: {
    changeVolume(val) {
      this.$emit('change-volume', val)
    },
    playOrPauseVideo() {
      this.$emit('toggle-play-status')
    },
    showPicVideo() {
      this.$emit('picture-video')
    },
    clickFullScreen() {
      this.$emit('full-video')
    }
  }
}
</script>