<template>
  <button type="button" class="btn"
    :class='[computedType, computedSize, computedOutline, computedActive, computedBlock]'>
    <slot>
      {{ btnText }}
    </slot>
  </button>
</template>

<script setup>
  import {
    computed
  } from 'vue';

  const props = defineProps({
    'btnText': { // 按钮文本内容
      type: String,
      default: ''
    },
    'btnType': { // 按钮类型
      type: String,
      default: 'primary' //success  danger    warning  info    light dark  link
    },
    'btnSize': { // 按钮尺寸大小
      type: String,
      default: '' //lg   sm
    },
    'btnOutline': { // 只有边框的按钮样式
      type: String,
      default: 'light' //light   dark    link        

    },
    'btnActive': { // 按钮状态，是一个布尔值，true表示激活（当前状态）
      type: Boolean,
      default: false
    },
    'btnBlock': { // 按钮是不是块元素，是一个布遥值，true表示块元素
      type: Boolean,
      default: false
    }
  })
  // 控制按钮的类型
  const computedType = computed(() => {
    return props.btnType ? `btn-${props.btnType}` : ''
  })
  // 控制按钮大小尺寸
  const computedSize = computed(() => {
    return props.btnSize ? `btn-${props.btnSize}` : ''
  })
  // 控制按钮边框
  const computedOutline = computed(() => {
    return props.btnOutline ? `btn-outline-${props.btnOutline}` : ''
  })

  // 控制按钮是否激活
  const computedActive = computed(() => {
    return props.btnActive === 'true' ? 'active' : ''
  })

  // 控制按钮是否是块元素
  const computedBlock = computed(() => {
    return props.btnBlock === 'true' ? 'btn-block' : ''
  })
</script>

<style scoped>

</style>