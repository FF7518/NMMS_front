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
      @change="handleChange"
      @search="handleSearch"
    >
      <a-select-option v-for="d in searchList" :key="d.cid">
        {{ d.cid }}
      </a-select-option>
    </a-select>

    <!-- 显示表的相关信息 -->
    <a-descriptions title="会员卡信息">
      <a-descriptions-item label="卡号">
        {{ item.cid }}
      </a-descriptions-item>
      <a-descriptions-item label="卡内余额">
        {{ item.amount }}
      </a-descriptions-item>
      <a-descriptions-item label="卡类型">
        {{ item.type }}
      </a-descriptions-item>
      <a-descriptions-item label="卡折扣">
        {{ item.discount }}
      </a-descriptions-item>
      <a-descriptions-item label="卡状态">
        {{ item.status }}
      </a-descriptions-item>
    </a-descriptions>

    <!-- Ban的主要结构 -->
    <div>
      <!-- 只写default-value没有用的话，再加个key -->
      <a-select
        :style="{ width: '120px' }"
        v-model="item.status"
        :key="this.item.status"
        :default-value="this.item.status"
      >
        <a-select-option value="normal" :disabled="isCardStatusDisabled">
          解禁
        </a-select-option>
        <a-select-option value="lost"> 挂失 </a-select-option>
        <a-select-option value="deactived"> 停用 </a-select-option>
        <a-select-option value="deleted"> 退卡 </a-select-option>
      </a-select>
      <br />
      操作备注：
      <br />
      <a-textarea
        :style="{ width: '60%', inline: true }"
        placeholder="填写备注"
        :rows="3"
        v-model="item.message"
      />
      <br />
      <a-button :style="{}" @click="submit"> 提交 </a-button>
    </div>
  </div>
</template>

<script src='@/script/cm-ban.js'/>

<style scoped>
.cm-sale-words {
  font-size: 18px;
}
</style>