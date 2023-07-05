<template>

  <div class="content-body "  data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine">
    <div class="slide-container" ref="container" :style="{transform: `translateX(${offset}px)`}">

      <div class="wrapper" v-for="(item, index) in cardList" :key="index">
        <div class="clash-card barbarian">
          <!-- clash-card__image--barbarian -->

          <div class="clash-card__image " :class="`clash-card__image--${item.id}`">
            <img :src="item.img" alt="barbarian" />
          </div>
          <!-- <div class="clash-card__level clash-card__level--barbarian">{{item.level}}</div> -->
          <div class="clash-card__level" :class="[`clash-card__level--${item.id}`]">{{item.level}}</div>
          <div class="clash-card__unit-name">{{item.name}}</div>
          <div class="clash-card__unit-description">
            {{item.content}}
          </div>

          <!-- <div class="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix"> -->
          <div class="clash-card__unit-stats clearfix" :class="[`clash-card__unit-stats--${item.id}`]">
            <div class="one-third">
              <div class="stat">{{item.training}}<sup>S</sup></div>
              <div class="stat-value">Training</div>
            </div>


            <div class="one-third">
              <div class="stat">{{item.speed}}</div>
              <div class="stat-value"> Speed</div>
            </div>

            <div class="one-third no-border">
              <div class="stat">{{item.cost}}</div>
              <div class="stat-value">Cost</div>
            </div>

          </div>

        </div> <!-- end clash-card barbarian-->
      </div> <!-- end wrapper -->

    </div> <!-- end container -->

    <div class="slide-dots">
      <span @click="set(index)" :class="{active:index===current}" v-for="(item, index) in cardList"
        :key="item.id"></span>
    </div>

    <div @click="prev" class="btn left">&leftarrowtail;</div>
    <div @click="next" class="btn right">&rightarrowtail;</div>
    <canvas class="background"></canvas>
  </div>
</template>

<script setup>
  import {
    onMounted,
    onUnmounted,
    ref
  } from 'vue';



  const cardList = ref([{
      id: 1,
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/barbarian.png',
      level: 'LEVEL 4',
      name: 'The Barbarian',
      content: 'The Barbarian is a kilt-clad Scottish warrior with an angry, battle-ready expression, hungry for destruction. He has Killer yellow horseshoe mustache.',
      training: '20S',
      speed: '16',
      cost: '15',
      color: '#EC9B3B'

    },
    {
      id: 2,
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/archer.png',
      level: 'LEVEL 5',
      name: 'The Archer',
      content: 'The Archer is a female warrior with sharp eyes. She wears a short, light green dress, a hooded cape, a leather belt and an attached small pouch.',
      training: '25S',
      speed: '24',
      cost: '300',
      color: '#EE5487'
    }, {
      id: 3,
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/giant.png',
      level: 'LEVEL 5',
      name: 'The Giant',
      content: "Slow, steady and powerful, Giants are massive warriors that soak up huge amounts of damage. Show them a turret or cannon and you'll see their fury unleashed!",
      training: '2',
      speed: '12',
      cost: '2250',
      color: '#F6901A'
    }, {
      id: 4,
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/goblin.png',
      level: 'LEVEL 5',
      name: 'The Goblin',
      content: 'These pesky little creatures only have eyes for one thing: LOOT! They are faster than a Spring Trap, and their hunger for resources is limitless.',
      training: '30S',
      speed: '32',
      cost: '100',
      color: '#82BB30'
    }, {
      id: 5,
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/wizard.png',
      level: 'LEVEL 6',
      name: 'The Wizard',
      content: 'The Wizard is a terrifying presence on the battlefield. Pair him up with some of his fellows and cast concentrated blasts of destruction on anything, land or sky!',
      training: '5S',
      speed: '16',
      cost: '4000',
      color: '#4FACFF'
    }
  ])

  const current = ref(0) //当前的轮播 
  const container = ref(null) //父盒子ref
  const offset = ref(0) //滑动的距离
  let timer = 0
  const start = () => {
    timer = window.setInterval(() => {
      next()
    }, 2000)
  }
  const stop = () => {
    clearInterval(timer)
  }

  const prev = () => {
    const lastIndex = cardList.value.length - 1
    const prevIndex = current.value === 0 ? lastIndex : current.value - 1
    set(prevIndex)
  }
  const next = () => {
    const lastIndex = cardList.value.length - 1
    const nextIndex = lastIndex === current.value ? 0 : current.value + 1
    set(nextIndex)
  }

  const set = (index) => {
    current.value = index
    offset.value = -index * container.value.offsetWidth



  }

  onMounted(() => {
    // start()
    AOS.init();
  })
  onUnmounted(() => {
    stop()
  })
</script>

<style scoped lang="scss">
  .background {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    z-index: 999;
  }

  @import url(https://fonts.googleapis.com/css?family=Lato:400,700,900);

  $border-radius-size: 14px;
  $barbarian: #EC9B3B;
  $archer: #EE5487;
  $giant: #F6901A;
  $goblin: #82BB30;
  $wizard: #4FACFF;

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  .content-body {
    width: 100%;
    height: 100vh;
    background: linear-gradient(to bottom, rgba(140, 122, 122, 1) 0%, rgba(175, 135, 124, 1) 65%, rgba(175, 135, 124, 1) 100%) fixed;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/coc-background.jpg') no-repeat center center fixed;
    background-size: cover;
    font: 14px/20px "Lato", Arial, sans-serif;
    color: #9E9E9E;
    position: relative;
    // margin-top: 30px;
  }

  .slide-container {
    margin: auto;
    width: 500px; //如果想要一个卡片独占一页就注释掉宽度
    // width: 600px;
    text-align: center;

    // position: absolute;
    // left: 0;
    // bottom: 0;
    // top: 0;
    // right: 0;
    display: flex;
    transition: all 0.7s;
    // overflow: hidden;
  }

  .wrapper {
    flex: 0 0 100%;

    padding-top: 40px;
    padding-bottom: 40px;

    &:focus {
      outline: 0;
    }
  }



  .clash-card {
    background: white;
    width: 300px;
    display: inline-block;
    margin: auto;
    border-radius: $border-radius-size + 5;
    position: relative;
    text-align: center;
    box-shadow: -1px 15px 30px -12px black;
    z-index: 99;
  }

  .clash-card__image {
    position: relative;
    height: 230px;
    margin-bottom: 35px;
    border-top-left-radius: $border-radius-size;
    border-top-right-radius: $border-radius-size;
  }

  // .clash-card__image--barbarian {
  .clash-card__image--1 {
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/barbarian-bg.jpg');

    img {
      width: 400px;
      position: absolute;
      top: -65px;
      left: -70px;
    }
  }

  // .clash-card__image--archer {
  .clash-card__image--2 {
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/archer-bg.jpg');

    img {
      width: 400px;
      position: absolute;
      top: -34px;
      left: -37px;
    }
  }

  // .clash-card__image--giant {
  .clash-card__image--3 {
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/giant-bg.jpg');

    img {
      width: 340px;
      position: absolute;
      top: -30px;
      left: -25px;
    }
  }

  // .clash-card__image--goblin {
  .clash-card__image--4 {
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/goblin-bg.jpg');

    img {
      width: 370px;
      position: absolute;
      top: -21px;
      left: -37px;
    }
  }

  // .clash-card__image--wizard {
  .clash-card__image--5 {
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/wizard-bg.jpg');

    img {
      width: 345px;
      position: absolute;
      top: -28px;
      left: -10px;
    }
  }

  .clash-card__level {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 3px;
  }

  // .clash-card__level--barbarian {
  .clash-card__level--1 {
    color: $barbarian;
  }

  // .clash-card__level--archer {
  .clash-card__level--2 {
    color: $archer;
  }

  // .clash-card__level--giant {
  .clash-card__level--3 {
    color: $giant;
  }

  // .clash-card__level--goblin {
  .clash-card__level--4 {
    color: $goblin;
  }

  // .clash-card__level--wizard {
  .clash-card__level--5 {
    color: $wizard;
  }

  .clash-card__unit-name {
    font-size: 26px;
    color: black;
    font-weight: 900;
    margin-bottom: 5px;
  }

  .clash-card__unit-description {
    padding: 20px;
    margin-bottom: 10px;
  }

  // .clash-card__unit-stats--barbarian {
  .clash-card__unit-stats--1 {
    background: $barbarian;

    .one-third {
      border-right: 1px solid #BD7C2F;
    }
  }

  // .clash-card__unit-stats--archer {
  .clash-card__unit-stats--2 {
    background: $archer;

    .one-third {
      border-right: 1px solid #D04976;
    }
  }

  // .clash-card__unit-stats--giant {
  .clash-card__unit-stats--3 {
    background: $giant;

    .one-third {
      border-right: 1px solid darken($giant, 8%);
    }
  }

  // .clash-card__unit-stats--goblin {
  .clash-card__unit-stats--4 {
    background: $goblin;

    .one-third {
      border-right: 1px solid darken($goblin, 6%);
    }
  }

  // .clash-card__unit-stats--wizard {
  .clash-card__unit-stats--5 {
    background: $wizard;

    .one-third {
      border-right: 1px solid darken($wizard, 6%);
    }
  }

  .clash-card__unit-stats {

    color: white;
    font-weight: 700;
    border-bottom-left-radius: $border-radius-size;
    border-bottom-right-radius: $border-radius-size;

    .one-third {
      width: 33%;
      float: left;
      padding: 20px 15px;
    }

    sup {
      position: absolute;
      bottom: 4px;
      font-size: 45%;
      margin-left: 2px;
    }

    .stat {
      position: relative;
      font-size: 24px;
      margin-bottom: 10px;
    }

    .stat-value {
      text-transform: uppercase;
      font-weight: 400;
      font-size: 12px;
    }

    .no-border {
      border-right: none;
    }
  }

  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }

  .slick-prev {
    left: 100px;
    z-index: 999;
  }

  .slick-next {
    right: 100px;
    z-index: 999;
  }

  // 指示点
  .slide-dots {
    cursor: pointer;
    display: flex;
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
    gap: 12px;

    span {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .active {
      background-color: #fff;
    }
  }

  // 按钮
  .btn {
    cursor: pointer;
    color: #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
  }

  .left {
    left: 10px;
  }

  .right {
    right: 10px;
  }
</style>