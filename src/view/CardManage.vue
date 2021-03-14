<template>
  <div>
    <a-menu mode="horizontal">
      <a-menu-item key="back"> <a-icon type="rollback" />Go Back<router-link :to="{path: '/dashboard'}"></router-link> </a-menu-item>
      <a-menu-item key="sale"> sale<router-link :to="{path: '/cardsale'}"></router-link></a-menu-item>
      <a-menu-item key="ban"> ban<router-link :to="{path: '/cardban'}"></router-link></a-menu-item>
      <a-menu-item key="refund"> refund</a-menu-item>
      <a-menu-item key="save"> save</a-menu-item>
    </a-menu>
    <router-view />
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
