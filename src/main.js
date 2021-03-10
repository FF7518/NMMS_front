import Vue from 'vue';
import App from './App';


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