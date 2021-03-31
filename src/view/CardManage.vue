<template>
<a-layout>
    <a-menu mode="horizontal" 
    :style="{ lineHeight: '64px' }"
    >
      <a-menu-item key="back"> <a-icon type="rollback" />回到工作台<router-link to="/dashboard"></router-link> </a-menu-item>
      <a-menu-item key="sale">售卡管理<router-link to="/cardmanage/cardsale"></router-link></a-menu-item>
      <a-menu-item key="ban">卡片禁用/挂失/销毁<router-link to="/cardmanage/cardban"></router-link></a-menu-item>
      <a-menu-item key="save">存款管理<router-link to="/cardmanage/cardsave"></router-link></a-menu-item>
    </a-menu>
    <a-layout-content :style="{padding: '12px', margin: '12px', background: '#ffffff' }">
          <a-row>
            <a-col :span="12" >
              <router-view />
            </a-col>
            <a-col :span="10" :style="{padding: '4px', margin: '4px'}" >
              <a-select :style="{width:'120px'}">
                <a-select-option value="lucy">lucy</a-select-option>
                
              </a-select>
              <a-input-search :style="{width:'120px', inline:true}">

              </a-input-search>
              <a-list size="small" :pagination="pagination" :data-source="listData">
                <div slot="footer"><b>ant design vue</b> footer part</div>
                <a-list-item slot="renderItem" key="item.title" slot-scope="item">
                  <a slot="actions" @click="onListMore">more</a>
                  <a-list-item-meta :description="item.description">
                    <a slot="title" :href="item.href">{{ item.title }}</a>
                    <!-- <a-avatar slot="avatar" :src="item.avatar" /> -->
                  </a-list-item-meta>
                  <div>{{ item.content }}</div>
                </a-list-item>
              </a-list>
            </a-col>
          </a-row>
          
    </a-layout-content >

        
    <a-layout-footer  :style="{width:'100%', textAlign: 'center', position:'fixed',bottom:0 }">
          NMMS ©2021 Created by FF7518
    </a-layout-footer>
    
</a-layout>
</template>

<script>

var listData = []


export default {
  data() {
    return {
      listData: listData,
      pagination: {
        onChange: page => {
          console.log(page)
        },
        pageSize: 6,
      },
    };
  },
  created() {
    this.getCardInfo()
  },
  methods: {
    onListMore() {
      alert("你点击了！！")
    },
    getCardInfo() {
      this.baseAxios({
        method: 'get',
        url: '/card/get_card_info',
        // params

      }).then((response)=>{
        this.listData = []
        console.log(response.data.length)
        // 同步到列表
        var listLen = response.data.length
        for(var i = 0; i < listLen; ++i) {
          this.listData.push({
            // href: 'https://www.antdv.com/',
            title: `Item  ${i+1}`,
            // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description:
              '信息',
            content:
              "卡号 "+response.data[i]['cid']+" 金额 "+response.data[i]['amount'],
          });
        }
        console.log(this.listData)
      })
    }
  }
};
</script>
