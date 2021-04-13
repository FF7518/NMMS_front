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
                <a-table 
                  :columns="columns" 
                  :data-source="listData" 
                  rowKey="cid"
                  :customRow="cardSelect"
                >
                  
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

<script src='@/script/card-manage.js' />