<template>
  <div>
    <jc-porttable-video />
    <!-- <jc-waterfall
       style="margin-top:20px"
      :width="400"
      :img-datas="imgDatas"
    /> -->
    <!-- <jc-infinite-scroll
      :height="500" @scroll-bottom="handleScrollBottom" :delay="0">
      <div style="height:20vh">22222</div>
      <div style="height:20vh">22222</div>
      <div style="height:20vh">22222</div>
      <div style="height:20vh">22222</div>
      <div style="height:20vh">22222</div>
      <div style="height:20vh">22222</div>
      <div style="height:20vh">22222</div>
      <div style="height:20vh">22222</div>
    </jc-infinite-scroll> -->
    <jc-nav-menu
      :mode="mode"
      :nav-data="navData"
      :collapse="isCollapse"
      @click-menu="handleClcikMenu"
    />
     <jc-nav-menu
      style="margin-top:20px"
      mode="horizontal"
      :nav-data="navData"
      :collapse="isCollapse"
    />
    <el-button @click="handleAdd">新增</el-button>
    <jc-tab-list
      ref="tabList"
      :tabData.sync="tabData"
      :tabProp="tabProp"
      style="margin-top: 20px"
    />
  </div>
</template>
  
<script>
export default {
  name: 'app',
  
  data() {
    return {
      tabProp: {
        id: 'id',
        label: 'name'
      },
      tabData: [
       {
          id: '1' + new Date(),
          name: '首页',
          icon: 'el-icon-location',
          path: '/home'
       }
      ],
      funcIndex: 0,
      navData: [
        { 
          label: '首页',
          path: 'el-icon-location',
          icon: 'el-icon-location',
          children:  []
        },
        { 
          label: '组件',
          path: 'el-icon-location',
          children:  [
            {
              path: 'el-icon-xx',
              label: '动态表单221312',
              children: [
                {
                  path: '',
                  label: '下拉树',
                  children: [
                    {
                      path: '多选下拉',
                      label: '多选下拉'
                    }
                  ]
                },
                {
                  path: 'xxx',
                  label: '动态表单2'
                }
              ]
            }
          ]
        }
      ],
      mode: 'vertical', // horizontal / vertical
      isCollapse: true,
      imgDatas: [
        '@/assets/1.jpg',
        '@/assets/2.jpg',
        '@/assets/3.jpg',
        '@/assets/4.jpg',
        '@/assets/5.jpg',
        '@/assets/6.jpg',
        '@/assets/7.jpg',
        '@/assets/8.jpg',
        '@/assets/9.jpg',
        '@/assets/10.jpg'
      ]
    }
  },

  methods: {
    handleClcikMenu(router) {
      console.log(router)
    },
    // 滚动到底部
    handleScrollBottom() {
      console.log('滚动到底部')
    },
    handleAdd() {
      this.$refs['tabList'].openTab({
        id: '1' + new Date(),
        name: '首页',
        icon: 'el-icon-location',
        path: '/home'
      })
    }
  }
}
</script>