<template>
  <div class="deviceView">
    <!-- 电池卡片 -->
    <div class="Bcard">
      <!-- 电池条 -->
      <div class="Bpill">
        <div class="Blevel">
          <div class="Bliquid" :class="levelbc" :style="{ height: parseInt(level)+'%'}"></div>
        </div>
      </div>
      <!-- 电池数据 -->
      <div class="Bdata">
        <div class="Btext">
          电池百分比:
        </div>
        <h1 class="Bpercentage">{{levelText}}%</h1>
        <div class="Bstatus">
          {{ levelStatus }}
          <i :class="iconClass"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {
    ref,
    onMounted
  } from 'vue';
  const level = ref(0) //电池高度
  const levelbc = ref('red') //电池颜色
  const levelText = ref(0) //电池文字
  const iconClass = ref('ri-plug-line')
  const levelStatus = ref('') //电池状态

  const initBattery = () => {
    navigator.getBattery().then(batt => {
      // 更新电量
      const updateBattery = () => {
        const levelRes = Math.floor(batt.level * 100)
        level.value = levelRes
        levelText.value = levelRes
        if (levelRes == 100) {
          // 满电的时候
          iconClass.value = 'ri-battery-2-fill green-color'
          // console.log(iconClass.value);
          levelStatus.value = '电量满了'
          level.value = 103
        } else if (levelRes <= 20 && !batt.charging) {
          // 电量小于20  并且没在充电中
          levelStatus.value = '电量小于20%'
          iconClass.value = 'ri-plug-line animated-red '
        } else if (batt.charging) {
          // 正在充电中
          levelStatus.value = '充电中'
          iconClass.value = 'ri-flashlight-line animated-green'
        } else {
          levelStatus.value = ''
        }

        if (levelRes <= 20) {
          // 电量低于20%
          levelbc.value = 'gradient-color-red'
        } else if (levelRes <= 48) {
          // 电量低于48%
          levelbc.value = 'gradient-color-orange'
        } else if (levelRes <= 80) {
          // 电量低于80%
          levelbc.value = 'gradient-color-yellow'
        } else {
          // 电量高于80%
          levelbc.value = 'gradient-color-green'
        }
      }
      updateBattery()
      // console.log(batt);

      // 当充电状态发生变化时
      batt.addEventListener('chargingchange', () => {
        updateBattery()
      })
      // 电量发生变化时
      batt.addEventListener('levelchange', () => {
        updateBattery()
      })
    })
  }

  onMounted(() => {
    initBattery()
  })
</script>

<style scoped lang="scss">
  .deviceView {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #070707;
    height: calc(100vh - 100px);
    color: #fff;
  }

  .Bcard {
    position: relative;
    width: 270px;
    height: 240px;
    background-color: #222;
    border-radius: 1.5rem;
    padding: 0.5rem 1.5rem;
    display: grid;
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
  }

  .Bpill {
    position: relative;
    width: 75px;
    height: 180px;
    background-color: #222;
    box-shadow: inset 20px 0 48px hsl(0, 0%, 16%), inset -4px 12px 48px hsl(0, 0%, 56%);
    border-radius: 3rem;
    justify-self: flex-start;

    .Blevel {
      border-radius: 3rem;
      position: absolute;
      inset: 2px;
      overflow: hidden;

      .Bliquid {
        box-shadow: inset -10px 0 12px hsla(0, 0%, 0%, 0.1), inset 12px 0 12px hsla(0, 0%, 0%, 0.15);
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        transition: 0.3s;
        background-color: red;
      }

      // 电池的阴影
      .Bliquid::after {
        content: "";
        position: absolute;
        height: 8px;
        box-shadow: inset 0 -3px 6px hsla(0, 0%, 0%, 0.2);
        left: 0;
        right: 0;
        margin: 0 auto;
        top: -4px;
        border-radius: 50%;
      }
    }
  }

  .Bdata {
    .Btext {}

    .Bpercentage {
      // height: 2.5rem;
      font-size: 2.5rem;
      // line-height: 2.5rem;
      margin-top: .3125rem;
    }

    .Bstatus {
      position: absolute;
      bottom: 3.5rem;
      gap: 0.3rem;
      font-size: 0.8rem;
      display: flex;
      align-items: center;

      i {
        font-size: 1.25rem;
      }
    }
  }


  // :root {
  //   --gradient-color-red: linear-gradient(90deg, hsl(7, 89%, 46%) 15%, hsl(11, 93%, 68%) 100%);
  //   --gradient-color-orange: linear-gradient(90deg, hsl(22, 89%, 46%) 15%, hsl(54, 90%, 68%)100%);
  //   --gradient-color-yellow: linear-gradient(90deg, hsl(54, 89%, 46%) 15%, hsl(92, 90%, 45%)100%);
  //   --gradient-color-green: linear-gradient(90deg, hsl(92, 89%, 46%) 15%, hsl(92, 90%, 68%)100%);
  // }

  .green-color {
    background: linear-gradient(90deg, hsl(92, 89%, 46%) 15%, hsl(92, 90%, 68%)100%);
  }

  .animated-green {
    background: linear-gradient(90deg, hsl(92, 89%, 46%) 15%, hsl(92, 90%, 68%)100%);
    animation: animated-charging 1.2s infinite alternate;
  }

  .animated-red {
    background: linear-gradient(90deg, hsl(7, 89%, 46%) 15%, hsl(11, 93%, 68%) 100%);
    animation: animated-low 1.2s infinite alternate;
  }

  .animated-green,
  .animated-red,
  .green-color {
    -webkit-background-clip: text;
    color: transparent;
  }

  @keyframes animated-charging {
    0% {
      text-shadow: none;
    }

    100% {
      text-shadow: 0 0 6px hsl(92, 90%, 68%);
    }
  }

  @keyframes animated-low {
    0% {
      text-shadow: none;
    }

    100% {
      text-shadow: 0 0 8px hsl(7, 89%, 46%);
    }
  }

  .gradient-color-red,
  .green-color-red::after {
    background: linear-gradient(90deg, hsl(7, 89%, 46%) 15%, hsl(11, 93%, 68%) 100%);
  }

  .gradient-color-green,
  .green-color-green::after {
    background: linear-gradient(90deg, hsl(92, 89%, 46%) 15%, hsl(92, 90%, 68%)100%);
  }

  .gradient-color-orange,
  .green-color-orange::after {
    background: linear-gradient(90deg, hsl(22, 89%, 46%) 15%, hsl(54, 90%, 68%)100%);
  }

  .gradient-color-yellow,
  .green-color-yellow::after {
    background: linear-gradient(90deg, hsl(54, 89%, 46%) 15%, hsl(92, 90%, 45%)100%);
  }
</style>