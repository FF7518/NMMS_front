<template>
  <div>
    <div id="first">
      <span style="font-size: 18px">展开搜索</span>
    </div>
    <div id="second">
      <!-- <a-collapse :bordered="false">
        <template #expandIcon="props">
          <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
        </template>
        <a-collapse-panel> -->
      <div id="ctrlPanel">
        <a-select
          placeholder="记录类型"
          size="small"
          :style="{ width: '160px' }"
        >
          <a-select-option value="out">支出</a-select-option>
          <a-select-option value="in"> 存款 </a-select-option>
          <a-select-option value="all"> 全部 </a-select-option>
        </a-select>
        <a-select
          placeholder="按会员查找"
          :style="{ width: '120px' }"
          size="small"
        >
          <a-select-option value="phonenumber"> 电话 </a-select-option>
          <a-select-option value="identity"> 身份证 </a-select-option>
          <a-select-option value="name"> 姓名 </a-select-option>
        </a-select>
        <a-input-search
          size="small"
          :style="{ width: '160px' }"
          placeholder="请输入会员信息"
          enter-button
        />
        <a-button size="small" icon="file-excel"> 导出报表</a-button>
        <a-button size="small" icon="dashboard"> 查看汇总</a-button>
        <a-button size="small" icon="mail"> 发送邮件</a-button>
        <a-button size="small" icon="compass" > 等等功能 </a-button>
        <p />
        <a-input-search
          size="small"
          :style="{ width: '160px' }"
          placeholder="请输入卡号"
          enter-button
        ></a-input-search>
        <a-select
          mode="multiple"
          placeholder="按卡查找"
          :style="{ width: '480px' }"
          size="small"
        >
          <a-select-opt-group>
            <span slot="label"><a-icon type="tag" />卡类型</span>
            <a-select-option value="type_1"> 储值卡 </a-select-option>
            <a-select-option value="type_2"> 折扣卡 </a-select-option>
          </a-select-opt-group>
          <a-select-opt-group>
            <span slot="label"><a-icon type="tag" />卡状态</span>
            <a-select-option value="status_normal"> 正常 </a-select-option>
            <a-select-option value="status_lost"> 挂失 </a-select-option>
            <a-select-option value="status_deactived"> 停用 </a-select-option>
            <a-select-option value="status_deleted"> 退还 </a-select-option>
          </a-select-opt-group>
        </a-select>

        <a-range-picker size="small" :placeholder="['开始日期', '结束日期']" />
      </div>
      <!-- </a-collapse-panel>
      </a-collapse> -->

      <a-table
        :columns="columns"
        :data-source="depositList"
        rowKey="deposit_id"
        :scroll="{ y: '48vh' }"
      >
      </a-table>
    </div>
  </div>
</template>


<script src="@/script/financial-manage.js" />

<style scoped src="@/style/financial-manage.css" />