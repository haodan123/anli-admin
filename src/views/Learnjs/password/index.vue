<template>
  <div class="pageView">
    <div class="container">
      <h2>随机密码生成器</h2>
      <div class="wrapper">
        <!-- 展示生成的密码 -->
        <div class="input-box">
          <input type="text" disabled v-model="passwordInput">
          <!-- <font-awesome-icon icon="fa-duotone fa-copy" class="copy-icon" /> -->
          <!-- <font-awesome-icon :icon="['fas', 'copy']" class="copy-icon"/> -->
          <font-awesome-icon icon="copy" class="copy-icon" @click="copyPass" v-if="copyState" />
          <font-awesome-icon :icon="['fas', 'check']" style=" color: greenyellow;" class="copy-icon" v-else />
        </div>
        <!-- 安全度的条形 -->
        <div class="pass-indicator">
          <div class="indicator " :class="updatePassIndicator"></div>
        </div>
        <!-- 密码长度条 -->
        <div class="pass-length">
          <div class="details">
            <label class="title">密码长度</label>
            <span>{{  passLength}}</span>
          </div>
          <input type="range" min="1" max="30" @input="changeLength" v-model="passLength" step="1">

        </div>
        <!-- 密码设置 -->
        <div class="pass-settings">
          <label>密码设置</label>
          <ul class="options">
            <li class="option">
              <input type="checkbox" id="lowercase" checked>
              <label for="lowercase">小写字母 (a-z)</label>
            </li>
            <li class="option">
              <input type="checkbox" id="uppercase">
              <label for="uppercase">大写最 (A-Z)</label>
            </li>
            <li class="option">
              <input type="checkbox" id="numbers">
              <label for="numbers">数组 (0-9)</label>
            </li>
            <li class="option">
              <input type="checkbox" id="symbols">
              <label for="symbols">符号 (!-$^+)</label>
            </li>
            <li class="option">
              <input type="checkbox" id="exc-duplicate">
              <label for="exc-duplicate">排除重复的</label>
            </li>
            <li class="option">
              <input type="checkbox" id="spaces">
              <label for="spaces">包括空格</label>
            </li>
          </ul>
        </div>
        <!-- 提交按钮 -->
        <button class="generate-btn" @click="generatePassword">生成密码</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {
    ElMessage
  } from 'element-plus'

  import {
    computed,
    onMounted,
    ref
  } from 'vue';
  // 拷贝的状态
  const copyState = ref(true)
  // 生成的密码
  const passwordInput = ref('生成密码')
  const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
  }
  // 密码长度
  const passLength = ref(15)

  // 改变长度
  const changeLength = (e) => {
    generatePassword()
  }



  // 生成密码
  const generatePassword = () => {
    // 获取所有选项的dom
    const options = document.querySelectorAll(".option input");
    let staticPassword = "", //静态密码
      randomPassword = "", //最终的密码
      excludeDuplicate = false, //不重复
      passLength1 = passLength.value;

    options.forEach(item => {

      if (item.checked) {
        if (item.id !== "exc-duplicate" && item.id !== "spaces") { //不排除重复的 不包括空格
          // console.log(item.id);
          staticPassword += characters[item.id]
        } else if (item.id == 'spaces') { //包括空格
          staticPassword += `  ${staticPassword}  `
        } else {
          excludeDuplicate = true
        }
      }
    })
    // console.log(staticPassword.length); //生成的总长度
    // console.log(Math.random()); //随机数
    // console.log(Math.floor(Math.random() * staticPassword.length)); //向下取整 
    for (let i = 0; i < passLength1; i++) {
      const randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)]
      // console.log(randomChar);
      // 不要重复的数字或者字符
      if (excludeDuplicate) {
        // console.log(!randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--);
        // 如果randomPassword里没有这个字符直接把新字符累加到randomPassword中  如果有这个字符 i - 1加一次循环
        !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--
      } else {

        randomPassword += randomChar
      }

    }
    // console.log(randomPassword);
    passwordInput.value = randomPassword
  }

  // 拷贝密码
  const copyPass = () => {
    navigator.clipboard.writeText(passwordInput.value);
    ElMessage({
      message: '拷贝成功',
      type: 'success',
    })
    copyState.value = false
    setTimeout(() => {
      copyState.value = true
    }, 1500)
  }


  onMounted(() => {
    generatePassword()
  })


  // 密码强度
  const updatePassIndicator = computed(() => {
    return passLength.value <= 8 ? 'weak' : passLength.value <= 16 ? 'medium' : 'strong'
  })
</script>

<style scoped lang="scss">
  .pageView {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    width: 100%;
    max-width: 450px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    background-color: #fff;
  }

  h2 {
    font-size: 1.31rem;
    padding: 1rem 1.75rem;
    font-weight: 600;
    border-bottom: 1px solid #d4dbe5;
  }

  .wrapper {
    margin: 1.25rem 1.75rem;
  }

  .input-box {
    position: relative;

    input {
      padding: 0 2.85rem 0 1rem;
      font-size: 1.06rem;
      height: 53px;
      width: 100%;
      background: none;
      font-weight: 500;
      border: 1px solid #aaa;
      letter-spacing: 1.4px;
      border-radius: 4px;
      color: #000;
    }

    .copy-icon {
      position: absolute;
      right: 13px;
      line-height: 53px;
      font-size: 24px;
      top: 50%;
      transform: translateY(-50%);

      &:hover {
        color: greenyellow;
      }
    }
  }

  .pass-indicator {
    width: 100%;
    height: 4px;
    border-radius: 25px;
    margin-top: 0.75rem;
    position: relative;

    .indicator {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      border-radius: 25px;
      transition: width 0.3s ease;
    }

    .weak {
      width: 20%;
      background-color: red;
    }

    .medium {
      width: 50%;
      background: #f1c80b;
    }

    .strong {
      width: 100%;
      background: #43A047;
    }
  }

  .pass-length {
    margin: 1.56rem 0 1.25rem;

    .details {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    input {
      height: 5px;
      width: 100%;
    }
  }

  .pass-settings {

    .options {
      display: flex;
      flex-wrap: wrap;
      margin-top: 1rem;

      .option:first-child {
        pointer-events: none;
        input{
          opacity: 0.7;
        }
      }

      .option {
        width: calc(100% / 2);
        display: flex;
        align-items: center;
        margin-bottom: 1rem;

        label {
          cursor: pointer;
          color: #4f4f4f;
          padding-left: 0.63rem;
        }
      }
    }
  }


  .generate-btn {
    width: 100%;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    background: #43A047;
    font-size: 1.06rem;
    padding: 0.94rem 0;
    border-radius: 5px;
    text-transform: uppercase;
    margin: 0.94rem 0 1.3rem;

  }
</style>