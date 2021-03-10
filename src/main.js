import Vue from 'vue';
import App from './App';

import router from './router';

import {Button, Layout, Icon, Menu} from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';

Vue.use(Button)
Vue.use(Layout)
Vue.use(Icon)
Vue.use(Menu)

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    data() {
        return {
            loadingList: false,
            recordsList: [],
            user: "",
            name: "",
        };
    },
})