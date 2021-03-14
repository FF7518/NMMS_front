import Vue from 'vue';
import App from './App';

import router from './router';

import {Button,
        Layout, 
        Icon, 
        Menu, 
        FormModel, 
        Form, 
        Input,
        Checkbox,
        Calendar,
        InputNumber,
        Radio,
        TimePicker,
        Mentions,
        Select,
        Switch,
        DatePicker,
        Carousel,
        Table,
        Popconfirm,
        Tabs,

    } from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';

Vue.use(Button)
Vue.use(Layout)
Vue.use(Icon)
Vue.use(Menu)
Vue.use(Form)
Vue.use(FormModel)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Calendar)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(Mentions)
Vue.use(TimePicker)
Vue.use(Select)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Carousel)
Vue.use(Table)
Vue.use(Popconfirm)
Vue.use(Tabs)

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