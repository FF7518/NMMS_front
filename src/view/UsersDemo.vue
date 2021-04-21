<template>
  <a-layout id="components-layout-demo-fixed">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <!-- <div class="logo" /> -->
      <router-link to="/home">
        <a-button ghost type="link" :style="{ width: '120px' }" size="large">
          <a-icon type="rollback" />
          返回
        </a-button>
      </router-link>
      <span :style="{ marginLeft: '80px', color: '#fff', fontSize: '16px' }">
        模拟用户用自己的会员卡进行充值/消费的操作
      </span>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <div class="main">
        <a-row align="top" type="flex">
          <a-col :span="12"> 卡号 </a-col>
          <a-col :span="12">
            <a-input
              @blur="onCidBlur"
              v-model="form.cid"
              :style="{ width: '80%' }"
              size="large"
            ></a-input>
          </a-col>
        </a-row>
        <br /><br /><br />
        <a-row align="top" type="flex">
          <a-col :span="12"> 使用金额（+：充值， -消费） </a-col>
          <a-col :span="12">
            <a-input
              @keyup.enter="submit"
              @blur="onMoneyBlur"
              v-model="form.money"
              :style="{ width: '80%' }"
              size="large"
            ></a-input>
          </a-col>
        </a-row>
        <br /><br /><br />
        <a-row align="top" type="flex">
          <a-col :span="12"> 剩余金额 </a-col>
          <a-col :span="12">
            <a-input
              id="input-amount"
              class="input-amount_red"
              disabled
              v-model="form.amount"
              :style="{ width: '80%' }"
              size="large"
            ></a-input>
          </a-col>
        </a-row>
        <br /><br /><br />
        <a-row align="top" type="flex">
          <a-col :span="24">
            <a-button
              @click="submit"
              block
              :style="{ width: '70%' }"
              size="large"
              type="primary"
            >
              Submit!
            </a-button>
          </a-col>
        </a-row>
        <br />
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center', fontSize: '22px' }">
      NMMS Users Demo ©2021 Powered by FF7518
    </a-layout-footer>
  </a-layout>
</template>

<script src="@/script/users-demo.js" />

<style scoped>
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}

.main {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 20px;
  height: 80vh;
  background: #fff;
  padding: 24px;
  min-height: 380px;
  margin: 24px;
  text-align: center;
}

.input-amount_nor {
  /* color: rgb(255, 0, 0); */
  transition: all 1s;
}

@keyframes blink {
  0% {
  }
  50% {
    color: rgb(255, 0, 0);
  }
  100% {
  }
}

.input-amount_red {
  /* color: rgb(255, 0, 0); */
  /* font-size: 20px; */
  transition: all 1s;
  animation: blink 2s infinite;
}
</style>
