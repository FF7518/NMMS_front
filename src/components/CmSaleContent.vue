<template>
<div>
  <a-button @click="onAddButtonClick">
    新建卡片
  </a-button>

  <a-collapse :bordered="false" expand-icon=" " >
    <a-collapse-panel :disabled="isPanelOpen">
      <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" >
        <a-form-model-item label="请输入卡号">
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

        <a-form-model-item label="请输入充值金额">
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

        <a-form-model-item label="请输入折扣">
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

        <a-form-model-item label="请输入持卡人姓名">
          <a-input :style="{ width: '24%' }" v-model="form.name" />
        </a-form-model-item>

        <a-form-model-item label="请输入持卡人电话">
          <a-input :style="{ width: '24%' }" v-model="form.phonenumber" />
        </a-form-model-item>

        <a-form-model-item label="请输入持卡人身份证号">
          <a-input :style="{ width: '24%' }" v-model="form.identity" />
        </a-form-model-item>

        <a-divider />

        
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">
            Create
          </a-button>
          <a-button style="margin-left: 10px;">
            Cancel
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-collapse-panel>
  </a-collapse>

  <!-- 反馈区域 -->
  <a-list
    class="demo-loadmore-list"
    :loading="loading"
    item-layout="horizontal"
    :data-source="data"
  >
    <div
      v-if="showLoadingMore"
      slot="loadMore"
      :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
    >
      <a-spin v-if="loadingMore" />
      <a-button v-else @click="onLoadMore">
        loading more
      </a-button>
    </div>
    <a-list-item slot="renderItem" slot-scope="item">
      <a slot="actions">edit</a>
      <a slot="actions">more</a>
      <a-list-item-meta
        description="Ant Design"
      >
        <a slot="title" href="https://www.antdv.com/">{{ item.name.last }}</a>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </a-list-item-meta>
      <div>content</div>
    </a-list-item>
  </a-list>
</div>
</template>

<script>
import reqwest from 'reqwest';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

export default {
  data() {
    return {
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

      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
    };
  },
  mounted() {
    this.getData(res => {
      this.loading = false;
      this.data = res.results;
    });
  },
  methods: {
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
    onAddButtonClick() {
      if(this.isPanelOpen == true) {
        this.isPanelOpen = false
      } else {
        this.isPanelOpen = true
      }
    },
    onDiscountChange(e) {
      console.log(e)
    },
    onAmountChange(e) {
      console.log(e)
    },
    getData(callback) {
      reqwest({
        url: fakeDataUrl,
        type: 'json',
        method: 'get',
        contentType: 'application/json',
        success: res => {
          callback(res);
        },
      });
    },
    onLoadMore() {
      this.loadingMore = true;
      this.getData(res => {
        this.data = this.data.concat(res.results);
        this.loadingMore = false;
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'));
        });
      });
    },
  },
};
</script>

<style lang="css" scoped>
.demo-loadmore-list {
  margin: 10%;
}
</style>