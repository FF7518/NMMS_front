<template>
  <div>
    <nav>
      <div class="menubar">
        <a-tooltip placement="bottom">
          <template slot="title">
            <span>游泳馆会员卡管理系统</span>
          </template>
          <router-link to="/home" class="home">NMMS</router-link>
        </a-tooltip>
        <!-- <router-link to="/dashboard" class="home">测试</router-link> -->
        <div class="icons">
          <div class="secondary-icons">
            <i class="icon-second">
              <router-link to="/home/login">
                <a-tooltip placement="bottom">
                  <template slot="title">
                    <span>管理员登录</span>
                  </template>
                  <img
                    src="https://rafaelavlucas.github.io/assets/icons/gray1/icon-171.svg"
                /></a-tooltip>
              </router-link>
            </i>
            <i class="icon-second">
              <router-link to="/demo">
                <a-tooltip placement="bottom">
                  <template slot="title">
                    <span>模拟会员充值/消费操作</span>
                  </template>
                  <img
                    src="https://rafaelavlucas.github.io/assets/icons/gray1/icon-198.svg"
                /></a-tooltip>
              </router-link>
            </i>
            <!-- <i class="icon-second">
              <img
                src="https://rafaelavlucas.github.io/assets/icons/gray1/icon-178.svg"
              />
            </i> -->
          </div>
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>技术索引</span>
            </template>
            <i class="icon-menu" ref="iconMenu"><span></span></i>
          </a-tooltip>
        </div>
      </div>
      <ul class="menu" ref="menu">
        <li class="menu-link">
          <a href="https://cn.vuejs.org/" class="text-item">Vue</a>
        </li>
        <li class="menu-link sub" ref="menuLink">
          <a
            href="https://www.antdv.com/docs/vue/introduce-cn/"
            class="text-item"
          >
            Ant<br />Design
            <!-- <span class="icon"></span> -->
          </a>
          <!-- <ul class="submenu">
            <li class="sub-item"><a href="#0">Ant Design</a></li>
            <li class="sub-item"><a href="#0">Codepen</a></li>
            <li class="sub-item"><a href="#0">Levi Strauss</a></li>
          </ul> -->
        </li>
        <li class="menu-link sub" ref="menuLink">
          <a href="https://codepen.io/" class="text-item">
            Codepen
            <!-- <span class="icon"></span> -->
          </a>
          <!-- <ul class="submenu">
            <li class="sub-item"><a href="#0">Print Design</a></li>
            <li class="sub-item"><a href="#0">Web Design</a></li>
            <li class="sub-item"><a href="#0">Mobile App Development</a></li>
          </ul> -->
        </li>
        <li class="menu-link">
          <a href="http://www.axios-js.com/" class="text-item">Axios</a>
        </li>
      </ul>
    </nav>
    <!-- Content -->
    <router-view />
  </div>
</template>


<script src="@/script/home.js" />

<style src="@/style/home.css" />