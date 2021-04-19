<template>
  <div>
    <nav>
      <div class="menubar">
        <router-link to="/home" class="home">NMMS</router-link>
        <!-- <router-link to="/dashboard" class="home">测试</router-link> -->
        <div class="icons">
          <div class="secondary-icons">
            <i class="icon-second">
              <router-link to="/home/login">
              <img
                src="https://rafaelavlucas.github.io/assets/icons/gray1/icon-171.svg"
              />
              </router-link>
            </i>
            <i class="icon-second"
              ><img
                src="https://rafaelavlucas.github.io/assets/icons/gray1/icon-198.svg"
            /></i>
            <i class="icon-second"
              ><img
                src="https://rafaelavlucas.github.io/assets/icons/gray1/icon-178.svg"
            /></i>
          </div>

          <i class="icon-menu" ref="iconMenu"><span></span></i>
        </div>
      </div>
      <ul class="menu" ref="menu">
        <li class="menu-link"><a href="#0" class="text-item">About</a></li>
        <li class="menu-link sub" ref="menuLink">
          <a href="#0" class="text-item">Clients<span class="icon"></span></a>
          <ul class="submenu">
            <li class="sub-item"><a href="#0">Burger King</a></li>
            <li class="sub-item"><a href="#0">Southwest Airlines</a></li>
            <li class="sub-item"><a href="#0">Levi Strauss</a></li>
          </ul>
        </li>
        <li class="menu-link sub" ref="menuLink">
          <a href="#0" class="text-item">Services<span class="icon"></span></a>
          <ul class="submenu">
            <li class="sub-item"><a href="#0">Print Design</a></li>
            <li class="sub-item"><a href="#0">Web Design</a></li>
            <li class="sub-item"><a href="#0">Mobile App Development</a></li>
          </ul>
        </li>
        <li class="menu-link"><a href="#0" class="text-item">Contact</a></li>
      </ul>
    </nav>
    <!-- Content -->
    <router-view />
  </div>
</template>


<script src="@/script/home.js" />

<style src="@/style/home.css" />