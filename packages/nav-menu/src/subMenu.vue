<template>
  <el-submenu :index="subData.label">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">{{subData[navProp['label']]}}</span>
    </template>
    <template v-for="(sub, index) in subData.children">
        <jc-sub-menu
          v-if="sub[navProp['children']] && sub[navProp['children']].length > 0"
          :key="sub.label + index"
          :sub-data="sub"
          :nav-prop="navProp"
        />
        <el-menu-item
          v-else
          :index="sub.label"
          :key="sub.label + index">
          <i class="el-icon-location"></i>
          <span slot="title">{{sub[navProp['label']]}}</span>
        </el-menu-item>
      </template>
  </el-submenu>
</template>

<script>
export default {
  name: 'JcSubMenu',
  
  props: {
    subData: {
      type: Object,
      require: true
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
  }
}
</script>