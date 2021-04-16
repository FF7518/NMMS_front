<template>
  <a-layout id="components-layout-demo-side" style="height: 100%">
    <a-layout-sider v-model="collapsed" collapsible theme="dark">
      <div class="logo" />
      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="credit-card" />
            <span>会员卡管理</span>
          </span>
          <a-menu-item key="10">
            <span>会员卡查询</span>
            <router-link to="/dashboard/cardmanage"></router-link>
          </a-menu-item>
          <a-menu-item key="11">
            <span>售卡管理</span>
            <router-link to="/dashboard/cardsale"></router-link>
          </a-menu-item>
          <a-menu-item key="12">
            <span>卡片禁用/挂失/销毁</span>
            <router-link to="/dashboard/cardban"></router-link>
          </a-menu-item>
          <a-menu-item key="13">
            <span>存款管理</span>
            <router-link to="/dashboard/cardsave"></router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="2">
          <a-icon type="user" />
          <span>用户管理</span>
          <router-link to="/dashboard/membermanage"></router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="bar-chart" />
          <span>消费管理</span>
          <router-link to="/dashboard/financialmanage"></router-link>
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="home" />
          <span>回到主界面</span>
          <router-link to="/dashboard/mainpage"></router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="setting" />
          <span>系统管理</span>
          <router-link to="/admin"></router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <!-- 此处可以调整页面高度 -->
    <a-layout :style="{ height: '150vh' }">
      <!-- <a-layout-header style="background: #fff; padding: 0" /> -->
      <a-layout-content style="margin: 8px 8px">
        <!-- <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>A breadcrumb item 1</a-breadcrumb-item>
          <a-breadcrumb-item>A breadcrumb item 2</a-breadcrumb-item>
        </a-breadcrumb> -->
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '100%' }"
        >
          <!-- <card-sale /> -->
          <div id="content">
            <router-view />
          </div>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center" id="layout-footer">
        游泳馆会员管理系统NMMS ©2021 Created by FF7518
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script src="@/script/dashboard.js" />

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

#layout-footer {
  height: 10vh;
  font-size: 18px;
}

#content {
  min-height: 70vh;
  max-height: 70vh;
  align-content: center;
}
</style>