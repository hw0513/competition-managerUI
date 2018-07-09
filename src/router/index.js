import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name:'Index'}
    },
    {
      path: '/login',
      name: 'Login',
      //懒加载
      component: resolve => require(['@/components/login.vue'],resolve)
    },
    {
      path: '/index',
      name: 'Index',
      component: resolve => require(['@/components/index.vue'],resolve)
    },
    {
      path: '/register',
      name: 'Register',
      component: resolve => require(['@/components/register.vue'],resolve)
    },
    {
      path: '/competitionsList',
      name: 'CompetitionsList',
      component: resolve => require(['@/components/competitionsList.vue'],resolve),
      children: [{
        path: 'competitionInfo',
        name: 'CompetitionInfo',
        component: resolve => require(['@/components/competitionInfo.vue'],resolve)
      },
      {
        path: '/competitionsList',
        name: 'Total',
        component: resolve => require(['@/components/competitionsListTotal.vue'],resolve)
      }
    ]},
    {
      path: '/personalInfo',
      name: 'Personal',
      component: resolve => require(['@/components/personal.vue'],resolve),
      children: [{
        path: '/personalInfo',
        name: 'PersonalInfo',
        component: resolve => require(['@/components/personalInfo.vue'],resolve)
      },
      {
        path: 'updatePW',
        name: 'UpdatePW',
        component: resolve => require(['@/components/updatePassword.vue'],resolve)
      },
      {
        path: 'myAward',
        name: 'MyAward',
        component: resolve => require(['@/components/myAward.vue'],resolve)
      },
      {
        path: 'myCompetition',
        name: 'MyCompetition',
        component: resolve => require(['@/components/myCompetition.vue'],resolve)
      }
    ]},
    {
      path: '*',
      name: 'NotFound',
      component: resolve => require(['@/components/NotFound.vue'],resolve)
    }
  ]
})

