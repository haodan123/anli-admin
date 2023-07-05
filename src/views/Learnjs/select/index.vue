<template>
  <div class="el-select-wrapper">
    <div class="el-select" :class="{ 'is-open': isOpen }" @click.stop="toggleDropdown">
      <div class="el-select__value">
        <span v-if="selectedOption">{{ selectedOption.label }}</span>
        <span v-else class="el-select__placeholder">{{ placeholder }}</span>
        <!-- <i class="el-select__caret el-icon-arrow-up" :class="{ 'is-reverse': isOpen }"></i> -->
        <!-- <font-awesome-icon icon="fa-regular fa-arrow-up" :class="{ 'is-reverse': isOpen,'el-select__caret':true }"/> -->
        <font-awesome-icon icon="arrow-up" :class="{ 'is-reverse': isOpen,'el-select__caret':true }" />
      </div>
      <ul class="el-select__dropdown" v-show="isOpen">
        <li v-for="option in options" :key="option.value" @click="selectOption(option)">
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import {
    onMounted,
    onUnmounted,
    ref
  } from 'vue';
  const props = defineProps({
    placeholder: {
      type: String,
      default: '请选择',
    },
  })

  const isOpen = ref(false)
  const selectedOption = ref(null)
  const options = ref(
    [{
        label: '选项1',
        value: 'option1'
      },
      {
        label: '选项2',
        value: 'option2'
      },
      {
        label: '选项3',
        value: 'option3'
      },
    ],
  )

  onMounted(() => {
    // 点击其他地方关闭弹窗
    document.addEventListener('click', () => {
      isOpen.value = false
    });

  })
  onUnmounted(() => {
    document.removeEventListener('click', () => {
      isOpen.value = false
    })
  })

  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  }
  const selectOption = (option) => {
    selectedOption.value = option;
    isOpen.value = true;
  }
</script>

<style scoped>
  .el-select-wrapper {
    position: relative;
    display: inline-block;
  }

  .el-select {
    position: relative;
    width: 200px;
    height: 36px;
    background-color: #f8f8f8;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    cursor: pointer;
  }

  .el-select.is-open {
    border-color: #409eff;
  }

  .el-select__value {
    display: flex;
    align-items: center;
    padding: 0 10px;
    background-color: #fff;
  }

  .el-select__placeholder {
    color: #c0c4cc;
  }

  .el-select__caret {
    margin-left: auto;
    font-size: 12px;
    transition: transform 0.3s;
  }

  .el-select__caret.is-reverse {
    transform: rotate(180deg);
  }

  .el-select__dropdown {
    position: absolute;
    top: 101%;
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-top: none;
    border-radius: 4px;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  }

  .el-select__dropdown li {
    padding: 8px 10px;
    cursor: pointer;
  }

  .el-select__dropdown li:hover {
    background-color: #f5f7fa;
  }
</style>