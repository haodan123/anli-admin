<template>
  <!-- 在index.html中引入了cdn -->
  <div class="pageView">
    <!-- <font-awesome-icon icon="fa-solid fa-download" /> -->
    <!-- <font-awesome-icon :icon="['fass', 'share-nodes']" /> -->
    <section class="qrcodeBox">
      <!-- 选项栏 -->
      <div class="row">
        <input type="color" class="light" v-model="lightColor" @change="changeColor">
        <input type="color" class="dark" v-model="darkColor" @change="changeColor">
        <select class="sizes" v-model="selectValue" @change="changeSize">
          <option :value="item.value" v-for="(item, index) in selectArr" :key="index">{{  item.label}}</option>
        </select>
      </div>
      <!-- 输入打印出来的内容 -->
      <input type="text" placeholder="输入二维码内容" class="qr-text" v-model="qrContainer">
      <!-- 二维码的站位 -->
      <div id="qr-code"></div>
      <!-- 选项按钮 -->
      <div class="action-container">
        <a href="" class="btn download" @click="generateQRCode " download="QRCode">
          <span>下载图片</span>
          <font-awesome-icon icon="fa-solid fa-download" />
        </a>
        <a class="share-btn btn" @click="handleShare">
          <span>分享</span>
          <font-awesome-icon :icon="['fass', 'share-nodes']" />
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
  import {
    onMounted,
    ref
  } from 'vue';

  const qrContainer = ref('https://github.com/haodan123?tab=repositories')
  // const qrContainer = ref({
  //   data: '123'
  // })
  const lightColor = ref('#ffffff')
  const darkColor = ref('#000000')

  const selectValue = ref(300)

  const selectArr = ref([{
      label: '100x100',
      value: 100
    },
    {
      label: '200x200',
      value: 200
    },
    {
      label: '300x300',
      value: 300
    },
    {
      label: '400x400',
      value: 400
    },
    {
      label: '500x500',
      value: 500
    },
    {
      label: '600x600',
      value: 600
    },
    {
      label: '700x700',
      value: 700
    },
    {
      label: '800x800',
      value: 800
    },
    {
      label: '900x900',
      value: 900
    },
    {
      label: '1000x1000',
      value: 1000
    },
  ])

  // 修改颜色
  const changeColor = () => {
    generateQRCode()
  }
  //  修改大小
  const changeSize = () => {
    generateQRCode()
  }

  // 生成二维码
  const generateQRCode = async () => {
    const qrBox = document.querySelector("#qr-code");
    const download = document.querySelector('.download')
    qrBox.innerHTML = "";
    new QRCode("qr-code", {
      text: qrContainer.value, //如果需要穿对象数据的话  需要吧数据json化
      height: selectValue.value,
      width: selectValue.value,
      colorLight: lightColor.value,
      colorDark: darkColor.value,
    });
    // 把下载按钮的href换成二维码的图片
    download.href = await resolveDataUrl();
  }

  // 分享二维码
  const handleShare = () => {
    setTimeout(async () => {
      try {
        const base64url = await resolveDataUrl()
        // console.log(base64url);
        // console.log(await fetch(base64url));
        const blob = await (await fetch(base64url)).blob();
        const file = new File([blob], "QRCode.png", {
          type: blob.type,
        })
        // console.log(file);
        await navigator.share({
          files: [file],
          title: qrContainer.value,
        });
      } catch (error) {
        alert("你的浏览器不支持分享.");

      }
    }, 1000)
  }

  // 获取二维码的url
  const resolveDataUrl = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const img = document.querySelector("#qr-code img");
        // console.log(img.src);
        if (img.currentSrc) {
          resolve(img.currentSrc);
          return;
        }
        const canvas = document.querySelector("canvas");
        resolve(canvas.toDataURL());
      }, 50);
    });
  }

  onMounted(() => {
    generateQRCode()
  })
</script>

<style lang="scss">
  .pageView {
    background-color: #1c1e26;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .qrcodeBox {
    // background-color: #1c1e26;
    margin-top: 20px;
    width: 100%;
    max-width: 500px;
    min-height: 500px;
  }

  .row {
    display: flex;
    justify-content: space-between;

    input[type="color"]::-webkit-color-swatch-wrapper {
      padding: 0;
    }

    input[type="color"]::-webkit-color-swatch {
      border: none;
    }

    input[type="color"] {
      width: 32.5%;
      height: 40px;
      border: none;
      border-radius: 3px;
    }



    .sizes {
      width: 32.5%;
      height: 40px;
      color: #fff;
      background: #181b29;
      border: 1px solid #414866;
      border-radius: 4px;
      outline: none;
    }
  }

  .qr-text {
    padding: 1rem;
    margin: 0.5rem 0 1rem 0;
    background: #181b29;
    border: 1px solid #414866;
    width: 100%;
    border-radius: 4px;
    color: #fff;
  }


  #qr-code {
    height: 500px;
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #414866;

    img {
      max-width: 100% !important;
      max-height: 100% !important;
    }

    canvas {
      max-width: 100% !important;
      max-height: 100% !important;
    }
  }



  .action-container {
    margin: 1rem 0;
    display: flex;

    .btn {
      color: #fff;
      max-width: 200px;
      padding: 14px;
      background: rgb(106, 43, 255);
      border-radius: 4px;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.1rem;
      font-weight: 500;
      flex: 1;
    }

    .share-btn {
      margin-left: 0.7rem;
    }

  }
</style>