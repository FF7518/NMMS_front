<template>
  <div>
    <a-menu mode="horizontal"
    >
      <a-menu-item key="back"> <a-icon type="rollback" />回到工作台<router-link to="/dashboard"></router-link> </a-menu-item>
      <a-menu-item key="sale">售卡管理<router-link to="/cardmanage/cardsale"></router-link></a-menu-item>
      <a-menu-item key="ban">卡片禁用<router-link to="/cardmanage/cardban"></router-link></a-menu-item>
      <a-menu-item key="refund">挂失/退还卡</a-menu-item>
      <a-menu-item key="save">存款管理</a-menu-item>
    </a-menu>
    <a-layout>
      <!-- <a-row type="flex">
        <a-col flex="auto">
          <router-view />
        </a-col>
        <a-col flex="auto">
          <cm-sale-display />
        </a-col>
      </a-row> -->
      <a-layout-content >
        <router-view />
      </a-layout-content >


      <a-layout-footer :style="{ textAlign: 'center' }">
        NMMS ©2021 Created by FF7518
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script>

export default {
  data() {
    return {
    };
  },
};
</script>
