<template>
  <div>
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
      <label class="psubtitle"> Card Save </label>
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
      <a-descriptions-item label="卡状态">
        {{ item.status }}
      </a-descriptions-item>
    </a-descriptions>

    <p /> -->

    <!-- 预存款操作 -->
    <!-- :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" -->
    <!-- :parser="value => value.replace(/\$\s?|(,*)/g, '')" -->
    <div class="mainpart">
      <div class="money">
        <br />
        <a-row>
          <a-col class="ph" :span="7">
            <label>填写预存款金额（元）</label>
          </a-col>
          <a-col class="in" :span="7">
            <a-input-number
              size="large"
              default-value=0
              :style="{ width: '80%' }"
              :value="addAmount"
              :min="0"
              :max="9999"
              :step="10"
              @change="inputChange"
            />
          </a-col>
          <a-col class="submit" :span="8">
            <a-button
              type="primary"
              class="btn"
              size="large"
              :style="{ width: '50%'}"
              @click="submit"
              :loading="loading"
            >
              提交
            </a-button>
          </a-col>
        </a-row>
      </div>
      <!-- <div class="submit"></div> -->
    </div>

    <!-- <p>输入预存款的金额</p>
    <a-input-number
      :default-value="0"
      :style="{ width: '400px' }"
      :value="addAmount"
      @change="inputChange"
    />
    <p />
    <a-button @click="submit"> 提交 </a-button> -->
  </div>
</template>

<script src='@/script/cm-save.js' />

<style scoped src="@/style/cm-save.css" />