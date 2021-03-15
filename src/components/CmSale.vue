<template>
  <a-layout id="components-layout-demo-fixed">
    <a-layout-content >
      <div :style="{ background: '#fff', padding: '4px', minHeight: '480px' }">
        <cm-sale-content />
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script>
import CmSaleContent from './CmSaleContent.vue'


export default {
  components:{
    CmSaleContent
  },
  data(){
    return {

    }
  }
}
</script>

<style>
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
