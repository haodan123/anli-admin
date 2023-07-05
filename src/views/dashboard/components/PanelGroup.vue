<template>
  <el-row :gutter="40">
    <el-col :lg="6" :md="12" :sm="12" :xs="24">
      <div class="grid-content ep-bg-purple">
        <img src="@/assets/tu/万花筒.jpg" alt="">
        <div class="info">
          <p class="item">图1</p>
          <p>100战力</p>
        </div>
      </div>
    </el-col>
    <el-col :lg="6" :md="12" :sm="12" :xs="24">
      <div class="grid-content ep-bg-purple">
        <img src="@/assets/tu/龙珠.jpg" alt="">
        <div class="info">
          <p>图2</p>
          <p>200战力</p>
        </div>
      </div>

    </el-col>
    <el-col :lg="6" :md="12" :sm="12" :xs="24">
      <div class="grid-content ep-bg-purple">
        <img src="@/assets/tu/龙珠2.jpg" alt="">
        <div class="info">
          <p>图3</p>
          <p>300战力</p>
        </div>
      </div>
    </el-col>
    <el-col :lg="6" :md="12" :sm="12" :xs="24">
      <div class="grid-content ep-bg-purple">
        <img src="@/assets/tu/龙珠4.jpg" alt="">
        <div class="info">
          <p>图4</p>
          <p>400战力</p>
        </div>
      </div>
    </el-col>

  </el-row>
  <select v-model="theme">
    <option value="OS">跟随系统</option>
    <option value="light">亮色</option>
    <option value="dark">暗色</option>
  </select>
</template>

<script setup>
  import useTheme from '../../../composables/useTheme';

  const {
    theme
  } = useTheme()
</script>

<style scoped lang="scss">
  @import '@/styles/theme.scss';



  .grid-content {
    padding: 30px;
    border-radius: 15px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    img {
      width: 60px;
      height: 60px;
      border-radius: 10px;
      cursor: pointer;
    }

    .info {
      font-size: 16px;
      // color: #000;
      color: rgba(0, 0, 0, 0.45);

      p {
        margin-bottom: 12px;

      }

      p:nth-child(2) {
        font-size: 20px;
      }
    }
  }

  .item {


    // @include useTheme {
    //   width: 100px;
    //   height: 100px;
    //   background-color: getVar('danger');
    // }
  }
</style>