<template>
  <div>
    <!-- <img src="@/static/image/1.jpg" :style="{ width:'100%',height:'100%'}" /> -->
    <div class="login-box">
      <!-- <h2>Admin Login</h2> -->
      <h2>系统管理员登录</h2>
      <form>
        <div class="user-box">
          <input
            v-model="username"
            type="text"
            name=""
            required=""
            @input="onUsernameInputChange"
          />
          <label>Username</label>
        </div>
        <div class="user-box">
          <input
            v-model="password"
            type="password"
            name=""
            required=""
            @input="onPasswordInputChange"
          />
          <label>Password</label>
        </div>
        <a @click="submit">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          LOGIN
        </a>
      </form>
    </div>
  </div>
</template>

<script src="@/script/login.js" />

<style scoped src="@/style/login.css" />