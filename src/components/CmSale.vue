<template>
<div >
  <a-form-model 
  :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" 
  >
        <a-form-model-item label="卡号">
          <a-input :style="{ width: '24%' }" v-model="form.cid" />
        </a-form-model-item>

        <a-form-model-item label="卡类型">
          <a-radio-group v-model="form.cardtype"
            :default-value="1"
            @change="onCardtypeChange"
          >
            <a-radio :value="1">
              储值卡
            </a-radio>
            <a-radio :value="2">
              折扣卡
            </a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item label="充值金额">
          <a-input-number
          :default-value="1000"
          :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
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
          :formatter="value => `${value}%`"
          :parser="value => value.replace('%', '')"
          @change="onDiscountChange"
          v-model="form.discount"
          :disabled="isDiscountDisabled"
            />
        </a-form-model-item>

        <a-form-model-item label="持卡人姓名">
          <a-input :style="{ width: '24%' }" v-model="form.name" />
          <a-button>查询是否存在</a-button>
        </a-form-model-item>
        <a-form-model-item label="持卡人电话">
          <a-input :style="{ width: '24%' }" v-model="form.phonenumber" />
        </a-form-model-item>

        <a-form-model-item label="持卡人身份证号">
          <a-input :style="{ width: '24%' }" v-model="form.identity" />
        </a-form-model-item>

        <!-- <a-divider /> -->

        
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">
            Create
          </a-button>
          <a-button style="margin-left: 10px;">
            Cancel
          </a-button>
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

<script>
import reqwest from 'reqwest';

const listData = []
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'description',
    content:
      'content',
  });
}

export default {
  data() {
    return {
      // form
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      isDiscountDisabled:true,
      isPanelOpen:true,
      form: {
        cid: '',
        amount: 0.00,
        discount:100,
        cardtype:1,
        name:'',
        phonenumber:'',
        identity:'',
      },
      // list
      listData: listData,
      // drawer
      isDrawerVisible: false,
      // list内部分页
      pagination: {
        onChange: page => {
          console.log(page)
        },
        pageSize: 10,
      },
      
    };
  },
  mounted() {
    
  },
  methods: {
    // 表单相关操作
    onSubmit() {
      console.log('submit!', this.form);
      alert(JSON.stringify(this.form))
    },
    onCardtypeChange(e) {
        // alert(e.target.value)
        if(e.target.value == 2) {
            this.isDiscountDisabled = false
        }
        else {
            this.isDiscountDisabled = true
        }
    },
    onDiscountChange(e) {
      console.log(e)
    },
    onAmountChange(e) {
      console.log(e)
    },
    
    // 抽屉 事件函数
    afterDrawerVisibleChange(val) {
      console.log('visible',val)
    },
    showDrawer(key) {
      this.isDrawerVisible = true
    },
    onDrawerClose() {
      this.isDrawerVisible = false
    },

    // List Item上的点击 more
    onListMore() {
      alert("你点击了！！")
    },
  },
};
</script>

<style lang="css" scoped>
.demo-loadmore-list {
  margin: 10%;
}
</style>