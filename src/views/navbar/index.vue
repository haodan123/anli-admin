<template>
  <div class="body">
    <div class="nav">
      <div class="nav-wrapper">
        <div class="nav-item">
          <a href="#" class="alink">
            <span>Started</span>
            <img src="./asset/drop.png" alt="">
          </a>
          <div class="nav-drop-down-wrapper">
            <div class="nav-drop-down">
              <div class="down-item">
                <div class="down-item-wrapper">
                  <span>👍YI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="nav-item">
          <a href="#" class="alink">
            <span>About</span>
            <img src="./asset/drop.png" alt="">
          </a>
          <div class="nav-drop-down-wrapper">
            <div class="nav-drop-down">
              <div class="down-item">
                <div class="down-item-wrapper">
                  <span>⌨️JIAN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="nav-item">
          <a href="#" class="alink">
            <span>Pricing</span>
            <img src="./asset/drop.png" alt="">
          </a>
          <div class="nav-drop-down-wrapper">
            <div class="nav-drop-down">
              <div class="down-item">
                <div class="down-item-wrapper">
                  <span>3️⃣SAN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="nav-item">
          <a href="#" class="alink">
            <span>Product</span>
            <img src="./asset/drop.png" alt="">
          </a>
          <div class="nav-drop-down-wrapper">
            <div class="nav-drop-down">
              <div class="down-item">
                <div class="down-item-wrapper">
                  <span>⛓️LIAN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="nav-item">
          <a href="#" class="alink">
            <span>Started</span>
            <img src="./asset/drop.png" alt="">
          </a>
          <div class="nav-drop-down-wrapper">
            <div class="nav-drop-down">
              <div class="down-item">
                <div class="down-item-wrapper">
                  <img src="./asset/QQ.png" alt="">
                  <span>QQ</span>
                </div>
              </div>
              <div class="down-item">
                <div class="down-item-wrapper">
                  <img src="./asset/WeChat.png" alt="">
                  <span>WeChat</span>
                </div>
              </div>
              <div class="down-item">
                <div class="down-item-wrapper">
                  <img src="./asset/GitHub.png" alt="">
                  <span>GitHub</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.body {
    background: rgb(244, 241, 249);
    background-image: url(./asset/grid.svg);
    background-repeat: repeat;
    background-size: 300px 300px;
}

.nav {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%);
    .nav-wrapper {
        box-sizing: border-box;
        border-radius: 10px;
        background-color: #fff;
        display: flex;
        justify-content: flex-start;
        .nav-item {
            color: #9e9e9e;
            padding: 10px 30px;
            cursor: pointer;
            font-weight: 800;
            position: relative;
            display: inline-block;
            &:hover {
                animation: jump 0.3s ease-in-out;
                .nav-drop-down-wrapper {
                    display: block;
                    opacity: 0;
                    animation: show 0.4s ease-in-out;
                    animation-delay: 0.1s;
                    animation-fill-mode: forwards;
                }
            }
            .alink {
                border: 2px solid transparent;
                color: #9e9e9e;
                text-decoration: none;
                display: flex;
                flex-wrap: nowrap;
                padding: 10px 20px;
                img {
                    width: 20px;
                    height: 20px;
                    vertical-align: middle;
                }
                &:hover {
                    border-radius: 10px;
                    background-color: #ffddef;
                    border: 2px solid rgb(241, 203, 224);
                }

            }
            .nav-drop-down-wrapper {
                padding-top: 23px;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                display: none;
                .nav-drop-down {
                    min-width: 150px;
                    background-color: #fff;
                    border-radius: 10px;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    .down-item {
                        margin: 10px 0;
                        box-sizing: border-box;
                        width: 90%;
                        border-radius: 10px;
                        &:hover {
                            background-color: rgb(255, 229, 241);
                            color: #727272;
                        }
                        .down-item-wrapper {
                            padding: 10px 0 10px 27px;
                            img {
                                width: 20px;
                                height: 20px;
                                vertical-align: middle;
                            }
                            span {
                                vertical-align: middle;
                            }
                        }
                    }
                }
            }
        }
    }
}

@keyframes jump {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-5px);
    }
    100% {
        transform: translateY(0px);
    }
}

@keyframes show {
    0% {
        transform: translate(-50%, -5px);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -0px);
        opacity: 1;
    }
}
</style>