<template>
  <div>
    <a-button @click="getMemberList">Test Method</a-button>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="用户列表">
        <a-table
          :columns="columns"
          :data-source="memberList"
          bordered
          :scroll="{ y: '50vh' }"
        >
          <template
            v-for="col in ['name', 'identity', 'phonenumber']"
            :slot="col"
            slot-scope="text, record"
          >
            <div :key="col">
              <a-input
                v-if="record.editable"
                style="margin: -5px 0"
                :value="text"
                @click="onEdit(text)"
                @change="(e) => handleChange(e.target.value, record.key, col)"
              />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template slot="operation" slot-scope="text, record">
            <div class="editable-row-operations">
              <span v-if="record.editable">
                <a @click="() => save(record)">保存</a>
                <a-popconfirm
                  title="确定要取消吗？"
                  @confirm="() => cancel(record)"
                >
                  <a>取消</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a
                  :disabled="editingKey !== ''"
                  @click="() => onMemberTableEdit(record)"
                  >修改</a
                >
                <a
                  :disabled="editingKey !== ''"
                  @click="
                    () => {
                      intoCard(record.key);
                      showDrawer(record.key);
                    }
                  "
                  >会员卡</a
                >
              </span>
            </div>
          </template>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="统计"> 统计信息，用户总数等等，图表 </a-tab-pane>
    </a-tabs>
    <!-- 模态对话框 -->
    <a-modal
      :visible="modalVisible"
      @ok="
        () => {
          setModalVisible();
          updateMemberInfo();
        }
      "
      @cancel="setModalVisible"
    >
      <div>
        <!-- <p></p> -->
        <a-row :gutter="8">
          <a-col :span="4">
            <span>姓名</span>
          </a-col>
          <a-col :span="6">
            <a-input v-model="cacheItem.name" />
          </a-col>
        </a-row>
        <br />
        <a-row :gutter="8">
          <a-col :span="4">
            <span>身份证</span>
          </a-col>
          <a-col :span="10">
            <a-input v-model="cacheItem.identity" />
          </a-col>
        </a-row>
        <br />
        <a-row :gutter="8">
          <a-col :span="4">
            <span>联系方式</span>
          </a-col>
          <a-col :span="10">
            <a-input v-model="cacheItem.phonenumber" />
          </a-col>
        </a-row>
      </div>
    </a-modal>
    <!-- 抽屉2层 -->
    <a-drawer
      title="会员卡信息"
      width="640"
      placement="right"
      :closable="false"
      :visible="this.visible"
      :after-visible-change="afterDrawerVisibleChange"
      @close="onDrawerClose"
    >
      <p>会员{{ cacheItem.name }}拥有的会员卡</p>
      <a-table
        :columns="cardColumns"
        :data-source="memberOwnedCardList"
        rowKey="cid"
        bordered
      >
      </a-table>
      <a-button @click="showChildDrawer"> 测试 </a-button>
      <a-drawer
        title="一张会员卡"
        width="420"
        placement="right"
        :closable="false"
        :visible="this.childVisible"
        :after-visible-change="afterChildDrawerVisibleChange"
        @close="onChildDrawerClose"
      >
        <a-table> </a-table>
      </a-drawer>
    </a-drawer>
  </div>
</template>


<script src="@/script/member-manage.js" />


<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
