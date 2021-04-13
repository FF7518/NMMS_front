<template>
<div>
    <a-descriptions title="会员卡信息">
        <a-descriptions-item label="卡号">
        {{item.cid}}
        </a-descriptions-item>
        <a-descriptions-item label="卡内余额">
        {{item.amount}}
        </a-descriptions-item>
        <a-descriptions-item label="卡状态">
        {{item.status}}
        </a-descriptions-item>
    </a-descriptions>

    <p />
    
    <!-- 预存款操作 -->
    <p>输入预存款的金额</p>
    <a-input-number
        :default-value="0"
        :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        :style="{width: '400px'}"
        :value="addAmount"
        @change="inputChange"
    />
    <p />
    <a-button
        @click="submit"
    >
        提交
    </a-button>

</div>
</template>

<script src='@/script/cm-save.js' />