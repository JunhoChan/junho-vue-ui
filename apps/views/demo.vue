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
    />
     <jc-nav-menu
      style="margin-top:20px"
      mode="horizontal"
      :nav-data="navData"
      :collapse="isCollapse"
    />
  </div>
</template>

<script>
export default {
  name: 'app',
  
  data() {
    return {
      funcIndex: 0,
      navData: [
        { 
          label: '首页',
          path: 'el-icon-location',
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
      isCollapse: false,
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
    // 滚动到底部
    handleScrollBottom() {
      console.log('滚动到底部')
    }
  }
}
</script>