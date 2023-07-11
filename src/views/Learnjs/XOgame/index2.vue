<template>
   <div class="xogame">
      <h1> XO Game</h1>

      <div id="container">
         <div class="block">
            <div id="box1" class="box top left">
               <span data-player="none" class="oxBox" ref="boxRef1" @click="play(boxRef1)">&nbsp;</span>
            </div>
            <div id="box2" class="box top">
               <span data-player="none" class="oxBox" ref="boxRef2" @click="play(boxRef2)">&nbsp;</span>
            </div>
            <div id="box3" class="box top right">
               <span data-player="none" class="oxBox" ref="boxRef3" @click="play(boxRef3)">&nbsp;</span>
            </div>
         </div>
         <div class="block">
            <div id="box4" class="box left">
               <span data-player="none" class="oxBox" ref="boxRef4" @click="play(boxRef4)">&nbsp;</span>
            </div>
            <div id="box5" class="box">
               <span data-player="none" class="oxBox" ref="boxRef5" @click="play(boxRef5)">&nbsp;</span>
            </div>
            <div id="box6" class="box right">
               <span data-player="none" class="oxBox" ref="boxRef6" @click="play(boxRef6)">&nbsp;</span>
            </div>
         </div>
         <div class="block">
            <div id="box7" class="box bottom left">
               <span data-player="none" class="oxBox" ref="boxRef7" @click="play(boxRef7)">&nbsp;</span>
            </div>
            <div id="box8" class="box bottom">
               <span data-player="none" class="oxBox" ref="boxRef8" @click="play(boxRef8)">&nbsp;</span>
            </div>
            <div id="box9" class="box bottom right">
               <span data-player="none" class="oxBox" ref="boxRef9" @click="play(boxRef9)">&nbsp;</span>
            </div>
         </div>
      </div>

      <div class="alert" v-if="isShow">
         <b>{{endText}}</b>
         <br>
         <button @click="playAgain()"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
               class="bi bi-arrow-repeat" viewBox="0 0 16 16">
               <path
                  d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
               <path fill-rule="evenodd"
                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
            </svg></button>
      </div>
   </div>
</template>

<script setup>
   import {
      onMounted,
      ref
   } from 'vue';
   const isShow = ref(false)
   const boxRef1 = ref()
   const boxRef2 = ref()
   const boxRef3 = ref()
   const boxRef4 = ref()
   const boxRef5 = ref()
   const boxRef6 = ref()
   const boxRef7 = ref()
   const boxRef8 = ref()
   const boxRef9 = ref()

   let span = ''

   const playerTurn = ref("x");
   const moves = ref(0); //到9代表结束

   const isGameOver = ref(false) //游戏是否结束

   const endText = ref('')

   const play = (e) => {
      console.log(e.dataset);
      // 该元素未被选中 并且游戏没有结束
      if (e.dataset.player == "none" && isGameOver.value == false) {
         e.innerHTML = playerTurn.value //渲染结果
         e.dataset.player = playerTurn.value //重置属性
         moves.value++ //每点击一次都+1  到8时意味着游戏结束

         if (playerTurn.value == 'x') {
            playerTurn.value = 'o'
         } else if (playerTurn.value == 'o') {
            playerTurn.value = 'x'
         }
      }

      // 检查游戏是否结束  一下的排列的都算胜利
      checkWinner(1, 2, 3);
      checkWinner(4, 5, 6);
      checkWinner(7, 8, 9);
      checkWinner(1, 4, 7);
      checkWinner(2, 5, 8);
      checkWinner(3, 6, 9);
      checkWinner(1, 5, 9);
      checkWinner(3, 5, 7);

      // console.log(moves.value);
      // 游戏结束的条件
      if (moves.value == 9 && isGameOver.value == false) {
         draw()
      }
   }

   // 游戏胜利
   const checkWinner = (a, b, c) => {
      a--;
      b--;
      c--;
      // console.log((span[a].dataset.player === span[b].dataset.player));
      // console.log((span[b].dataset.player === span[c].dataset.player));
      // console.log((span[a].dataset.player === span[c].dataset.player));
      // console.log((span[a].dataset.player === "x" ||span[a].dataset.player === "o"));
      // console.log();
      // 三个位置的dataset.player属性都相同  且都是 x 或者 o  并且游戏没有结束   游戏胜利
      if ((span[a].dataset.player === span[b].dataset.player) && (span[b].dataset.player === span[c].dataset
            .player) && (span[a].dataset.player === span[c].dataset.player) && (span[a].dataset.player === "x" ||
            span[a].dataset.player === "o") && isGameOver.value == false) {
         console.log('赢了?');
         gameOver(a);
      }
   }

   // 重启游戏
   const playAgain = () => {
      isShow.value = false
      isGameOver.value = false
      resetGame()
   }

   // 重置数据
   const resetGame = () => {
      console.log(span);
      for (let i = 0; i < span.length; i++) {
         span[i].dataset.player = "none";
         span[i].innerHTML = "&nbsp;";
      }
      playerTurn.value = 'x'
   }

   // 游戏结束
   const gameOver = (a) => {

      endText.value = `游戏结束 ${span[a].dataset.player.toUpperCase()}胜利!!!`

      isShow.value = true

      moves.value = 0
      isGameOver.value = true
   }

   // 游戏结束没有人胜利
   const draw = () => {
      endText.value = '游戏结束 ,没有取得胜利'
      isShow.value = true

   }

   onMounted(() => {
      // span = document.getElementsByTagName("span");
      span = document.querySelectorAll('.oxBox')
   })
</script>

<style scoped lang="scss">
   .xogame {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
   }

   h1 {
      font-size: 2rem;
   }

   #container {
      margin: 5% auto;
      border-radius: 5px;
      text-align: center;
   }

   .box {
      display: inline-block;
      border: 1px solid gray;
      width: 100px;
      height: 100px;
      text-align: center;
      box-sizing: border-box;
      padding: 0;
   }

   span {
      position: absolute;
      font-size: 75px;
      font-family: sans-serif;
      text-align: center;
      height: 75px;
      width: 75px;
      padding: 0;
      margin: 5px;
      margin-left: -35px;
   }

   .top {
      border-top: none;
   }

   .bottom {
      border-bottom: none;
   }

   .left {
      border-left: none;
   }

   .right {
      border-right: none;
   }

   .alert {
      height: 75px;
      width: 125px;
      text-align: center;
      display: inline-block;
      background: ghostwhite;
      position: absolute;
      z-index: 10;
      border-radius: 20px;
      box-shadow: 0 0 75px 2px dimgray;
      animation: larger 0.5s;
      animation-fill-mode: forwards;
      box-sizing: content-box;
      padding: 30px;
      top: 50%;
      transform: translateY(-50%);
   }

   button {
      background: dimgray;
      border-radius: 2px;
      color: ghostwhite;
      border: none;
      outline: none;
   }

   button:focus {
      background: silver;
   }

   .activeBox {
      background: silver;
   }

   @keyframes larger {
      from {
         height: 75px;
         width: 125px;
      }

      to {
         height: 100px;
         width: 250px;
      }

   }
</style>