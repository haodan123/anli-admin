<template>
  <!-- 滑动效果  手机版 -->
  <div id="scroll-container" ref="scrollref">
    <div class="detailNavbar" :style="[{ height:navbarHeight + 'px',opacity: tabOpacityVal  }]">
      <div @click="onTab(item)" class="navbar-item" :class="curTab === item.value ? 'current' : ''"
        v-for="item in tabList" :key="item.to">
        {{item.label}}
      </div>
    </div>

    <div class="detail-swiper-selector">

    </div>
    <div class="detail-comment-selector">

    </div>
    <div class="detail-content-selector">

    </div>
  </div>
</template>

<script setup>
  import throttle from "@/utils/throttle.js"
  import {
    ref,
    onMounted,
    nextTick
  } from "vue";
  const curTab = ref('goods')
  const tabOpacityVal = ref(0)
  const tabList = ref([{
      label: '商品',
      value: 'goods',
      to: 'detail-swiper-selector',
    },
    {
      label: '评价',
      value: 'comment',
      to: 'detail-comment-selector',
    },
    {
      label: '详情',
      value: 'detail',
      to: 'detail-content-selector',
    },
  ])
  const scrollref = ref(null)
  const navbarHeight = 44
  onMounted(() => {
    // const container = document.getElementById('scroll-container');
    // const container = document.getElementById('scroll-container');
    // 添加滚动事件监听器
    // console.log(container);
    nextTick(() => {
      scrollref.value.addEventListener('scroll', onPageScroll, true);
    })
  })
  let commentCard = {
    top: 0,
    bottom: 0,
  };
  // 点击跳转到对应的位置
  const onTab = (item) => {
    let scrollTop = 0;
    if (item.value === 'comment') {
      scrollTop = commentCard.top - navbarHeight + 1;
    } else if (item.value === 'detail') {
      scrollTop = commentCard.bottom - navbarHeight + 1;
    }
    console.log(scrollTop);

    // window.scrollTo({
    //   top: scrollTop,
    //   behavior: "smooth",
    // });
    //上面的方法在设置 overflow: scroll;后不能使用 原因未知  下面的两种方法都能使用
    scrollref.value.scrollTop = scrollTop
    // const scrolDom = document.querySelector(`.${item.to}`)
    // scrolDom.scrollIntoView({
    //   behavior: 'smooth' // 加一个过渡动画(固定的)
    // })

  }

  // 获取评论区的top值 和详情区的bottom
  const getCommentCardNode = () => {
    return new Promise((res, rej) => {
      let elem = document.querySelector(".detail-comment-selector");
      let rect = elem.getBoundingClientRect();
      console.log(rect);
      if (rect) {
        commentCard.top = rect.top;
        commentCard.bottom = rect.top + rect.height;
        res(rect)
      } else {
        res(null)
      }

    });
  }

  const onPageScroll = (e) => {
    // console.log(e.target.scrollTop);
    // 判断是否需要透明
    const scrollTop = e.target.scrollTop
    tabOpacityVal.value = scrollTop > navbarHeight ? 1 : scrollTop * 0.01;
    // 获取评论区的top值 和详情区的bottom
    if (commentCard.top === 0) {
      throttle(() => {
        getCommentCardNode();
      }, 50);
    }
    if (scrollTop < commentCard.top - navbarHeight) {
      // 滑动的距离小于评论区的顶部时
      curTab.value = 'goods';
    } else if (
      scrollTop >= commentCard.top - navbarHeight &&
      scrollTop <= commentCard.bottom - navbarHeight
    ) {
      // 滑动的距离大于评论区顶部 小于评论区底部时
      curTab.value = 'comment';
    } else {
      curTab.value = 'detail';
    }
  }
</script>

<style scoped lang="scss">
  #scroll-container {
    width: 100%;
    height: 100vh;
    // overflow-y: auto;
    overflow: scroll;
    scroll-behavior: smooth ;
  }

  .detailNavbar {
    position: fixed;
    top: 0;
    color: #000;
    background-color: #fff;
    width: 100%;
    // height: ;
    display: flex;
    align-items: center;
    justify-content: center;

    .navbar-item {
      flex: 1;
      text-align: center;
    }

    .current {
      color: red;
    }
  }

  .detail-swiper-selector {
    height: 100vh;
    width: 100%;
    background-color: red;
  }

  .detail-comment-selector {
    height: 30vh;
    width: 100%;
    background-color: blue;
  }

  .detail-content-selector {
    height: 100vh;
    width: 100%;
    background-color: green;
  }
</style>