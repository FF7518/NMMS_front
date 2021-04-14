<template>
  <div id="cm-sale-content">
    <a-form-model
      :model="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      id="cm-sale-form"
      layout="vertical"
    >
      <a-form-model-item label="卡号">
        <a-input :style="{ width: '24%' }" v-model="form.cid" />
      </a-form-model-item>

      <a-form-model-item label="卡类型">
        <a-radio-group
          v-model="form.type"
          :default-value="'1'"
          @change="onCardtypeChange"
        >
          <a-radio :value="'1'"> 储值卡 </a-radio>
          <a-radio :value="'2'"> 折扣卡 </a-radio>
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item label="充值金额">
        <a-input-number
          :default-value="1000"
          @change="onAmountChange"
          :step="1"
          :min="0"
          :max="50000"
          :style="{ width: '20%' }"
          v-model="form.amount"
          defaultValue="0.00"
        />
      </a-form-model-item>

      <a-form-model-item label="折扣">
        <a-input-number
          :default-value="100"
          :min="0"
          :max="100"
          :formatter="(value) => `${value}%`"
          :parser="(value) => value.replace('%', '')"
          @change="onDiscountChange"
          v-model="form.discount"
          :disabled="isDiscountDisabled"
        />
      </a-form-model-item>

      <a-form-model-item label="持卡人身份证号">
        <a-input :style="{ width: '24%' }" v-model="form.identity" />
        <a-button>查询</a-button>
        <div id="feedback_id"></div>
      </a-form-model-item>
      <a-form-model-item label="持卡人姓名">
        <a-input :style="{ width: '24%' }" v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item label="持卡人电话">
        <a-input :style="{ width: '24%' }" v-model="form.phonenumber" />
      </a-form-model-item>

      <!-- <a-divider /> -->

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit"> Create </a-button>
        <a-button style="margin-left: 10px"> Cancel </a-button>
      </a-form-model-item>
    </a-form-model>

    <a-button @click="showDrawer">Test</a-button>

    <a-drawer
      title="会员卡信息"
      width="640"
      placement="right"
      :closable="false"
      :visible="isDrawerVisible"
      :after-visible-change="afterDrawerVisibleChange"
      @close="onDrawerClose"
    >
      <!-- List中的数据源是listData，作用域到下面的item里面 -->
      <a-list size="small" :pagination="pagination" :data-source="listData">
        <div slot="footer"><b>ant design vue</b> footer part</div>
        <a-list-item slot="renderItem" key="item.title" slot-scope="item">
          <a slot="actions" @click="onListMore">more</a>
          <a-list-item-meta :description="item.description">
            <a slot="title" :href="item.href">{{ item.title }}</a>
            <a-avatar slot="avatar" :src="item.avatar" />
          </a-list-item-meta>
          <div>{{ item.content }}</div>
        </a-list-item>
      </a-list>
    </a-drawer>

    <!-- 反馈区域 -->
  </div>
</template>

<script src='@/script/cm-sale.js' />

<style lang="css" scoped>
.demo-loadmore-list {
  margin: 10%;
}
</style>