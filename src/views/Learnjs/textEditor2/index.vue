<template>
  <div style="width: 100%; height: 400px;">
    <ckeditor  :style="{ height: '400px' }" :editor="editor" v-model="editorData" :config="editorConfig">
    </ckeditor>
  </div>
</template>

<script setup>
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  // import {
  //   Essentials
  // } from '@ckeditor/ckeditor5-essentials';
  // import {
  //   Bold,
  //   Italic
  // } from '@ckeditor/ckeditor5-basic-styles';
  // import {
  //   Link
  // } from '@ckeditor/ckeditor5-link';
  // import {
  //   Paragraph
  // } from '@ckeditor/ckeditor5-paragraph';
  import {
    ref
  } from 'vue';
  const editor = ClassicEditor
  const editorData = ref('sssssss')
  const editorConfig = {
    height:'300'
    // plugins: [
    //   Essentials,
    //   Bold,
    //   Italic,
    //   Link,
    //   Paragraph
    // ],

    // toolbar: {
    //   items: [
    //     'bold',
    //     'italic',
    //     'link',
    //     'undo',
    //     'redo'
    //   ]
    // }
  }
</script>