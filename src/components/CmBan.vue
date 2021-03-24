<template>
<div>

  <!-- 查询获取相关的表 -->
  <a-select
    style="width: 200px"
    placeholder="查询卡号"
  >
  </a-select>

  <!-- 显示表的相关信息 -->
  <a-descriptions title="会员卡信息">
    <a-descriptions-item label="卡号">
      12345
    </a-descriptions-item>
    <a-descriptions-item label="卡内余额">
      385.24
    </a-descriptions-item>
    <a-descriptions-item label="卡类型">
      折扣卡
    </a-descriptions-item>
    <a-descriptions-item label="卡折扣">
      80%
    </a-descriptions-item>
    <a-descriptions-item label="卡状态">
      正常
    </a-descriptions-item>
  </a-descriptions>

  <!-- Ban的主要结构 -->
  <div>
    <a-select placehoder="选择停用类型" 
    :style="{width:'120px', inline: true}">
      <a-select-option value="guashi">挂失</a-select-option>
      <a-select-option value="tingyong">停用</a-select-option>
    </a-select>
    <br>
    停用原因：
    <br>
    <a-textarea 
    :style="{width:'60%', inline:true}"
    placeholder="Basic usage" :rows="4" />
    <br>
    <a-button :style="{}">提交</a-button>
  </div>


</div>
</template>