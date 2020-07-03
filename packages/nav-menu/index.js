
import jcNavMenu from './src/index.vue';

jcNavMenu.install = function(Vue) {
    Vue.component(jcNavMenu.name, jcNavMenu);
};
export default jcNavMenu;