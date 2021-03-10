import Vue from 'vue';
import App from './App';

import {Button} from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';

Vue.use(Button)

new Vue({
    el: '#app',
    // router,
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