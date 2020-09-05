## 自定义element-ui业务Ui组件库
* 基于Element + vue(2.6)版本二次封装后台业务组件、方便在相同等业务场景下复用组件

## 使用
```shell
$: npm install element-ui junho-vue-ui
```

## 全局引入
```js
import ElemetUI from 'element-ui';
import JunhoUi from 'junho-vue-ui'
import 'junho-vue-ui/lib/themes/index.css';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElemetUI)
Vue.use(junhoUi)
```

## 按需引入引入
* 下载按需引入组件
```shell
npm install babel-plugin-component -D
```
* 然后，将 .babelrc 修改为：
```js
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    ['component', {
      'libraryName': 'junho-vue-ui',
      'styleLibraryName': 'themes',
      'camel2DashComponentName': false,
      'camel2UnderlineComponentName': false
    }]
  ]
};
```
* 在入口文件处引入代码
```js
import ElemetUI from 'element-ui';
import {
  tabList,
  navMenu,
  waterfall,
  infiniteScroll,
} from 'junho-vue-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElemetUI)
Vue.use(tabList);
Vue.use(navMenu);
Vue.use(waterfall);
Vue.use(infiniteScroll);
```
* 引用的组件可参考[github](https://github.com/JunhoChan/junho-vue-ui)项目下的apps应用
