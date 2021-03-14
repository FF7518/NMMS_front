import Vue from "vue";
import Router from "vue-router";

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
// view
const App = () =>
    import ("@/App")
const Dashboard= () =>
    import ('@/view/Dashboard')
const MainPage = () =>
    import ('@/view/MainPage')
const CardManage = () =>
    import ("@/view/CardManage")

// components
const MemberManage = () =>
    import ("@/components/MemberManage")
const CmSale = () =>
    import ('@/components/CmSale')
const CmBan = () =>
    import ('@/components/CmBan')



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
                    path: "/",
                    component: MainPage,
                    
                },
                {
                    path: "/membermanage",
                    name: "membermanage",
                    component: MemberManage,
                    meta: {},
                    
                },
            ],
        },
        {
            path: "/cardmanage",
            name: "cardmanage",
            component: CardManage,
            children: [
                {
                    path: "/cardsale",
                    component: CmSale,
                },
                {
                    path: "/cardban",
                    component: CmBan,
                },
            ],
        },
        {
            path: "*",
            redirect: "/",
        },
    ]
})

export default router;