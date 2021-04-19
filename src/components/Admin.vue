<template>
  <div>
    <!-- 功能按键 -->
    <div id="ctrl">
      <div style="margin-top: 3vh">
        <label>搜索管理员</label>
        <a-select
          v-model="searchAdmin.byAdminType"
          placeholder="关键字类型"
          :style="{ width: '160px' }"
        >
          <a-select-option value="aid"> 编号 </a-select-option>
          <a-select-option value="account"> 账号 </a-select-option>
        </a-select>
        <label>输入关键字</label>
        <a-input-search
          :style="{ width: '240px' }"
          placeholder="管理员信息"
          enter-button
          v-model="searchAdmin.adminInfo"
          @search="groupSearch"
          @change="onInputSearchChange"
        />
        <a-button
          :style="{ width: '120px' }"
          type="primary"
          @click="onButtonHandle"
          >+ 新建</a-button
        >
        <p />
      </div>
    </div>
    <!-- 数据显示 -->
    <div id="panel">
      <a-table :columns="columns" :data-source="listData" rowKey="aid">
        <template slot="operation" slot-scope="text, record, index">
          <div class="editable-row-operations">
            <span>
              <a @click="adminSelectHandle(text, record, index)">选择</a>
              <!-- <a @click="adminDeleteHandle(text, record, index)">删除</a> -->
              <a-popconfirm title="你确定要删除该管理员吗？！" @confirm="adminDeleteHandle(text, record, index)">
                <a-icon slot="icon" type="question-circle-o" style="color: red" />
                <a >删除</a>
              </a-popconfirm>
            </span>
          </div>
        </template>
      </a-table>
      <!-- Info Modal -->
      <a-modal
        v-model="isInfoModalVisible"
        :title="'管理员 ' + currentAdmin.account"
        @ok="onInfoModalSubmit"
      >
        <div>
          <a-row :gutter="8">
            <a-col :span="4">
              <span>账户</span>
            </a-col>
            <a-col :span="12">
              <a-input size="small" v-model="currentAdmin.account" />
            </a-col>
          </a-row>
          <br />
          <a-row :gutter="8">
            <a-col :span="4">
              <span>密码</span>
            </a-col>
            <a-col :span="12">
              <a-input size="small" v-model="currentAdmin.password" />
            </a-col>
          </a-row>
          <br />
          <a-row :gutter="8">
            <a-col :span="4">
              <span>权限</span>
            </a-col>
          </a-row>
          <br />
          <a-row :gutter="8">
            <a-col :span="24">
              <a-checkbox-group
                :value="currentAuthList"
                :options="options"
                @change="onCheckBoxChange"
              >
              </a-checkbox-group>
            </a-col>
          </a-row>
        </div>
      </a-modal>
      <!-- Add Modal -->
      <a-modal
        title="新建管理员账户"
        v-model="isAddModalVisible"
        @ok="onAddModalSubmit"
      >
        <div>
          <a-row :gutter="8">
            <a-col :span="4">
              <span>账户</span>
            </a-col>
            <a-col :span="12">
              <a-input size="small" v-model="addAdmin.account" />
            </a-col>
          </a-row>
          <br />
          <a-row :gutter="8">
            <a-col :span="4">
              <span>密码</span>
            </a-col>
            <a-col :span="12">
              <a-input size="small" v-model="addAdmin.password" />
            </a-col>
          </a-row>
          <br />
          <a-row :gutter="8">
            <a-col :span="4">
              <span>权限</span>
            </a-col>
          </a-row>
          <br />
          <a-row :gutter="8">
            <a-col :span="24">
              <a-checkbox-group
                :value="addAuthList"
                :options="options"
                @change="onAddCheckboxChange"
              >
              </a-checkbox-group>
            </a-col>
          </a-row>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script src="@/script/admin.js" />

<style scoped src="@/style/admin.css" />