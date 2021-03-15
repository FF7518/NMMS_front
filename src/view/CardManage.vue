<template>
  <div>
    <a-menu mode="horizontal">
      <a-menu-item key="back"> <a-icon type="rollback" />Go Back<router-link to="/dashboard"></router-link> </a-menu-item>
      <a-menu-item key="sale"> sale<router-link to="/cardmanage/cardsale"></router-link></a-menu-item>
      <a-menu-item key="ban"> ban<router-link to="/cardmanage/cardban"></router-link></a-menu-item>
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
