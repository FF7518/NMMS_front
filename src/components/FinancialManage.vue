<template>
  <div>
    <div id="first">
      <span>头部</span>
    </div>
    <div id="second">
      <a-table
        :columns="columns"
        :data-source="depositList"
        rowKey="deposit_id"
      >
      </a-table>
    </div>
  </div>
</template>


<script src="@/script/financial-manage.js" />