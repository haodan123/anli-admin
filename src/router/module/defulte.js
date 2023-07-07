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
        meta: { hidden: true },
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
        path: '/buttonList',
        name: 'buttonList',
        icon: 'fa-solid fa-square-check',
        meta: { title: '按钮列表', keepAlive: true },
        component: () => import('@/views/buttonList/index.vue')
      },
      {
        path: '/clansCards',
        name: 'clansCards',
        icon: 'fa-regular fa-credit-card',
        meta: { title: 'clans卡片', keepAlive: true },
        component: () => import('@/views/clansCards/index.vue')
      },


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
    name: '学习js',
    style: "color: #cdea39;",
    redirect: "/textEditor",
    icon: 'fa-brands fa-js',
    children: [
      {
        path: "/textEditor",
        icon:'fa-solid fa-text',
        component: () => import("@/views/Learnjs/textEditor/index.vue"),
        name: "textEditor",
        meta: { title: "富文本" },
      },
      {
        path: "/textEditor2",
        icon:'fa-solid fa-key',
        component: () => import("@/views/Learnjs/textEditor2/index.vue"),
        name: "textEditor2",
        meta: { title: "富文本2" },
      },
      {
        path: "/password",
        icon:'fa-solid fa-key',
        component: () => import("@/views/Learnjs/password/index.vue"),
        name: "密码随机生成",
        meta: { title: "密码随机生成" },
      },
      {
        path: "/qrCodeGenerator",
        icon:'fa-solid fa-qrcode',
        component: () => import("@/views/Learnjs/qrCodeGenerator/index.vue"),
        name: "生成二维码",
        meta: { title: "生成二维码" },
      },
      {
        path: "/deviceBattery",
        icon:'fa-solid fa-battery-half',
        component: () => import("@/views/Learnjs/deviceBattery/index.vue"),
        name: "设备电池",
        meta: { title: "设备电池" },
      },
      {
        path: "/XOgame",
        icon:'fa-solid fa-o',
        component: () => import("@/views/Learnjs/XOgame/index.vue"),
        name: "井字棋",
        meta: { title: "井字棋" },
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
