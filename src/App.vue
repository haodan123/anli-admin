<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
  import "./assets/css/reset.css"
  // import "./assets/css/base.less"
</script>

<style lang="scss">
  html {
    scroll-behavior: smooth !important;
  }

  @import "@/styles/theme.scss";
  // @import url('@/styles/font/iconfont.css');
  @import url('@/styles/fonts.scss');
  // @import url('@/styles/googleIcon.scss');
  // 谷歌图标 ↓
  @import 'material-icons/iconfont/material-icons.css';

  /* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
  // @font-face {
  //   font-family: "阿里妈妈方圆体 VF Regular";
  //   src: url("//at.alicdn.com/wf/webfont/7IFoZG56PrxF/ZvLIbEtm0baa.woff2") format("woff2"),
  //     url("//at.alicdn.com/wf/webfont/7IFoZG56PrxF/Q0JCqjkWzlpc.woff") format("woff");
  //   font-display: swap;
  // }

  // * {
  //   // 谷歌字体 使用了cdn
  //   font-family: 'Noto Serif SC', serif;
  //   // 阿里字体
  //   // font-family: '阿里妈妈方圆体 VF Regular', serif;
  // }

</style>