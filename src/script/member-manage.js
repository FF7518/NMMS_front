const columns = [
    {
        title: "ID",
        dataIndex: "mid",
        with: "10%",
        scopedSlots: { customRender: "mid" },
        align: 'center'
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

const cardColumns = [
    {
        title: '卡号',
        dataIndex: 'cid',
        key: 'cid',
        scopedSlots: { customRender: 'cid' },
        align: 'center',
        width: '20%'
    },
    {
        title: '余额',
        dataIndex: 'amount',
        key: 'amount',
        scopedSlots: { customRender: 'amount' },
        align: 'center'
    },
    {
        title: '折扣',
        dataIndex: 'pre_discount',
        key: 'pre_discount',
        scopedSlots: { customRender: 'pre_discount' },
        align: 'center'
    },
    {
        title: '种类',
        dataIndex: 'pre_type',
        key: 'pre_type',
        scopedSlots: { customRender: 'pre_type' },
        align: 'center'
    },
    {
        title: '状态',
        dataIndex: 'pre_status',
        scopedSlots: { customRender: 'pre_status' },
        align: 'center'
    },
]

const depositColumns = [
    {
        title: '序号',
        dataIndex: 'deposit_id',
        key: 'deposit_id',
        scopedSlots: { customRender: 'deposit_id' }
    },
    {
        title: '卡号',
        dataIndex: 'cid',
        key: 'cid',
        scopedSlots: { customRender: 'cid' }
    },
    {
        title: '收支明细',
        dataIndex: 'amount',
        key: 'amount',
        scopedSlots: { customRender: 'amount' }
    },
    {
        title: '余额',
        dataIndex: 'cardamount',
        key: 'cardamount',
        scopedSlots: { customRender: 'cardamount' }
    },
    {
        title: '折扣',
        dataIndex: 'discount',
        key: 'discount',
        scopedSlots: { customRender: 'discount' }
    },
    {
        title: '卡类型',
        dataIndex: 'type',
        key: 'type',
        scopedSlots: { customRender: 'type' }
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        scopedSlots: { customRender: 'status' }
    },
    {
        title: '类型', // 收入还是支出
        dataIndex: 'deposit_type',
        key: 'deposit_type',
        scopedSlots: { customRender: 'deposit_type' }
    },
    {
        title: '操作时间',
        dataIndex: 'time',
        key: 'time',
        scopedSlots: { customRender: 'time' }
    },
]

// const data = [];
// for (let i = 0; i < 100; i++) {
//     data.push({
//         key: i.toString(),
//         mid: i,
//         name: `Edrward ${i}`,
//         identity: 32,
//         phonenumber: `London Park no. ${i}`,
//     });
// }


export default {
    components: {},
    data() {
        return {
            // search
            searchMember: {
                'byMemberType': 'aid',
                'memberInfo': ''
            },
            // 所有会员
            memberList: [],
            displayList: [],
            // 当前选择的会员
            cacheItem: '',
            // 会员拥有的会员卡列表
            memberOwnedCardList: [],
            // 会员所有消费记录
            depositList: [],
            columns,
            cardColumns,
            depositColumns,
            editingKey: "",
            visible: false,
            childVisible: false,
            modalVisible: false,

        };
    },
    created() {
        this.getMemberList()
    },
    methods: {
        // 获取用户的消费记录
        async getDepositByMember(key) {
            this.baseAxios({
                method: 'get',
                url: 'deposit/get_deposit_bymember',
                params: { mid: key }
            }).then((res) => {
                this.depositList = []
                for (var i = 0; i < res.data.length; ++i) {
                    this.depositList.push({
                        key: res.data[i]['deposit_id'],
                        deposit_id: res.data[i]['deposit_id'],
                        cid: res.data[i]['cid'],
                        cardamount: res.data[i]['cardamount'],
                        discount: res.data[i]['discount'],
                        type: res.data[i]['type'],
                        status: res.data[i]['status'],
                        message: res.data[i]['message'],
                        mid: res.data[i]['mid'],
                        deposit_type: res.data[i]['deposit_type'],
                        amount: res.data[i]['amount'],
                        time: res.data[i]['time'],
                        editable: false
                    })
                }
            })
        },
        // 获取用户列表
        async getMemberList() {
            this.baseAxios({
                method: 'get',
                url: '/member/get_member_list',
            }).then((res) => {
                console.log(res.data)
                this.memberList = []

                for (var i = 0; i < res.data.length; ++i) {
                    this.memberList.push({
                        key: res.data[i]['mid'],
                        mid: res.data[i]['mid'],
                        name: res.data[i]['name'],
                        identity: res.data[i]['identity'],
                        phonenumber: res.data[i]['phonenumber'],
                        editable: false
                    })
                }
                this.displayPrepared()
            }).catch((e) => {
                this.loading = false
                console.error(e);
                this.$message.error("网络异常！" + e);
            })
        },
        // 准备数据（实际显示的） 该数据必须和memberList同步
        displayPrepared() {
            this.displayList = []
            this.displayList = JSON.parse(JSON.stringify(this.memberList))
        },
        // 用户自己的会员卡信息
        async getMemberOwnedCardList() {
            this.baseAxios({
                method: 'get',
                url: '/member/get_card_listall',
                params: { mid: this.cacheItem['mid'] }
            }).then((response) => {
                this.memberOwnedCardList = []
                var listLen = response.data.length
                for (let d of response.data) {
                    // discount
                    d['pre_discount'] = d.discount.toString() + '%'
                    // card type
                    if (d.type == "1") {
                        d['pre_type'] = '储值卡'
                    } else {
                        d['pre_type'] = '折扣卡'
                    }
                    // status
                    if (d.status == 'normal') {
                        d['pre_status'] = '正常'
                    } else if (d.status == 'lost') {
                        d['pre_status'] = '挂失'
                    } else if (d.status == 'deactived') {
                        d['pre_status'] = '停用'
                    } else {
                        d['pre_status'] = '退还'
                    }
                    this.memberOwnedCardList.push(d)
                }
            }).catch((e) => {
                this.loading = false
                console.error(e);
                this.$message.error("网络异常！" + e);
            })
        },
        // 搜索
        groupSearch() {
            this.displayPrepared()
            this.displayList = this.displayList.filter(item => {
                let c2 = true
                let c2Type = this.searchMember.byMemberType
                let c2Info = this.searchMember.memberInfo
                if (c2Type == 'phonenumber') {
                    c2 = item.phonenumber.toString().match(c2Info)
                } else if (c2Type == 'identity') {
                    c2 = item.identity.toString().match(c2Info)
                } else if (c2Type == 'name') {
                    c2 = item.name.toString().match(c2Info)
                }
                return c2
            })
        },
        setModalVisible() {
            this.modalVisible = false
        },
        // test func -> looking at scope-slot
        onEdit(value) {
            // alert(JSON.stringify(value));
        },
        // 修改用户个人信息
        updateMemberInfo() {
            console.log(this.cacheItem)
            this.baseAxios({
                method: 'post',
                url: '/member/update_member_info',
                data: this.cacheItem,
            }).then((res) => {
                // console.log(res.data)
                if(res.data == true) {
                    this.$message.success('修改成功！')
                    this.getMemberList()
                } else {
                    this.$message.success('修改失败！请检查是否有错误！')
                }
                
            }).catch((e) => {
                this.loading = false
                console.error(e);
                this.$message.error("网络异常！" + e);
            })

        },
        handleChange(value, key, column) {
            console.log(value, key, column)
        },
        onMemberTableEdit(record) {
            this.modalVisible = true
            this.cacheItem = { 'mid': 0, 'name': '', 'identity': '', 'phonenumber': '' }
            let member = this.memberList.filter((item) => record.key === item.key)[0]
            this.cacheItem['identity'] = member['identity']
            this.cacheItem['name'] = member['name']
            this.cacheItem['phonenumber'] = member['phonenumber']
            this.cacheItem['mid'] = member['mid']
            // // 查找key
            // key = record.key
            // let target = this.memberList.filter((item) => key === item.key);
            // console.log(target)
            // record.editable = true
        },
        save(record) {
            console.log(record)
            // record.editable = false
        },
        cancel(record) {
            // let target = newData.filter((item) => key === item.key)[0];

            // record.editable = false
        },
        // 查看会员卡操作，进入另一个页面
        intoCard(key) {
            // alert(JSON.stringify(key))
            console.log("intoCard", key)
            this.cacheItem = { 'mid': 0, 'name': '', 'identity': '', 'phonenumber': '' }
            let member = this.memberList.filter((item) => key === item.key)[0]
            this.cacheItem['identity'] = member['identity']
            this.cacheItem['name'] = member['name']
            this.cacheItem['phonenumber'] = member['phonenumber']
            this.cacheItem['mid'] = member['mid']
            this.getMemberOwnedCardList()
            this.getDepositByMember(key)
        },

        // 抽屉
        afterDrawerVisibleChange(val) {
            console.log("visible", val)
        },
        showDrawer(key) {
            this.visible = true
        },
        onDrawerClose() {
            this.memberOwnedCardList = []
            this.depositList = []
            this.visible = false
        },

        afterChildDrawerVisibleChange(val) {

        },
        showChildDrawer(key) {
            this.childVisible = true
        },
        onChildDrawerClose() {
            this.childVisible = false
        }
    },
};