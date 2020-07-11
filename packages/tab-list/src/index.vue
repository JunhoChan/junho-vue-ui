<template>
  <div class="jc-tabList-wrap">
    <div
      class="jc-tab-box">
      <span class="jc-tab-icon" style="left: 0px">
        <el-button
          v-if="currentOffsetX !== 0"
          class="el-icon-arrow-left"
          type="text"
          title="上一页"
          @click="clickTabPage('prev')" />
      </span>
      <span class="jc-tab-icon" style="right: -10px">
        <el-button
          v-if="isAllowRightTurn"
          class="el-icon-arrow-right"
          type="text"
          title="下一页"
          @click="clickTabPage('next')" />
      </span>
        <div
          ref="tabList"
          class="jc-tab-box_inner"
          :style="`transform: translateX(${currentOffsetX}px)`">
            <el-button
              v-for="(tab, index) in tabData"
              :key="tab[tabProp['label']] + index"
              :class="[{'is-active': index === activeIndex}]"
              @click="clickCurrentTab(tab, index)"
              ref="tabButton"
              @mouseenter.native="handleMouseEnter(index)"
              @mouseleave.native="handleMouseLeave">
                {{tab[tabProp['label']]}}
                <em
                  v-if="(activeIndex === index || hoverIndex === index )&& index !== 0"
                  @mouseenter.stop="isHoverIcon = true"
                  @mouseleave.stop="isHoverIcon = false"
                  :class="isHoverIcon && hoverIndex === index ? `el-icon-error` : 'el-icon-close'"
                  @click.stop="handleRmoveTab(index)"/>
            </el-button>
        </div>
    </div>
    <more-operation
      @trigger-event="triggerEvent"/>
  </div>
</template>

<script>
import Utils from '@/utils'
import moreOperation from './moreOperation'
export default {
  name: 'jcTabList',

  components: {
    moreOperation
  },

  props: {
    tabProp: {
      type: Object,
      default() {
        return {
          id: 'id',
          label: 'label'
        }
      }
    },
    tabData: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      activeIndex: 0, // 默认激活第一个tab页
      isHoverIcon: false,
      hoverIndex: -1, // 鼠标在哪个下标
      currentOffsetX: 0,
      isAllowRightTurn: false,
      maxOffsetLeft: 0 // 允许向左最大偏移量
    }
  },

  mounted() {
    this.handleResize(true)
  },

  destroyed() {
    this.handleResize()
  },

  methods: {
    /**
     * 判断是否允许右转
     */
    judgeAllowRightTurn() {
      this.$nextTick(() => {
        const totalWidth = this.$refs['tabList'].scrollWidth
        const clientWidth = this.$refs['tabList'].offsetWidth
        const currentOffsetWidth = (clientWidth + Math.abs(this.currentOffsetX))
        this.isAllowRightTurn = currentOffsetWidth < totalWidth
          && totalWidth !== clientWidth
      });
    },
    clickTabPage(toggleStatus, distance = 100) {
      if (toggleStatus === 'next') {
        this.currentOffsetX -= distance;
        const currentWidth = this.$refs['tabList'].offsetWidth + Math.abs(this.currentOffsetX);
      } else {
        const x = Math.abs(this.currentOffsetX)
        this.currentOffsetX += x < distance ? x : distance;
      }
      this.judgeAllowRightTurn()
    },
    /**
     * @description 鼠标移入
     * @param {Number} index
     */
    handleMouseEnter(index) {
      this.hoverIndex = index
    },
    /**
     * @description 鼠标移开
     * @param {Number} index
     */
    handleMouseLeave() {
      this.hoverIndex = -1
    },
    /**
     * 添加tab信息
     */
    openTab(tab) {
      this.activeIndex = this.tabData.length
      // 判断当前tab是否已经注册
      const isRegister = this.tabData.some((item, index) => {
        if (item[this.tabProp['id']] === tab[this.tabProp['id']]) {
          this.activeIndex = index;
          this.$emit('click-tab', tab, index)
          this.getCurrentElementAndOffset()
          return true;
        }
      })
      if (isRegister) return;
      this.tabData.push(tab)
      this.judgeAllowRightTurn()
      this.clickTabPage('next', this.maxOffsetLeft)
      this.$emit('click-tab', tab, this.tabData.length -1)
      this.getCurrentElementAndOffset()
    },
    /**
     * 获取当前激活元素的位置，并进行偏移
     */
    getCurrentElementAndOffset() {
      this.$nextTick(() => {
        const tabButtons = this.$refs['tabButton'];
        let currentWidth = 0;
        for(let i = 0; i <= this.activeIndex; i++) {
          currentWidth += tabButtons[i].$el.offsetWidth + 10;
        }
        const diffWidth = this.$refs['tabList'].clientWidth - currentWidth
        this.currentOffsetX = diffWidth >= 0 ? 0 : (diffWidth - 50)
      })
    },
    /**
     * @description 激活tab页
     * @param {number} index
     */
    clickCurrentTab(tab, index) {
       this.activeIndex = index
       this.$emit('click-tab', tab, index)
       this.getCurrentElementAndOffset()
       this.judgeAllowRightTurn()
    },
    /**
     * 移除tab
     */
    handleRmoveTab(index) {
      if (this.activeIndex >= index && this.activeIndex > 0) {
        this.activeIndex -= 1
        this.$emit('click-tab', this.tabData[this.activeIndex], this.activeIndex)
      }
      this.tabData.splice(index, 1)
    },
    /**
     * @description 点击触发事件
     * @param {String} eventName
     */
    triggerEvent(eventName) {
      let tabData;
      switch(eventName) {
        case 'other':
          tabData = this.tabData.filter((item, index) => index === this.activeIndex || index === 0)
          this.activeIndex = !this.activeIndex ? 0 : 1;
          break
        case 'right':
          tabData = this.tabData.filter((item, index) => index === 0 || this.activeIndex >= index)
          this.activeIndex = !this.activeIndex ? 0 : this.activeIndex;
          break
        case 'left':
          tabData = [];
          this.tabData.forEach((item, index) => {
            if (index === 0 || index >= this.activeIndex) {
              tabData.push(item)
            }
          })
          this.activeIndex = !!this.activeIndex ? 1 : 0
          break
        case 'all':
          tabData = this.tabData.filter((item, index) => index === 0)
          this.activeIndex = 0;
          break
        default: 
          break;
      }
      this.$emit('trigger-event', eventName, tabData)
    },
    // 处理页面尺寸变化
    handleResize(isRegister) {
      const handleEvnet = Utils.debounce((event) => {
        this.judgeAllowRightTurn()
      }, 1000);
      isRegister ? window.addEventListener('resize', handleEvnet, false) : window.removeEventListener('resize', handleEvnet, false)
    }
  }
}
</script>

<style scoped>
.jc-tabList-wrap {
  display: flex;
  height: 55px;
  line-height: 55px;
  background-color: #fff;
  user-select: none;
}

.jc-tabList-wrap > .jc-tab-box {
  height: 100%;
  width: calc(100% - 120px);
  position: relative;
  margin-right: 30px;
  overflow: hidden;
}

.jc-tab-box_inner  {
  display: flex;
  height: 100%;
  margin: 10px 30px;
  height: 36px;
  transition: .3s transform ease-in;
}

.jc-tab-box > .jc-tab-icon {
  z-index: 100;
  width: 30px;
  height: 55px;
  position: absolute;
  top: 0px;
  color: #666;
  background-color: #fff;
}

.jc-tab-box_inner > .is-active {
  background-color: #1890FF;
  color: #fff;
} 
</style>