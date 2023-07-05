import { ref, watch, watchEffect } from "vue";

const LOCAL_KEY = '__theme__'//存本地的key
const theme = ref(localStorage.getItem(LOCAL_KEY) || 'light') //主题 默认是亮色主题

const match = matchMedia('(prefers-color-scheme: dark)') //是否是暗黑主题 如果是暗黑主题返回true  否则false
// console.log(match.matches);

// 跟随系统
const followOS = () => {
  console.log('切换咯');
  if (match.matches) {
    document.documentElement.dataset.theme = 'dark' //给thml设置主题

  } else {
    document.documentElement.dataset.theme = 'light' //给thml设置主题
  }
}
// watch(() => theme.value, () => {

// })

watchEffect(() => {
  // console.log(match);

  localStorage.setItem(LOCAL_KEY, theme.value)

  if (theme.value === 'OS') {
    // 跟随系统
    followOS()
    //监听系统是否切换主题  切换了自动换主题
    match.addEventListener('change', followOS)
  } else {
    // 自己设置主题
    document.documentElement.dataset.theme = theme.value //给thml设置主题
    match.removeEventListener('change', followOS)
  }
})


export default function useTheme() {
  return {
    theme
  }
}