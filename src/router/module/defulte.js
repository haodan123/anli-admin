import layout from '@/layout/index.vue'
// import second from '@/layout/index.vue'

export default [

  { //刷新的路由
    path: '/redirect',
    component: layout,

    children: [
      {
        name: 'redirect',
        path: '/redirect/:path(.*)',
        meta: { hidden: true, title: 'z' },
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: "/",
    name: "首页",
    component: layout,
    redirect: "/dashboard",
    icon: 'fa-solid fa-house',
    meta: { title: "首页" },
    children: [
      {
        icon: 'fa-solid fa-house',
        path: "/dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: { title: "首页" },
      },
    ],
  },
  {
    path: "/card",
    name: "card",
    component: layout,
    redirect: "/dashboard",
    icon: 'fa-solid fa-card',
    meta: { title: "卡片" },
    children: [
      {
        icon: 'fa-solid fa-card',
        path: "/clansCards",
        component: () => import("@/views/cards/clansCards/index.vue"),
        name: "clansCards",
        meta: { title: "clans卡片" },
      },
    ],
  },
  {
    path: '/cssTest',
    name: 'cssTest',
    component: layout,
    redirect: '/cssTest',
    icon: 'fa-solid fa-vial-virus',
    meta: { title: 'css样式' },
    children: [
      {
        path: '/example',
        name: 'example',
        icon: 'fa-solid fa-vial-virus',

        meta: { title: '查看更多案例', keepAlive: true },
        component: () => import('@/views/cssTest/example/index.vue')
      }
    ]
  },
  {
    path: '/test',
    name: 'Test',
    component: layout,
    redirect: '/test-1',
    icon: 'fa-solid fa-vial-virus',
    meta: { title: '测试' },
    children: [
      {
        path: '/test-1',
        name: '测试1',
        icon: 'fa-solid fa-vial-virus',

        meta: { title: '测试1', keepAlive: true },
        component: () => import('@/views/test/test.vue')
      },
      {
        path: '/navbar',
        name: 'navbar',
        icon: 'fa-solid fa-map',
        meta: { title: '导航栏', keepAlive: true },
        component: () => import('@/views/navbar/index.vue')
      },
      {
        path: '/tabbar',
        name: 'tabbar',
        icon: 'fa-solid fa-border-none',
        meta: { title: '导航栏', keepAlive: true },
        component: () => import('@/views/tabbar/index.vue')
      },
      {
        path: '/tabbar2',
        name: 'tabbar2',
        icon: 'fa-solid fa-table-cells-large',
        meta: { title: '导航栏', keepAlive: true },
        component: () => import('@/views/tabbar2/index.vue')
      },
      {
        path: '/animatedTabBar',
        name: 'animatedTabBar',
        icon: 'fa-solid fa-table-cells-large',
        meta: { title: '动画tabbar', keepAlive: true },
        component: () => import('@/views/animatedTabBar/index.vue')
      },

      {
        path: '/buttonList',
        name: 'buttonList',
        icon: 'fa-solid fa-square-check',
        meta: { title: '按钮列表', keepAlive: true },
        component: () => import('@/views/buttonList/index.vue')
      },
      // {
      //   path: '/clansCards',
      //   name: 'clansCards',
      //   icon: 'fa-regular fa-credit-card',
      //   meta: { title: 'clans卡片', keepAlive: true },
      //   component: () => import('@/views/clansCards/index.vue')
      // },
      {
        path: '/test-2',
        name: '测试2',
        meta: { title: '测试2', keepAlive: true },
        icon: 'fa-solid fa-vial-virus',

        component: () => import('@/views/test/test.vue')
      },
    ]
  },
  {
    path: "/learnjs",
    component: layout,
    name: 'learnjs',
    style: "color: #cdea39;",
    redirect: "/textEditor",
    icon: 'fa-brands fa-js',
    meta: { title: '学习js' },
    children: [
      {
        path: "/textEditor",
        icon: 'fa-solid fa-text',
        component: () => import("@/views/Learnjs/textEditor/index.vue"),
        name: "textEditor",
        meta: { title: "富文本" },
      },
      {
        path: "/textEditor2",
        icon: 'fa-solid fa-key',
        component: () => import("@/views/Learnjs/textEditor2/index.vue"),
        name: "textEditor2",
        meta: { title: "富文本2" },
      },
      {
        path: "/password",
        icon: 'fa-solid fa-key',
        component: () => import("@/views/Learnjs/password/index.vue"),
        name: "password",
        meta: { title: "密码随机生成" },
      },
      {
        path: "/qrCodeGenerator",
        icon: 'fa-solid fa-qrcode',
        component: () => import("@/views/Learnjs/qrCodeGenerator/index.vue"),
        name: "qrCodeGenerator",
        meta: { title: "生成二维码" },
      },
      {
        path: "/deviceBattery",
        icon: 'fa-solid fa-battery-half',
        component: () => import("@/views/Learnjs/deviceBattery/index.vue"),
        name: "deviceBattery",
        meta: { title: "设备电池" },
      },
      {
        path: "/XOgame",
        icon: 'fa-solid fa-o',
        component: () => import("@/views/Learnjs/XOgame/index.vue"),
        name: "XOgame",
        meta: { title: "井字棋" },
      },
      {
        path: "/XOgame2",
        icon: 'fa-solid fa-o',
        component: () => import("@/views/Learnjs/XOgame/index2.vue"),
        name: "XOgame2",
        meta: { title: "井字棋2" },
      },
      {
        path: "/select",
        component: () => import("@/views/Learnjs/select/index.vue"),
        name: "select",
        meta: { title: "下拉框" },
      },
    ],
  },



]
