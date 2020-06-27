<template>
<el-menu
  :class="[{'jc-vervicle-menu': mode === 'vertical'}, 'jc-menu-wrap']" 
  :mode="mode"
  text-color="#ffffff"
  :collapse=" mode === 'vertical' ? collapse : false"
  :background-color="backgroundColor"
  menu-trigger="click"
  >
  <template v-for="(subData, index) in navData">
    <jc-sub-menu
      class="jc-menu-theme"
      v-if="subData['children'] && subData['children'].length > 0"
      :key="subData.label + index"
      :sub-data="subData"
      :nav-prop="navProp"
    />
    <el-menu-item
      v-else
      :key="subData.label + index"
      class="jc-menu-theme">
      <i class="el-icon-location"></i>  
      <span slot="title">{{subData[navProp['label']]}}</span>
    </el-menu-item>
  </template>
</el-menu>
</template>

<script>
import JcSubMenu from './subMenu.vue'
export default {
 
 name: 'jcNavMenu',
 
 components: {
   JcSubMenu
 },

 props:  {
   navData: {
     type: Array,
     default: () => []
   },
   navProp: {
     type: Object,
     default() {
       return {
        children: 'children',
        label: 'label',
        path: 'path'
      };
     } 
   },
   mode: {
     type: String,
     default: 'vertical' // horizontal / vertical
   },
   collapse: Boolean,
   backgroundColor: {
     type: String,
     default: '#000C17'
   },
   textColor: {
     type: String,
     default: '#F2F3F4'
   }
  }
}
</script>

<style>
.jc-vervicle-menu:not(.el-menu--collapse) {
  width: 220px;
  height: 100%;
  overflow: hidden;
  user-select: none;
}
.jc-menu-theme .el-menu-item .is-active {
  background-color: red !important;
}
.jc-menu-theme {
background-color: #001529 !important;
}
.jc-menu-theme, .jc-menu-theme > [class*=menu] {
  background-color: #001529 !important;
}

.jc-menu-wrap .is-active{
  background-color: #2D8CF0 !important;
  color: #fff !important;
}
.jc-menu-wrap .el-menu-item, .jc-menu-wrap .el-submenu__title {
  height: 50px !important;
  line-height: 50px !important;
}
.jc-menu-wrap  .el-menu-item:hover, .jc-menu-wrap .el-submenu__title:hover {
  background-color: #2D8CF0 !important;
  color: #fff !important;
}
.jc-menu-wrap .el-menu-item i, .jc-menu-wrap .el-submenu__title i {
  color: #ffffff !important;
}
.el-menu--horizontal .is-active .el-submenu__title {
  border-bottom: 3px solid #1890FF !important;
  color: #fff !important;
}
.el-menu--horizontal .el-menu .el-menu-item.is-active, .el-menu--horizontal .el-menu .el-submenu.is-active>.el-submenu__title {
 color: #fff !important; 
 background-color: #2D8CF0 !important;
}
.el-submenu__title i {
  color: #fff !important;
}
</style>