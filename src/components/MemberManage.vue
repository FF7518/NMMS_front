<template>
  <div>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="用户列表">
        <a-table
          :columns="columns"
          :data-source="data"
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
                <a @click="() => save(record.key)">保存</a>
                <a-popconfirm
                  title="确定要取消吗？"
                  @confirm="() => cancel(record.key)"
                >
                  <a>取消</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a :disabled="editingKey !== ''" @click="() => edit(record.key)"
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
      <a-tab-pane key="2" tab="Tab 2"> Waiting to be added... </a-tab-pane>
    </a-tabs>
    <a-drawer
      title="会员卡信息"
      width="640"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterDrawerVisibleChange"
      @close="onDrawerClose"
    >
      <p>1111</p>
    </a-drawer>
  </div>
</template>


<script>
const columns = [
  {
    title: "ID",
    dataIndex: "mid",
    with: "10%",
    scopedSlots: { customRender: "mid" },
  },
  {
    title: "姓名",
    dataIndex: "name",
    width: "25%",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "身份证号",
    dataIndex: "identity",
    width: "15%",
    scopedSlots: { customRender: "identity" },
  },
  {
    title: "联系电话",
    dataIndex: "phonenumber",
    width: "40%",
    scopedSlots: { customRender: "phonenumber" },
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

// const innerColumns = [
//   {
//     title: '会员卡卡号',
//     dataIndex: 'cid',
//     key: 'cid',
//   },
//   {
//     title: '余额',
//     dataIndex: 'amount',
//     key: 'amount',
//   },
//   {
//     title: '折扣',
//     dataIndex: 'discount',
//     key: 'discount',
//   },
//   {
//     title: '类型',
//     dataIndex: 'type',
//     key: 'type',
//   },
//   {
//     title: '状态',
//     dataIndex: 'status',
//     key: 'status',
//   }
// ]

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    mid: i,
    name: `Edrward ${i}`,
    identity: 32,
    phonenumber: `London Park no. ${i}`,
  });
}

// const innnerData = [];
// for (let i = 0; i < 3; ++i) {
//   innnerData.push({
//     key: i,
//     cid: i,
//     amount: 100.00,
//     discount: 0.80,
//     type: '储值卡',
//     status: '正常',
//   })
// }

export default {
  components: {},
  data() {
    this.cacheData = data.map((item) => ({ ...item }));
    return {
      data,
      columns,
      // innerColumns,
      // innnerData,
      editingKey: "",
      visible: false,
    };
  },
  methods: {
    // test func -> looking at scope-slot
    onEdit(value) {
      alert(JSON.stringify(value));
    },

    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.filter((item) => key === item.key)[0];
      const targetCache = newCacheData.filter((item) => key === item.key)[0];
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = "";
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.key)[0]
        );
        delete target.editable;
        this.data = newData;
      }
    },
    // 查看会员卡操作，进入另一个页面
    intoCard(key) {
      // alert(JSON.stringify(key))
      console.log("intoCard", key);
    },

    // 抽屉
    afterDrawerVisibleChange(val) {
      console.log("visible", val);
    },
    showDrawer(key) {
      this.visible = true;
    },
    onDrawerClose() {
      this.visible = false;
    },
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
