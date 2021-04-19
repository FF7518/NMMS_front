<template>
  <div>
    <div id="first"></div>
    <div id="second">
      <!-- <a-collapse :bordered="false">
        <template #expandIcon="props">
          <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
        </template>
        <a-collapse-panel> -->
      <div id="ctrlPanel">
        <label>充值/消费</label>
        <a-select
          placeholder="记录类型"
          size="small"
          :style="{ width: '160px' }"
          v-model="searchKeys.deposit_type"
          @change="this.groupSearch"
        >
          <a-select-option value="1">消费</a-select-option>
          <a-select-option value="0"> 充值 </a-select-option>
          <a-select-option value="all"> 全部 </a-select-option>
        </a-select>
        <label>会员类型</label>
        <a-select
          placeholder="按会员查找"
          :style="{ width: '10%' }"
          size="small"
          v-model="searchKeys.member.byMemberType"
        >
          <a-select-option value="phonenumber"> 电话 </a-select-option>
          <!-- <a-select-option value="identity"> 身份证 </a-select-option> -->
          <a-select-option value="name"> 姓名 </a-select-option>
        </a-select>
        <a-input-search
          size="small"
          :style="{ width: '160px' }"
          placeholder="请输入会员信息"
          v-model="searchKeys.member.memberInfo"
          @change="this.groupSearch"
          enter-button
        />
        <p />
        <label>卡号</label>
        <a-input-search
          size="small"
          :style="{ width: '160px' }"
          placeholder="请输入卡号"
          v-model="searchKeys.cid"
          @change="this.groupSearch"
          enter-button
        ></a-input-search>
        <label>卡类型</label>
        <a-select
          mode="tags"
          placeholder="按卡类型"
          :style="{ width: '200px' }"
          size="small"
          @change="
            (value) => {
              this.onTagTypeSelectorChange(value);
              this.groupSearch();
            }
          "
        >
          <a-select-opt-group>
            <span slot="label"><a-icon type="tag" />卡类型</span>
            <a-select-option value="1"> 储值卡 </a-select-option>
            <a-select-option value="2"> 折扣卡 </a-select-option>
          </a-select-opt-group>
        </a-select>
        <label>卡状态</label>
        <a-select
          mode="tags"
          placeholder="按卡状态"
          :style="{ width: '300px' }"
          size="small"
          @change="
            (value) => {
              this.onTagStatusSelectorChange(value);
              this.groupSearch();
            }
          "
        >
          <a-select-opt-group>
            <span slot="label"><a-icon type="tag" />卡状态</span>
            <a-select-option value="normal"> 正常 </a-select-option>
            <a-select-option value="lost"> 挂失 </a-select-option>
            <a-select-option value="deactived"> 停用 </a-select-option>
            <a-select-option value="deleted"> 退还 </a-select-option>
          </a-select-opt-group>
        </a-select>
        <p />
        <label>时间</label>
        <a-range-picker
          size="small"
          :placeholder="['开始日期', '结束日期']"
          @change="
            (date, dateString) => {
              onDateRangePickerChange(date, dateString);
              groupSearch();
            }
          "
        />
        <a-button size="small" icon="file-excel" @click="onExport2Excel"> 导出报表</a-button>
        <a-button size="small" icon="dashboard"> 查看汇总</a-button>
        <a-button size="small" icon="mail"> 发送邮件</a-button>
        <a-button size="small" icon="compass"> 等等功能 </a-button>
      </div>
      <!-- </a-collapse-panel>
      </a-collapse> -->
      <a-tabs default-active-key="1" size="small">
        <a-tab-pane key="0">
          <span slot="tab">
            <a-icon type="appstore" />
            总览
          </span>
          <div>爬</div>
        </a-tab-pane>
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon type="table" />
            表格
          </span>
          <a-table
            :pagination="pagination"
            :columns="columns"
            :data-source="displayList"
            rowKey="deposit_id"
          >
            <!-- :scroll="{ y: '48vh' }" -->
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <a-icon type="pie-chart" />
            图表
          </span>
          <div id="chart-tab">
            <div id="myChart"></div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>


<script src="@/script/financial-manage.js" />

<style scoped src="@/style/financial-manage.css" />