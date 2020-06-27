<template>
  <div
    class="jc-player-wrap" 
    @mouseenter.prevent="showToolbar = true"
    @mouseleave.prevent="showToolbar = false">
     <div class="on-mask" v-show="!isPlaying && !videoLoading" @click="playOrPauseVideo"></div>
     <div class="jc-loading-cover" v-if="videoLoading">
       <img class="cover-image" alt="加载图片" src="@/icons/tv-icon.svg" />
       <div class="loading-text">加载资源中...</div>
     </div>

     <video
       ref="jcVideo"
       class="jc-player-video"
       x5-video-player-type="h5"
       x5-playsinline
       src="https://cdn.jsdelivr.net/gh/chuzhixin/videos@master/video.mp4"
       @click="playOrPauseVideo" />

      <player-toolbar
        :class="{'is-hover': !videoLoading && showToolbar}"
        @picture-video="pictureVideo"
        @full-video="fullScreen"
        @change-volume="changeVolume"
        @toggle-play-status="playOrPauseVideo" />
  </div>
</template>

<script>
import playerToolbar from './playerToolbar'
import './index.css'
export default {
  name: 'JcPorttableVideo',
  
  components: {
    playerToolbar
  },

  data() {
    return {
      showToolbar: false,
      isPlaying: false,
      videoElement: null,
      videoLoading: true
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.videoElement = this.$refs['jcVideo']
      if (!this.videoElement) throw Error(`init element error, can't get current video element`)
      this.init()
    });
  },

  destroyed() {
    this.videoLoadingDone();
  },

  methods: {
    init() {
      this.videoElement.addEventListener('canplay', this.videoLoadingDone, true)
    },
    videoLoadingDone() {
      window.setTimeout(() => {
        const minutes = parseInt(this.videoElement.duration / 60, 10);
        const seconds = this.videoElement.duration % 60;
        console.log(minutes, seconds)
        this.videoLoading = false;
        this.videoElement.removeEventListener('canplay', this.videoLoadingDone, true)
      }, 2000)
    },
    changeVolume(val) {
      this.videoElement.volume = (Number.parseInt(val) /100).toFixed(2)
    },
    // 鼠标进入 若播放则可以显示工具栏
    handleMouseenter() {
      if (this.isPlaying) this.showToolbar = true;
    },
    // 播放视频
    playOrPauseVideo() {
      !this.isPlaying ? this.videoElement.play() : this.videoElement.pause();
      this.isPlaying = !this.isPlaying;
      // this.showToolbar = this.isPlaying;
    },
    pictureVideo() {
      this.videoElement.requestPictureInPicture()
      // 退出画中画
      // this.$refs.jcVideo.exitPictureInPicture();
    },
    // 全屏
    fullScreen() {
      const video = this.videoElement;
      if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
          video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.webkitSupportsFullscreen) {
          video.webkitEnterFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        } else {
          video.className = 'jc-player-video is-fullScreen'
        }
    }
  }
}
</script>
