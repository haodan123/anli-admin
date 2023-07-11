<template>
   <div class="xogame">
      <div class="tic-tac-toe">
         <div v-for="(cell, index) in board" :key="index" class="cell" @click="makeMove(index)">
            {{ cell }}
         </div>

      </div>

      <div class="alert" v-if="isGameOver">
         <div v-if="winner" class="message">{{ winner }} 赢了!</div>
         <div v-else-if="isDraw" class="message">平局!</div>
         <br>
         <button @click="restartGame()"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
               fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
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
      ref
   } from 'vue';

   const board = ref(Array(9).fill("")) //九个格子
   const currentPlayer = ref('X') //当前的棋子
   const isGameOver = ref(false) //游戏是否结束
   const winner = ref('') //胜利文字
   const isDraw = ref(false) //是否是平局


   // 点击 下棋
   const makeMove = (index) => {
      // 当前的位置没有下过 并且游戏没有结束
      if (board.value[index] === "" && !isGameOver.value) {
         // 把当前的空位置 替换成 当前的棋子
         board.value.splice(index, 1, currentPlayer.value);
         // 检查是否赢得游戏
         checkWinningConditions();
         // 检查是否平局
         checkDraw();
         // 切换棋子  
         switchPlayer();
      }
   }
   // 检查是否赢得游戏
   const checkWinningConditions = () => {
      const winningCombinations = [
         [0, 1, 2],
         [3, 4, 5],
         [6, 7, 8], // Rows
         [0, 3, 6],
         [1, 4, 7],
         [2, 5, 8], // Columns
         [0, 4, 8],
         [2, 4, 6], // Diagonals
      ];
      for (const combination of winningCombinations) {
         const [a, b, c] = combination;
         if (
            board.value[a] === board.value[b] &&
            board.value[b] === board.value[c] &&
            board.value[a] !== ""
         ) {
            isGameOver.value = true;
            winner.value = board.value[a];
            break;
         }
      }
   }
   // 检查是否平局
   const checkDraw = () => {
      if (!isGameOver.value && board.value.every(cell => cell !== "")) {
         isGameOver.value = true;
         isDraw.value = true;
      }
   }
   // 切换棋子  
   const switchPlayer = () => {
      currentPlayer.value = currentPlayer.value === "X" ? "O" : "X";
   }
   // 重置游戏
   const restartGame = () => {
      board.value = Array(9).fill("");
      currentPlayer.value = "X";
      isGameOver.value = false;
      winner.value = "";
      isDraw.value = false;
   }
</script>


<style scoped>
   .xogame {
      display: flex;
      align-items: center;
      justify-content: center;
   }

   .tic-tac-toe {
      display: flex;
      flex-wrap: wrap;
      width: 300px;
   }

   .cell {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      border: 1px solid #ccc;
      cursor: pointer;
   }

   .message {
      margin-top: 20px;
      font-size: 18px;
   }

   .restart-button {
      margin-top: 10px;
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