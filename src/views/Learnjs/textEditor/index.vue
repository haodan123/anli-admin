<template>
  <!-- 使用废弃方法execCommand封装的富文本  -->
  <div class="pageview">
    <div class="container">
      <div class="options">
        <button id="bold" class="option-button format" @click="boldBtn">
          <font-awesome-icon icon="fa-solid fa-bold" />
        </button>
        <button id="superscript" class="option-button script">
          <font-awesome-icon icon="fa-solid fa-superscript" />
        </button>
        <button id="subscript" class="option-button script">
          <font-awesome-icon icon="fa-solid fa-subscript" />
        </button>
        <button id="italic" class="option-button script">
          <font-awesome-icon icon="fa-solid fa-italic" />
        </button>
        <button id="underline" class="option-button script">
          <font-awesome-icon icon="fa-solid fa-underline" />
        </button>
        

        <button id="insertOrderedList" class="option-button">
          <font-awesome-icon icon="fa-solid fa-list-ol" />
        </button>
        <button id="insertUnorderedList" class="option-button">
          <font-awesome-icon icon="fa-solid fa-list" />
        </button>

        <button id="undo" class="option-button">
          <font-awesome-icon icon="fa-solid fa-rotate-left" />
        </button>
        <button id="redo" class="option-button">
          <font-awesome-icon icon="fa-solid fa-rotate-right" />
        </button>

        <button id="createLink" class="adv-option-button">
          <font-awesome-icon icon="fa fa-link" />
        </button>
        <button id="unlink" class="option-button">
          <font-awesome-icon icon="fa fa-unlink" />
        </button>

        <button id="justifyLeft" class="option-button align">
          <font-awesome-icon icon="fa-solid fa-align-left" />
        </button>
        <button id="justifyCenter" class="option-button align">
          <font-awesome-icon icon="fa-solid fa-align-center" />
        </button>
        <button id="justifyRight" class="option-button align">
          <font-awesome-icon icon="fa-solid fa-align-right" />
        </button>
        <button id="justifyFull" class="option-button align">
          <font-awesome-icon icon="fa-solid fa-align-justify" />
        </button>
        <button id="indent" class="option-button spacing">
          <font-awesome-icon icon="fa-solid fa-indent" />
        </button>
        <button id="outdent" class="option-button spacing">
          <font-awesome-icon icon="fa-solid fa-outdent" />
        </button>
        <select id="formatBlock" class="adv-option-button">
          <option value="H1">H1</option>
          <option value="H2">H2</option>
          <option value="H3">H3</option>
          <option value="H4">H4</option>
          <option value="H5">H5</option>
          <option value="H6">H6</option>
        </select>
        <select id="fontName" class="adv-option-button"  v-model="fontValue" @change="changeFont">
          <option :value="item" v-for="(item, index) in fontList" :key="index">{{ item }}</option>
        </select>
        <select id="fontSize" class="adv-option-button"  v-model="sizeValue" placeholder="选择字号" @change="sizeChange">
          <option :value="item" v-for="(item, index) in 7" :key="index">{{ item }}</option>
        </select>

        <div class="input-wrapper">
          <input type="color" id="foreColor" class="adv-option-button">
          <!-- <label for="foreColor">Font Color</label> -->
          <label for="foreColor">字体颜色</label>
        </div>
        <div class="input-wrapper">
          <input type="color" id="backColor" class="adv-option-button">
          <!-- <label for="backColor">Highlight Color</label> -->
          <label for="backColor">高亮背景</label>
        </div>
        <input type="file" ref="fileInput" @change="handleFileUpload" />


      </div>
      <div id="text-input" contenteditable="true" ref="editor" @input="handleInput"></div>
    </div>
  </div>
</template>

<script setup>
  import {
    onMounted,
    ref
  } from 'vue';
  const editor = ref()
  // 富文本的内容
  const handleInput = (e) => {
    console.log(editor.value.innerHTML);
  }


  const changeFont = (e) => {
    // fontValue.value = e.target.value
    console.log(fontValue.value);
  }
  const fontValue = ref('Arial')
  const fontList = ref([
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive",
  ])

  const sizeValue = ref('选择字号')
  const sizeChange = (e) => {
    // console.log(sizeValue);
    // console.log(e.target.value);
  }
  onMounted(() => {
    // 获取所有选项的按钮  根据id来操作富文本
    const optionsButtons = document.querySelectorAll('.option-button')
    // 获取所有下拉框的dom
    const advancedOptionButton = document.querySelectorAll(".adv-option-button");


    optionsButtons.forEach(item => {
      item.addEventListener('click', () => {
        // console.log(item);
        modifyText(item.id, false, null)
      })
    })

    advancedOptionButton.forEach((button) => {
      button.addEventListener("change", () => {
        console.log(button.value);
        modifyText(button.id, false, button.value);
      });
    });
  })


  // 上传图片 start
  const handleFileUpload = (event) => {
    const files = event.target.files;
    // console.log(files);
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        insertImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  const insertImage = (dataUrl) => {
    const image = new Image();
    image.src = dataUrl;
    image.onload = () => {
      const range = window.getSelection().getRangeAt(0);
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('image-container');
      imgContainer.appendChild(image);
      editor.value.focus();
      range.insertNode(imgContainer);
    };
  }
  // 上传图片end

  // 富文本的api
  const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
  };
</script>

<style lang="scss">
  li {
    list-style: auto;
    display: list-item;

  }

  ul {
    list-style-type: disc;
  }

  .pageview {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .container {
    background-color: #fff;
    width: 700px;
    padding: 50px 30px;
    // position: absolute;
    // transform: translate(-50%, -50%);
    // left: 50%;
    // top: 50%;
    border-radius: 10px;
    box-shadow: 0 25px 50px rgba(7, 20, 35, 0.2);
  }


  .options {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px;
  }

  button {
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: 3px;
    border: none;
    background-color: #fff;
    outline: none;
    color: #020929;
    cursor: pointer;
  }

  select {
    padding: 7px;
    border: 1px solid #020929;
    border-radius: 3px;
    cursor: pointer;
  }

  .options label,
  .options select {
    font-family: 'Poppins', sans-serif;
  }

  input[type="color"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    width: 40px;
    height: 28px;
    border: none;
    cursor: pointer;
  }

  input[type="color"]::-webkit-color-swatch {
    border-radius: 15px;
    box-shadow: 0 0 0 2px #fff, 0 0 0 3px #020929;
  }

  input[type="color"]::-moz-color-swatch {
    border-radius: 15px;
    box-shadow: 0 0 0 2px #fff, 0 0 0 3px #020929;
  }

  #text-input {
    margin-top: 10px;
    border: 1px solid #ddd;
    padding: 20px;
    min-height: 50vh;
  }

  .active {
    background-color: #e0e9ff;
  }

  .image-container {
    max-width: 100%;
    max-height: 100%;
    display: inline-block;

    img {
      width: 100%;
      height: 100%;
    }
  }
</style>