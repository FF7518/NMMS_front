<template>
  <div class="panel">
    <a-row class="ctrl">
      <label class="ptitle"> 会员卡查询 </label>
      <label class="psubtitle">
        Natatorium Membership Management System | Card Inquiry Interface (Welcome!)
      </label>
    </a-row>
    <br />
    <a-row :style="{ background: '#ffffff' }">
      <label>输入卡号</label>
      <a-input-search
        :style="{ width: '200px', inline: true }"
        placeholder="输入卡号"
        v-model="searchValue"
        @change="this.groupSearch"
      >
      </a-input-search>
      <label>选择会员卡类型</label>
      <!-- select -->
      <a-select
        :style="{ width: '120px' }"
        v-model="searchKey"
        @change="groupSearch"
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

      <!-- table -->
      <!-- :scroll="{ y: '50vh' }" -->
      <a-table
        bordered
        :style="{ padding: '12px', marginLeft: '7vh', marginRight: '10vh' }"
        size="middle"
        :columns="columns"
        :data-source="listData"
        rowKey="cid"
        :customRow="cardSelect"
        :pagination="pagination"
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
        :title="'会员卡： ' + selectItem.cid"
        width="600"
        placement="right"
        :closeable="false"
        :visible="isDrawerVisible"
        :after-visible-change="afterDrawerVisibleChange"
        @close="onDrawerClose"
      >
        <!-- <a-divider /> -->
        <a-input-group>
          <a-row :gutter="8">
            <a-col :span="3">
              <span>卡号</span>
            </a-col>
            <a-col :span="5">
              <a-input default-value="" v-model="selectItem.cid" />
            </a-col>
            <a-col :span="3">
              <span>类型</span>
            </a-col>
            <a-col :span="8">
              <a-select style="width: 100%" v-model="selectItem.type">
                <a-select-option value="1"> 储值卡 </a-select-option>
                <a-select-option value="2"> 折扣卡 </a-select-option>
              </a-select>
            </a-col>
          </a-row>
          <br />
          <a-row :gutter="8">
            <a-col :span="3">
              <span>余额</span>
            </a-col>
            <a-col :span="5">
              <a-input default-value="" v-model="selectItem.amount" />
            </a-col>
            <a-col :span="3">
              <span>折扣</span>
            </a-col>
            <a-col :span="5">
              <a-input v-model="selectItem.discount"> </a-input>
            </a-col>
            <a-col :span="3">
              <span>状态</span>
            </a-col>
            <a-col :span="5">
              <a-select :style="{ width: '100%' }" :value="selectItem.status">
                <a-select-option value="normal"> 正常 </a-select-option>
                <a-select-option value="lost"> 挂失 </a-select-option>
                <a-select-option value="deactived"> 停用 </a-select-option>
                <a-select-option value="deleted" disabeld> 退还 </a-select-option>
              </a-select>
            </a-col>
          </a-row>
          <a-divider />
          <a-row> 持卡人信息 </a-row>
          <br />
          <a-row :gutter="8">
            <a-col :span="4">
              <span>姓名</span>
            </a-col>
            <a-col :span="6">
              <a-input v-model="selectMember.name" />
            </a-col>
          </a-row>
          <br />
          <a-row :gutter="8">
            <a-col :span="4">
              <span>身份证</span>
            </a-col>
            <a-col :span="10">
              <a-input v-model="selectMember.identity"> </a-input>
            </a-col>
          </a-row>
          <br />
          <a-row :gutter="8">
            <a-col :span="4">
              <span>联系方式</span>
            </a-col>
            <a-col :span="10">
              <a-input v-model="selectMember.phonenumber" />
            </a-col>
          </a-row>
          <a-divider />
          <p>使用记录</p>
          <a-table
            bordered
            size="small"
            :scroll="{ y: '50vh' }"
            :columns="selectRecordColumns"
            :data-source="selectRecord"
            rowKey="deposit_id"
          >
          </a-table>
        </a-input-group>
      </a-drawer>
    </a-row>
  </div>
</template>

<script src='@/script/card-manage.js' />

<style scoped>
.panel {
  background: rgb(255, 255, 255);
}

.ctrl {
  text-align: left;
  font-family: Apple LiSung Light, SimHei;
}

.ctrl .ptitle {
  color: rgba(147, 151, 199, 0.932);
  font-size: 22px;
}

.ctrl .psubtitle {
  color: #cd6fa3a1;
  font-size: 20px;
}
</style>