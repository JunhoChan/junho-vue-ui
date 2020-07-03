<template>
  <el-popover
    popper-class="jc-more-popover"
    placement="bottom"
    trigger="hover">
    <div class="jc-moreOp-button-wrap">
      <button size="mini" type="text" class="el-icon-refresh button-text" @click="clickEvent('refresh')"> 刷新</button>
      <button size="mini" type="text" class="el-icon-error button-text" @click="clickEvent('other')"> 关闭其他</button>
      <button size="mini" type="text" class="button-text el-icon-remove-outline" @click="clickEvent('right')"> 关闭右侧</button>
      <button size="mini" type="text" class="button-text el-icon-remove" @click="clickEvent('left')"> 关闭左侧</button>
      <button size="mini" type="text" class="el-icon-s-release button-text" @click="clickEvent('all')"> 关闭全部</button>
    </div>
    <el-button
      type="text"
      slot="reference"
      class="jc-moreOperation-button">
      更多操作 <em class="el-icon-arrow-down"/>
    </el-button>
  </el-popover>
</template>

<script>
export default {
  name: 'moreOpeation',
  
  methods: {
    clickEvent(eventName) {
      this.$emit('trigger-event', eventName)
    }
  }
}
</script>
<style>
.jc-more-popover {
  min-width: 80px !important;
}
</style>
<style scoped>
.jc-moreOperation-button {
  float: right;
  height: 14px;
  margin-top: 20px;
  line-height: 0;
  color: #606266;
  padding: 0;
}
.jc-moreOp-button-wrap {
  display: flex;
  flex-direction: column;
}
.button-text {
  color: #606266;
  text-align: left;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  line-height: 20px;
}
.button-text:hover {
  background-color: #E8F4FF;
  color: #1890FF;
  cursor: pointer;
}
</style>