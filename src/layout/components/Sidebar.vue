<template>
  <div class="sidebar" :style="{width:isCollapse?'70px':'200px'}">
    <!-- 上面的图标 -->
    <div class="collapse" @click="handleCollapse">
      <i class="icon-zhankai3 " v-show="!isCollapse" :style="{ color: '#24adf3' }"></i>
      <i class="icon-zhankai3 " v-show="isCollapse" ></i>

    </div>
    <!-- logo放置 -->
    <div class="logo-header">
      <img src="@/assets/tu/龙珠3.jpg" alt="">
    </div>
    <!-- 菜单 -->
    <!-- background-color="#fff" text-color="#162B64" active-text-color="#435EBE" -->
    <el-menu class="el-menu-vertical-demo" :default-active="defaultMenu" mode="vertical" unique-opened
      @select="handleSelect" :collapse="isCollapse">

      <template v-for="item in menus" :key="item.id">
        <el-sub-menu :index="item.path" v-if="item.children.length > 1">
          <template #title>
            <font-awesome-icon :icon="item.icon" />
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item :index="v.path" v-for="v in item.children" :key="v.id">
            <font-awesome-icon :icon="v.icon" />
            <span>{{ v.name }}</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item v-else :index="item.children[0].path">
          <font-awesome-icon :icon="item.icon" />
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>

  </div>
</template>

<script setup>
  import {
    ref,
    onMounted,
    defineEmits,
    onUnmounted,
    computed
  } from 'vue';
  import menu from '@/router/module/defulte.js'

  import {
    useRoute,
    useRouter
  } from 'vue-router';
  const router = useRouter()
  const route = useRoute()
  const emit = defineEmits(['handleClose'])

  const isCollapse = ref(false)
  // 把用于刷新的redirect路由排除在外
  const menus = ref(menu.filter(item => item.path !== '/redirect') || [])
  document.addEventListener('resize', (e) => {
    console.log(e.target);
  })

  const defaultMenu = computed(() => {
    return route.path
  })
  // 选中
  const handleSelect = (key) => {
    // console.log(menus.value[0].children[0].path);
    router.push({
      path: key
    })
  }
  // 点击缩放
  const handleCollapse = () => {
    isCollapse.value = !isCollapse.value
    emit('handleClose', isCollapse.value)
  }
  // 缩放的时间
  const onResize = (e) => {
    const innerWidth = e.target.innerWidth
    if (innerWidth < 800 && !isCollapse.value) {
      handleCollapse()
    } else if (innerWidth > 800 && isCollapse.value) {
      handleCollapse()
    }
  }

  // 屏幕小于一定宽度就自动缩放
  onMounted(() => {
    window.addEventListener('resize', onResize)
  })
  // 卸载事件
  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });
</script>

<style scoped lang="less">
  .sidebar {
    width: 200px;
    min-height: 500px;
    height: 100vh;
    transition: ease 0.2s;
    background: #2a2d34;
  }

  .collapse {
    height: 48px;
    width: 35px;
    text-align: center;
    line-height: 48px;
    position: absolute;
    z-index: 1000;
    right: -35px;
    top: 40px;
    transform: translateY(-50%);
    cursor: pointer;
    // z-index: 999 !important;
  }

  .collapse:hover {
    background-color: rgb(246, 246, 246);
    // background-color: red;
  }

  .logo-header {
    height: 80px;
    line-height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    img {
      // width: 100%;
      width: 70px;
      // height: 100%;
      height: 70px;
    }
  }

  .el-menu {
    // height: 100vh !important;
    border-right: 1px !important;
    transition: ease 0.2s;

    .icons {
      color: #919090;
      margin-right: 8px;

    }
  }
</style>