<template>
  <a-row :style="{ padding: '12px', margin: '12px', background: '#ffffff' }">
    <!-- select -->
    <a-select
      :style="{ width: '120px' }"
      v-model="searchKey"
      @change="searchCard"
      :default-value="searchTags[0].key"
    >
      <a-select-option
        :value="item.key"
        :key="item.key"
        v-for="item in searchTags"
      >
        {{ item.text }}
      </a-select-option>
    </a-select>
    <a-input-search
      :style="{ width: '120px', inline: true }"
      placeholder="输入卡号"
      v-model="searchValue"
      @change="this.inputSearchCard"
    >
    </a-input-search>

    <!-- table -->
    <a-table
      :scroll="{ y: '50vh' }"
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

    <!-- drawer -->
    <a-drawer
      :title="drawerTitle"
      width="480"
      placement="right"
      :closeable="false"
      :visible="isDrawerVisible"
      :after-visible-change="afterDrawerVisibleChange"
      @close="onDrawerClose"
    >
      <!-- <a-divider /> -->
      <a-input-group>
        <a-row :gutter="8">
          <a-col :span="2">
            <span>卡号</span>
          </a-col>
          <a-col :span="5">
            <a-input default-value="001" />
          </a-col>
          <a-col :span="2">
            <span>类型</span>
          </a-col>
          <a-col :span="8">
            <a-select style="width: 200px">
              <a-select-option value="1"> 储值卡 </a-select-option>
              <a-select-option value="2"> 折扣卡 </a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <br />
        <a-row :gutter="8">
          <a-col :span="2">
            <span>余额</span>
          </a-col>
          <a-col :span="5">
            <a-input default-value="20" />
          </a-col>
          <a-col :span="2">
            <span>折扣</span>
          </a-col>
          <a-col :span="5">
            <a-input> </a-input>
          </a-col>
        </a-row>
        <a-divider />
        <a-row>
          持卡人信息
        </a-row>
        <br />
        <a-row :gutter="8">
          <a-col :span="2">
            <span>姓名</span>
          </a-col>
          <a-col :span="6">
            <a-input />
          </a-col>
          <a-col :span="3">
            <span>身份证</span>
          </a-col>
          <a-col :span="10">
            <a-input> </a-input>
          </a-col>
        </a-row>
        <br />
        <a-row :gutter="8">
          <a-col :span="4">
            <span>联系方式</span>
          </a-col>
        </a-row>
        <br />
        <a-row :gutter="8">
          <a-col :span="10">
            <a-input />
          </a-col>
        </a-row>
      </a-input-group>
    </a-drawer>
  </a-row>
</template>

<script src='@/script/card-manage.js' />