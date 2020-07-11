<template>
<el-menu
  :class="[{'jc-vervicle-menu': mode === 'vertical'}, 'jc-menu-wrap']" 
  :mode="mode"
  :text-color="fontColor"
  :collapse=" mode === 'vertical' ? collapse : false"
  :background-color="subBackgroundColor"
  >
    <jc-sub-menu
      className="jc-first-subMenu"
      :nav-data="navData"
      :nav-prop="navProp"
      @click-menu="hancleMenuItemClick"
    />
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
   //Define configuration values ​​for navigation
   navProp: {
     type: Object,
     default() {
       return {
        children: 'children',
        label: 'label',
        icon: 'icon',
        path: 'path'
      };
     } 
   },
   mode: {
     type: String,
     default: 'vertical' // horizontal / vertical
   },
   collapse: Boolean,
   navBackgroundColor: {
     type: String,
     default: '#001529'
   },
   subBackgroundColor: {
     type: String,
     default: '#000C17'
   },
   fontColor: {
     type: String,
     default: '#fff'
   },
   activeBackgroundColor: {
     type: String,
     default: '#2D8CF0'
   }
  },

  mounted() {
    this.initNavStyle()
  },

  methods: {
    /**
     * @description click nav menu
     * @param {Object} routeData
     */
    hancleMenuItemClick(routeData) {
      this.$emit('click-menu', routeData)
    },
    /**
     * @description init nav style
     */
    initNavStyle() {
      const styleTag = document.createElement('style');
      styleTag.setAttribute('id', 'customNavStyle');
      styleTag.setAttribute("type", "text/css");   
      // 如果style样式存在就移除重新生成
      const heads = document.getElementsByTagName('head');
      const styleNode = document.getElementById('customNavStyle');
      if (styleNode) {
          heads.length > 0 ? heads[0].removeChild(styleNode) : docuemnt.documentElement.appendChild(styleNode);
      }
      styleTag.styleSheet ?
        styleTag.styleSheet.cssText = this.setCssStyleString()
        : styleTag.innerText = this.setCssStyleString();
      heads.length > 0 ? heads[0].appendChild(styleTag) : docuemnt.documentElement.appendChild(styleTag);
    },
    setCssStyleString() {
      return `
        .jc-menu-wrap {
          background-color: ${this.navBackgroundColor} !important;
          border-right: 1px solid ${this.navBackgroundColor};
          overflow: auto;
        }
        .jc-first-subMenu > [class*=menu], .jc-first-subMenu > [class*=submenu] > .el-submenu__title {
          background-color: ${this.navBackgroundColor} !important;
        }

        .jc-menu-wrap .is-active{
          background-color: ${this.activeBackgroundColor} !important;
          color: ${this.fontColor} !important;
        }
        .jc-menu-wrap .el-menu-item, .jc-menu-wrap .el-submenu__title {
          height: 50px !important;
          line-height: 50px !important;
        }
        .jc-menu-wrap  .el-menu-item:hover, .jc-menu-wrap .el-submenu__title:hover {
          background-color: ${this.activeBackgroundColor} !important;
          color: ${this.fontColor} !important;
        }
        .jc-menu-wrap .el-menu-item i, .jc-menu-wrap .el-submenu__title i {
          color: ${this.fontColor} !important;
        }
        .el-menu--horizontal .is-active .el-submenu__title {
          border-bottom: 3px solid #1890FF !important;
          color: ${this.fontColor} !important;
        }
        .el-menu--horizontal .el-menu .el-menu-item.is-active, .el-menu--horizontal .el-menu .el-submenu.is-active>.el-submenu__title {
          color: ${this.fontColor} !important; 
          background-color: ${this.activeBackgroundColor} !important;
        }
        .jc-subMenu-box .el-submenu__title i,.jc-subMenu-box .el-menu-item i {
          color: ${this.fontColor} !important;
        }
      `;
    }
  }
}
</script>

<style>
.jc-vervicle-menu:not(.el-menu--collapse) {
  width: 100%;
  overflow: hidden;
  user-select: none;
}
.jc-vervicle-menu:not(.el-menu--collapse):hover {
  overflow: auto;
}
</style>