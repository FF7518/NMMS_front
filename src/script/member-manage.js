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

const cardColumns = [
    {
        title: '卡号',
        dataIndex: 'cid',
        key: 'cid',
        scopedSlots: { customRender: 'cid' }
    },
    {
        title: '余额',
        dataIndex: 'amount',
        key: 'amount',
        scopedSlots: { customRender: 'amount' }
    },
    {
        title: '折扣',
        dataIndex: 'discount',
        key: 'discount',
        scopedSlots: { customRender: 'discount' }
    },
    {
        title: '种类',
        dataIndex: 'type',
        key: 'type',
        scopedSlots: { customRender: 'type' }
    },
    {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
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
            // 所有会员
            memberList: [],
            // 当前选择的会员
            cacheItem: '',
            // 会员拥有的会员卡列表
            memberOwnedCardList: [],
            columns,
            cardColumns,
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
        getMemberList() {
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
            })
        },
        getMemberOwnedCardList() {
            this.baseAxios({
                method: 'get',
                url: '/member/get_card_listall',
                params: { mid: this.cacheItem['mid'] }
            }).then((response) => {
                this.memberOwnedCardList = []
                var listLen = response.data.length
                for (var i = 0; i < listLen; ++i) {
                    this.memberOwnedCardList.push({
                        cid: response.data[i]['cid'],
                        amount: response.data[i]['amount'],
                        discount: response.data[i]['discount'],
                        type: response.data[i]['type']
                    })
                }
            })
        },

        setModalVisible() {
            this.modalVisible = false
        },
        // test func -> looking at scope-slot
        onEdit(value) {
            // alert(JSON.stringify(value));
        },
        updateMemberInfo() {
            console.log(this.cacheItem)
            this.baseAxios({
                method: 'post',
                url: '/member/update_member_info',
                data: this.cacheItem,
            }).then((res) => {
                console.log(res.data)
                this.getMemberList()
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
        },

        // 抽屉
        afterDrawerVisibleChange(val) {
            console.log("visible", val)
        },
        showDrawer(key) {
            this.visible = true
        },
        onDrawerClose() {
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