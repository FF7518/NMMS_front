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
const MainPage = () =>
    import ('@/view/MainPage')

const CardSale = () =>
    import ("@/components/CardSale")
const MemberManage = () =>
    import ("@/components/MemberManage")



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
            children: [
                {
                    path: "/cardsale",
                    name: "cardsale",
                    component: CardSale,
                    meta: {},
                },
                {
                    path: "/membermanage",
                    name: "membermanage",
                    component: MemberManage,
                    meta: {},
                },
                {
                    path: "/",
                    component: MainPage,
                }
            ],
        },
        {
            path: "*",
            redirect: "/",
        },
    ]
})

export default router;