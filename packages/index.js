import navMenu from './nav-menu'
import porttableVideo from './porttable-video';
import waterfall from './waterfall';
import lnfiniteScroll from './lnfinite-scroll';

const files = require.context('./../packages', true, /\.js$/);

export default {
    install(Vue) {
        files.keys().forEach(key => {
            Vue.use(files(key).default)
        });
    }
}

export {
    navMenu,
    waterfall,
    lnfiniteScroll,
    porttableVideo
}