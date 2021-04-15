<template>
  <div>
    <div class="cm-sale-words">
      <p>请输入卡号</p>
    </div>
    <!-- 查询获取相关的表 -->
    <a-select
      style="width: 200px"
      placeholder="输入卡号"
      show-search
      :value="searchValue"
      :default-active-first-option="false"
      :show-arrow="false"
      :not-found-content="null"
      @change="handleChange"
      @search="handleSearch"
    >
      <a-select-option v-for="d in searchList" :key="d.cid">
        {{ d.cid }}
      </a-select-option>
    </a-select>

    <a-descriptions title="会员卡信息">
      <a-descriptions-item label="卡号">
        {{ item.cid }}
      </a-descriptions-item>
      <a-descriptions-item label="卡内余额">
        {{ item.amount }}
      </a-descriptions-item>
      <a-descriptions-item label="卡状态">
        {{ item.status }}
      </a-descriptions-item>
    </a-descriptions>

    <p />

    <!-- 预存款操作 -->
    <!-- :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" -->
    <!-- :parser="value => value.replace(/\$\s?|(,*)/g, '')" -->
    <p>输入预存款的金额</p>
    <a-input-number
      :default-value="0"
      :style="{ width: '400px' }"
      :value="addAmount"
      @change="inputChange"
    />
    <p />
    <a-button @click="submit"> 提交 </a-button>
  </div>
</template>

<script src='@/script/cm-save.js' />

<style scoped>
.cm-sale-words {
  font-size: 18px;
}
</style>