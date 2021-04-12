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
              <!-- select -->
              <a-select 
                :style="{width:'120px'}"
                v-model="searchKey"
                @change="searchCard"
                :default-value="searchTags[0].key"
              >
                <a-select-option 
                  :value="item.key"
                  :key="item.key"
                  v-for="item in searchTags">
                  {{item.text}}
                </a-select-option>
              </a-select>
              <a-input-search 
                :style="{width:'120px', inline:true}"
                v-model="searchValue"
                
              >

              </a-input-search>
              
                <!-- table -->
                <a-table :columns="columns" :data-source="listData" rowKey="cid">
                  
                  <template slot="operation" slot-scope="text, record, index">
                    <div class="editable-row-operations">
                      <span>
                          <a @click="cardSelectHandle(text, record, index)">查看</a>
                      </span>
                    </div>
                  </template>

                </a-table>


            </a-col>
          </a-row>
          
    </a-layout-content >

        
    <a-layout-footer  :style="{width:'100%', textAlign: 'center', position:'fixed',bottom:0 }">
          NMMS ©2021 Created by FF7518
    </a-layout-footer>
    
</a-layout>
</template>

<script>

// 设置会员卡表表头
const columns = [
  {title:'卡号', dataIndex:'cid', key: 'cid', scopedSlots:{customRender:'cid'}},
  {title:'余额', dataIndex:'amount', key:'amount', scopedSlots:{customRender:'amount'}},
  {title:'折扣', dataIndex:'discount', key:'discount', scopedSlots:{customRender:'discount'}},
  {title:'种类', dataIndex:'type', key:'type', scopedSlots:{customRender:'type'}},
  {title:'操作', dataIndex:'operation', scopedSlots:{customRender:'operation'}},
]

var listData = []


export default {
  data() {
    return {
      columns,
      listData: listData,
      AllData: null,
      pagination: {
        onChange: page => {
          console.log(page)
        },
        pageSize: 6,
      },
      searchTags: [
        {
          key: '2',
          text: '折扣卡'
        },
        {
          key: '1',
          text: '储值卡'
        }
      ],
      searchKey: '',
      searchValue: "",
    };
  },
  created() {
    this.getCardInfo()
  },
  methods: {
    searchCard(value) {
      // console.log('searchCard',value)
      
      this.listData = this.AllData.filter(record => {
          return record['type'].toString().match(value)
      })
    },
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
            cid: response.data[i]['cid'],
            amount: response.data[i]['amount'],
            discount: response.data[i]['discount'],
            type: response.data[i]['type']
          });
        }
        console.log(this.listData)
        this.AllData = this.listData
      })
    },
    cardSelectHandle(text, record, index) {
      console.log(text, record, index)
    }
  }
};
</script>
