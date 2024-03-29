import Vue from 'vue';
import App from './App';

import router from './router';
import axios from 'axios'
import { baseAxios } from '@/network/axios'

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
        Drawer,
        Divider,
        List,
        Avatar,
        Spin,
        Col,
        Row,
        Collapse,
        Card,
        Descriptions,
        message,
        Modal,
        Empty,
        Breadcrumb,
        Affix,
        PageHeader,
        Slider,
        Tooltip,
        notification,

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
Vue.use(Drawer)
Vue.use(Divider)
Vue.use(List)
Vue.use(Avatar)
Vue.use(Spin)
Vue.use(Col)
Vue.use(Row)
Vue.use(Collapse)
Vue.use(Card)
Vue.use(Descriptions)
Vue.use(Modal)
Vue.use(Empty)
Vue.use(Breadcrumb)
Vue.use(Affix)
Vue.use(PageHeader)
Vue.use(Slider)
Vue.use(Tooltip)

Vue.prototype.$bus = new Vue()
Vue.prototype.$message = message
Vue.prototype.$notification = notification

Vue.prototype.baseAxios = baseAxios
axios.defaults.withCredentials = true;

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