import Vue from "vue";
import Router from "vue-router";

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
const App = () =>
    import ("@/App")
const Dashboard= () =>
    import ('@/view/Dashboard')



const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "app",
            component: App,
            meta: {},
            redirect: "/dashboard",
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: Dashboard,
            meta: {},
        },
        {
            path: "*",
            redirect: "/",
        },
    ]
})

export default router;