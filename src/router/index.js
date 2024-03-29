import Vue from "vue";
import Router from "vue-router";
import { Card } from "_ant-design-vue@1.7.4@ant-design-vue";
import cardManage from "../script/card-manage";

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
// view
const App = () =>
    import ("@/App")
const Home = () =>
    import ("@/view/Home")
const Dashboard= () =>
    import ('@/view/Dashboard')
const MainPage = () =>
    import ('@/view/MainPage')
const CardManage = () =>
    import ("@/view/CardManage")
const UsersDemo = () => 
    import ("@/view/UsersDemo")

// components
const Admin = () =>
    import ('@/components/Admin')
const Login = () => 
    import ('@/components/Login')
const MemberManage = () =>
    import ("@/components/MemberManage")
const CmSale = () =>
    import ('@/components/CmSale')
const CmBan = () =>
    import ('@/components/CmBan')
const CmSave = () =>
    import ('@/components/CmSave')
const FinancialManage = () =>
    import ('@/components/FinancialManage')
const HomeContent = () =>
    import ('@/components/HomeContent')



const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "app",
            component: App,
            meta: {},
            redirect: "/home",
        },
        {
            path: "/home",
            name: "home",
            component: Home,
            redirect: "/home/content",
            children: [
                {
                    path: "/home/login",
                    name: "login",
                    component: Login,
                },
                {
                    path: "/home/content",
                    name: "homecontent",
                    component: HomeContent,
                }
            ]
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: Dashboard,
            meta: {},
            redirect: "/dashboard/mainpage",
            children: [
                {
                    path: "mainpage",
                    component: MainPage,
                },
                {
                    path: "membermanage",
                    name: "membermanage",
                    component: MemberManage,
                    meta: {},
                    
                },
                {
                    path: "financialmanage",
                    name: "financialmanage",
                    component: FinancialManage,
                },
                {
                    path: "cardmanage",
                    name: "cardmanage",
                    component: CardManage,
                },
                {
                    path: "cardsale",
                    name: "cardsale",
                    component: CmSale,
                },
                {
                    path: "cardban",
                    name: "cardban",
                    component: CmBan,
                },
                {
                    path: "cardsave",
                    name: "cardsave",
                    component: CmSave,
                },
                {
                    path: "admin",
                    name: "admin",
                    component: Admin,  
                },
            ],
        },
        {
            path: "/demo",
            name: "demo",
            component: UsersDemo
        },
        {
            path: "*",
            redirect: "/",
        },
    ]
})

export default router;