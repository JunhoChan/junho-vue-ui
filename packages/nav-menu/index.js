import { Menu, Submenu, MenuItem, Tooltip } from 'element-ui'
import jcNavMenu from './src/index.vue';

jcNavMenu.install = function(Vue) {
    Vue.component(jcNavMenu.name, jcNavMenu);
    Vue.use(Menu)
    Vue.use(Submenu)
    Vue.use(MenuItem)
    Vue.use(Tooltip)
};
export default jcNavMenu;