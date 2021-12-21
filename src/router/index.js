import Vue from 'vue'
import VueRouter from 'vue-router'
// 一级路由
import Movie from '@/views/Movie/index'// 电影
import Nowplaying from '@/views/Movie/Nowplaying'// 正在热映

const Search = () => import('@/views/Search/index') // 搜索
const Community = () => import('@/views/Community/index') // 社区
const Center = () => import('@/views/Center/index') // 个人中心
const Detail = () => import('@/views/Detail/index') // 详情页
const Login = () => import('@/views/Login/index') // 登录
const Register = () => import('@/views/Register/index') // 注册
const Collect = () => import('@/views/Collect/index') // 我的收藏
const Comment = () => import('@/views/Comment/index') // 我的评论
const Commentadd = () => import('@/views/CommentsAdd/index') // 添加评论
// 二级路由
const Comingsoon = () => import('@/views/Movie/Comingsoon') // 即将上映

Vue.use(VueRouter)

const routes = [
  {
    path: '/movie',
    component: Movie,
    children: [
      {
        path: 'nowplaying',
        component: Nowplaying
      },
      {
        path: 'comingsoon',
        component: Comingsoon
      },
      {
        path: '',
        redirect: 'nowplaying'
      }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/community',
    component: Community
  },
  {
    path: '/center',
    component: Center
  },
  {
    path: '/detail/:id',
    component: Detail
  },
  {
    path: '/collect',
    component: Collect
  },
  {
    path: '/comment',
    component: Comment
  },
  {
    path: '/commentadd',
    component: Commentadd
  },
  {
    path: '/login',
    component: Login,
    beforeEnter (to, from, next) {
      const { isLogin } = sessionStorage
      isLogin ? next('/movie') : next()
    }
  },
  {
    path: '/register',
    component: Register,
    beforeEnter (to, from, next) {
      const { isLogin } = sessionStorage
      isLogin ? next('/movie') : next()
    }
  },
  {
    path: '*',
    redirect: '/movie'
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const { isLogin } = sessionStorage
  const { path } = to
  const isLoginOrRegister = (path === '/login' || path === '/register');
  (isLogin || isLoginOrRegister) ? next() : next('/login')
})
export default router
