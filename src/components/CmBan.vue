<template>
  <div class="main">
    <br />
    <div class="cm-sale-words">
      <label>请输入卡号</label>

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
      <label class="psubtitle">
        loss reporting / deactivation / lifting ban / card withdrawal business
      </label>
    </div>
    <br />
    <!-- 显示表的相关信息 -->
    <div class="desc">
      <a-row>
        <a-col :span="12">
          <label>卡号</label>
        </a-col>
        <a-col :span="12">
          <a-input
            disabled
            size="large"
            :style="{ width: '50%' }"
            v-model="item.cid"
          />
        </a-col>
      </a-row>
      <br />
      <a-row>
        <a-col :span="12">
          <label>消费余额</label>
        </a-col>
        <a-col :span="12">
          <a-input
            disabled
            size="large"
            :style="{ width: '50%' }"
            v-model="item.amount"
          />
        </a-col>
      </a-row>
      <br />
      <a-row>
        <a-col :span="12">
          <label>类型</label>
        </a-col>
        <a-col :span="12">
          <a-input
            disabled
            size="large"
            :style="{ width: '50%' }"
            v-model="item.pre_type"
          />
        </a-col>
      </a-row>
      <br />
      <a-row>
        <a-col :span="12">
          <label>折扣</label>
        </a-col>
        <a-col :span="12">
          <a-input
            disabled
            size="large"
            :style="{ width: '50%' }"
            v-model="item.pre_discount"
          />
        </a-col>
      </a-row>
      <br />
      <a-row>
        <a-col :span="12">
          <label>状态</label>
        </a-col>
        <a-col :span="12">
          <a-input
            disabled
            size="large"
            :style="{ width: '50%' }"
            :value="item.pre_status"
          />
        </a-col>
      </a-row>
    </div>
    <a-divider class="aDivider" orientation="left">操作</a-divider>
    <!-- <a-descriptions title="会员卡信息">
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
    </a-descriptions> -->

    <!-- Ban的主要结构 -->
    <div class="mainpart">
      <!-- 只写default-value没有用的话，再加个key -->
      <div class="selector">
        <a-button
          size="large"
          :disabled="isFreeBanButtonDisabled"
          @click="onFreeBanButtonClick"
        >
          点击 解禁
        </a-button>
        <a-button
          size="large"
          :disabled="isBanButtonDisabled"
          @click="onBanButtonClick"
        >
          点击 禁用
        </a-button>
        <a-select
          :disabled="isBanSeletorDisalbed"
          placeholder="选择禁用类型"
          size="large"
          :style="{ width: '180px' }"
          v-model="item.status"
          :key="this.item.status"
          :default-value="this.item.status"
          @change="onBanSeletorChange"
        >
          <a-select-option value="normal" disabled> 正常 </a-select-option>
          <a-select-option value="lost"> 挂失 </a-select-option>
          <a-select-option value="deactived"> 停用 </a-select-option>
          <a-select-option value="deleted"> 退卡 </a-select-option>
        </a-select>
      </div>
      <div class="reason">
        <br />
        <a-row>
          <a-col class="ph" :span="24">
            <label>填写或更改操作原因 </label>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-textarea
              class="txt"
              size="large"
              :style="{ width: '60%', inline: true }"
              placeholder="请输入(最大长度100字)"
              :rows="2"
              v-model="item.message"
              :auto-size="{ minRows: 2, maxRows: 2 }"
              :maxLength="100"
            />
          </a-col>
        </a-row>
      </div>
      <div class="submit">
        <a-button
          type="primary"
          class="btn"
          size="large"
          block
          :style="{}"
          @click="submit"
          :loading="loading"
        >
          提交
        </a-button>
      </div>
    </div>
  </div>
</template>

<script src='@/script/cm-ban.js'/>

<style scoped src="@/style/cm-ban.css" />