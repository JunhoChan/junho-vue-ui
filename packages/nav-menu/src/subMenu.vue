<template>
  <div :class="['jc-subMenu-box', className]">
    <template v-for="(subData, index) in navData">
       <el-submenu
         v-if="subData[navProp['children']] && subData[navProp['children']].length"
         :key="subData[navProp['label']] + index"
         :index="subData[navProp['label']] + index">
          <template slot="title">
            <i :class="subData[navProp['icon']]"></i>
            <span slot="title" v-if="!$parent.collapse">{{subData[navProp['label']]}}</span>
          </template>
          <jc-sub-menu
            :nav-data="subData[navProp['children']]"
            :nav-prop="navProp"
            @click-menu="hancleMenuItemClick"/>
      </el-submenu>
      <el-menu-item
          v-else
          :index="subData[navProp['label']] + index"
          :key="subData[navProp['label']] + index"
          @click.native="hancleMenuItemClick(subData)">
          <i :class="subData[navProp['icon']]"></i>
          <span slot="title">{{subData[navProp['label']]}}</span>
        </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'JcSubMenu',
  
  props: {
    className: String,
    navData: {
      type: Array,
      require: true
    },
    navProp: {
     type: Object,
     default() {
       return {
        children: 'children',
        label: 'label',
        path: 'path',
        icon: 'icon'
      };
     } 
   },
  },
  methods: {
    /**
     * @description 菜单被点击
     * @param {Object} routeData
     */
    hancleMenuItemClick(routeData) {
      this.$emit('click-menu', routeData)
    }
  }
}
</script>