import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from "@/views/SearchView.vue";
import AttractionDetail from "@/views/AttractionDetail.vue";
import AttractionInfo from "@/views/AttractionInfo.vue";
import AttractionList from "@/views/AttractionList.vue";
import AttractionComment from "@/views/AttractionComment.vue";
import AccountLogin from "@/views/AccountLogin.vue";
import AccountRegister from "@/views/AccountRegister.vue";
import UserAccount from "@/views/UserAccount.vue";
import SubmitOrder from "@/views/SubmitOrder.vue";
import PayOrder from "@/views/PayOrder.vue";
import OrderList from "@/views/OrderList.vue";
import OrderDetail from "@/views/OrderDetail.vue";
import AttractionImages from "@/views/AttractionImages.vue";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/attraction/detail/:id',
    name: 'AttractionDetail',
    component: AttractionDetail
  },
  {
    path: '/attraction/info/:id',
    name: 'AttractionInfo',
    component: AttractionInfo
  },
  {
    path: '/attraction/comment/:id',
    name: 'AttractionComment',
    component: AttractionComment
  },
  {
    path: '/attraction/images/:id',
    name: 'AttractionImages',
    component: AttractionImages
  },
  {
    path: '/attraction/list',
    name: 'AttractionList',
    component: AttractionList
  },
  {
    path: '/account/login',
    name: 'AccountLogin',
    component: AccountLogin
  },
  {
    path: '/account/register',
    name: 'AccountRegister',
    component: AccountRegister
  },
  {
    path: '/account/user',
    name: 'UserAccount',
    component: UserAccount
  },
  {
    path: '/order/submit/:id',
    name: 'SubmitOrder',
    component: SubmitOrder
  },
  {
    path: '/order/pay/:sn',
    name: 'PayOrder',
    component: PayOrder
  },
  {
    path: '/order/list/:status',
    name: 'OrderList',
    component: OrderList
  },
  {
    path: '/order/detail/:sn',
    name: 'OrderDetail',
    component: OrderDetail
  },
]

const router = new VueRouter({
  routes
})

export default router

