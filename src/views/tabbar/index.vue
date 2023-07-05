<template>
  <div class="viewport">
    <!-- Tab items -->
    <div class="tabs">
      <div ref="tabref" @click="changeLine(index)" class="tab-item active" v-for="(item, index) in tabList"
        :key="item.title">
        <i class="tab-icon fas " :class="item.icon"></i>
        <span ref="tabtext" class="tabtext">{{ item.title }}</span>
      </div>
      <div class="line" :style="{ left: `${lineLeft}px`,width:lineWidth+'px' }"></div>
      <!-- <div class="linebox" :style="{ left: `${lineLeft}px`,width:lineWidth+'px' }"></div> -->
      <!-- <div
        class="indicator"
        :style="{ transform: `translateX(${lineLeft}px)` }"
      ></div> -->
    </div>

    <!-- Tab content -->
    <div class="tab-content">
      <div class="tab-pane active">
        <h2>React</h2>
        <p>React makes it painless to create interactive UIs. Design simple views for each state in your application,
          and React will efficiently update and render just the right components when your data changes.</p>
      </div>
      <div class="tab-pane">
        <h2>Angular</h2>
        <p>Angular is an application design framework and development platform for creating efficient and sophisticated
          single-page apps.</p>
      </div>
      <div class="tab-pane">
        <h2>Ember</h2>
        <p>Ember.js is a productive, battle-tested JavaScript framework for building modern web applications. It
          includes everything you need to build rich UIs that work on any device.</p>
      </div>
      <div class="tab-pane">
        <h2>Vue.js</h2>
        <p>Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other
          monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {
    onMounted,
    ref
  } from 'vue';
  const tabref = ref()
  const activeTab = ref(0)
  const lineLeft = ref(0)
  const lineWidth = ref(0)
  const tabtext = ref()
  onMounted(() => {
    initLine()
  })
  const changeLine = (index) => {
    console.log(tabtext.value);
    activeTab.value = index
    initLine()
  }
  const initLine = () => {
    // console.log(tabtext.);

    // 根据item的长度来设置浮标的左偏移
    // const activeTabElement = tabref.value[activeTab.value];
    // lineLeft.value = activeTabElement.offsetLeft;
    // lineWidth.value = activeTabElement.offsetWidth
    // console.log(activeTabElement.offsetWidth);
    // 根据文字 来设置浮标的宽度和左偏移
    const activeText = tabtext.value[activeTab.value];
    // console.log(activeText.offsetLeft);
    lineLeft.value = activeText.offsetLeft;
    lineWidth.value = activeText.offsetWidth
  }
  const tabList = ref([{
      icon: 'fa-code',
      title: 'React'
    },
    {
      icon: 'fa-cog',
      title: 'Angular'
    },
    {
      icon: 'fa-plus-circle',
      title: 'Ember'
    },
    {
      icon: 'fa-pen-nib',
      title: ' Vue.JS'
    },
  ])


  // 原生js的实现方法
  //   const $ = document.querySelector.bind(document);
  // const $$ = document.querySelectorAll.bind(document);

  // const tabs = $$(".tab-item");
  // const panes = $$(".tab-pane");

  // const tabActive = $(".tab-item.active");
  // const line = $(".tabs .line");

  // // SonDN fixed - Active size wrong size on first load.
  // // Original post: https://www.facebook.com/groups/649972919142215/?multi_permalinks=1175881616551340
  // requestIdleCallback(function () {
  //   line.style.left = tabActive.offsetLeft + "px";
  //   line.style.width = tabActive.offsetWidth + "px";
  // });

  // tabs.forEach((tab, index) => {
  //   const pane = panes[index];

  //   tab.onclick = function () {
  //     $(".tab-item.active").classList.remove("active");
  //     $(".tab-pane.active").classList.remove("active");

  //     line.style.left = this.offsetLeft + "px";
  //     line.style.width = this.offsetWidth + "px";

  //     this.classList.add("active");
  //     pane.classList.add("active");
  //   };
  // });
</script>

<style scoped lang="scss">
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .viewport {
    display: flex;
    flex-direction: column;
    font-family: "Poppins", sans-serif;
    width: 400px;
    margin: 0 auto;
  }

  .viewport>div {
    margin: 5% auto 0;
    max-width: 720px;
  }

  .tabs {
    display: flex;
    position: relative;

  }

  .tabs .line {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 6px;
    border-radius: 15px;
    background-color: #c23564;
    transition: all 0.4s ease;
  }

  .linebox {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 50%;
    border-radius: 15px;
    background-color: #c23564;
    transition: all 0.4s ease;
    // z-index: -1;
  }
.tabtext{
  z-index: 9;
}
  .tab-item {
    min-width: 80px;
    padding: 16px 20px 11px 20px;
    font-size: 20px;
    text-align: center;
    color: #c23564;
    background-color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom: 5px solid transparent;
    opacity: 0.6;
    cursor: pointer;
    transition: all 0.5s ease;
    // z-index: 9;
  }

  .tab-icon {
    font-size: 24px;
    width: 32px;
    position: relative;
    top: 2px;
  }

  .tab-item:hover {
    opacity: 1;
    background-color: rgba(194, 53, 100, 0.05);
    border-color: rgba(194, 53, 100, 0.1);
  }

  .tab-item.active {
    opacity: 1;
  }

  .tab-content {
    padding: 28px 0;
  }

  .tab-pane {
    color: #333;
    display: none;
  }

  .tab-pane.active {
    display: block;
  }

  .tab-pane h2 {
    font-size: 24px;
    margin-bottom: 8px;
  }
</style>