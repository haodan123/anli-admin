<template>
  <div class="protview">
    <!-- npm引入的方法 -->
    <i style="color: red" class="material-icons zoom_in">face</i>
    <i class="material-icons-sharp" style="color: green;">chat_bubble</i>
    <i class="material-icons-outlined" style="color: skyblue;">radio_button_checked</i>
    <i class="material-icons-round">pie_chart</i>
    <i class="material-icons-sharp" style="color: red;">key</i>
    <i class="material-icons-two-tone">pie_chart</i>
    
    <!-- cdn的方法 -->
    <span class="material-symbols-outlined" >
      chat_bubble
    </span>
    <span style="color: red" class="material-symbols-outlined">settings
    </span>
    <div class="navigation">
      <div class="tb-box">
        <div class="tb-item" @click="changeLine(index)" :class="{active:index===activeIndex}"
          v-for="(item, index) in tabberList" :key="index">
          <span class="icon" :class="`icon-${item.icon}`"></span>
          <!-- <i class="icon-camera"></i> -->
          <span ref="tabbarRef" class="text">{{item.text}}</span>
        </div>
        <!-- 浮标 -->
        <div class="indicator" :style="{transform:` translateX(calc(80px * ${activeIndex}))`}"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {
    ref
  } from 'vue';
  const activeIndex = ref(0)
  const tabbarRef = ref()
  const indicatorWidth = ref(80)

  const changeLine = (index) => {
    activeIndex.value = index
    // console.log(tabbarRef.value[activeIndex.value]);
    indicatorWidth.value = tabbarRef.value[activeIndex.value].offsetWidth
  }


  const tabberList = ref([{
      icon: 'home',
      text: 'Home'
    },
    {
      icon: 'Profile',
      text: 'Profile'
    },
    {
      icon: 'chat_bubble',
      text: 'Messagge'
    },
    {
      icon: 'camera',
      text: 'Photos'
    },
    {
      icon: 'settings',
      text: 'Settings'
    }
  ])
</script>

<style scoped lang="scss">
  .protview {
    width: 100%;
    height: 100%;
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .navigation {
    width: 450px;
    height: 80px;
    display: flex;
    background-color: #2f2f2f;
    justify-content: center;
    // align-items: center;
    border-radius: 10px;
    position: relative;
  }

  .tb-box {
    display: flex;
    position: relative;
    // width: 100%;
  }

  .tb-item {
    cursor: pointer;
    width: 80px;
    height: 80px;
    position: relative;
    font-weight: 500;
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .icon {
      // display: block;
      line-height: 85px;
      font-size: 1.5em;
      transition: all 0.5s ease-in;
      text-align: center;
      color: rgba(255, 255, 255, 0.5);

      &:hover {
        color: rgba(255, 255, 255, 1);

      }
    }

    .text {
      position: absolute;
      font-weight: 600;
      font-size: 0.6em;
      color: #222327;
      transform: translateY(0px);
      letter-spacing: 0.05em;
      text-transform: uppercase;
      // opacity: 0;
      color: #ccc;
      transform: translateY(18px);
      z-index: 10;
    }


  }

  .active {
    .icon {
      color: #29fd53;
      transform: translateY(-8px);

      &:hover {
        color: #29fd53;
      }
    }

    .text {
      color: #222327;
      opacity: 1;
      transform: translateY(16px);
    }
  }

  .indicator {
    position: absolute;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.5s;
    position: absolute;
    padding: 0 10px;
    bottom: 15px;
    // width: 80%;
    height: 16px;
    background-color: #29fd53;
    border-radius: 10px;
  }
</style>