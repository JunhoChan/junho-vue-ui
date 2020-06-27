<template>
    <div class="jc-waterfall-wrap" ref="waterfall" />
</template>


<script>
import './index.css'
export default {
  name: 'JcWaterfall',
  
  props: {
    width: { // 默认宽度
      type: Number,
      default: () => 200
    },
    imgDatas: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    imgStyle() {
      return {
        width: this.width + 'px'
      };
    }
  },

  data() {
    return {
      colHeights: [], // 宽度
      imageList: [] // 存储图片列表的位置信息
    }
  },
  
  mounted() {
    this.initWaterfallLatouy()
  },

  methods: {
    // 初始化瀑布流每列存放多少图片
    initWaterfallLatouy() {
      // 等宽时才需要计算内容宽度
      if (!this.verticle) {
        const width = this.$refs['waterfall'].getBoundingClientRect().width;
        const columnNum = Math.floor(width / this.width);
        for (let i = 0; i < columnNum; i++) {
          this.colHeights.push(0);
        }
      }
      this.loadImage();
    },
    /**
     * @description 加载图片
     */
    loadImage() {
      this.imgDatas.forEach((item, index) => {
        const img = new Image();
        const wrapperImg = document.createElement('div')
        wrapperImg.style.width = this.width + 'px';
        wrapperImg.className = "jc-waterfall-cover"
        img.src = require(`@/assets/load${index + 1}.jpg`);
        img.className = 'cover-image'
        img.onload = () => {
          wrapperImg.appendChild(img)
          this.$refs['waterfall'].appendChild(wrapperImg)
          this.setImageStyle(img)
        }
      })
    },
    /**
     * @description 设置图片央视
     * @param {Element} element
     */
    setImageStyle(element) {
      try {
        const minHeight = Math.min.apply(null, this.colHeights)
        const minIndex = this.colHeights.indexOf(minHeight)
        const imgStyles = element.style;
        imgStyles.width = this.width + 'px';
        imgStyles.left = minIndex * this.width + 'px';
        imgStyles.top = minHeight + 'px';
        this.$set(this.colHeights, minIndex, minHeight + element.height) // 更新当前位置下标
        } catch(e) {
          console.log(e)
        }
    }
  }
}
</script>