const columns = [
    {
        title: '序号',
        dataIndex: 'deposit_id',
        key: 'deposit_id',
        scopedSlots: { customRender: 'deposit_id' },
        align: 'center',
    },
    {
        title: '卡号',
        dataIndex: 'cid',
        key: 'cid',
        scopedSlots: { customRender: 'cid' },
        align: 'center',
    },
    {
        title: '收支明细',
        dataIndex: 'amount',
        key: 'amount',
        scopedSlots: { customRender: 'amount' },
        align: 'center',
    },
    {
        title: '余额',
        dataIndex: 'cardamount',
        key: 'cardamount',
        scopedSlots: { customRender: 'cardamount' },
        align: 'center',
    },
    {
        title: '折扣',
        dataIndex: 'discount',
        key: 'discount',
        scopedSlots: { customRender: 'discount' },
        align: 'center',
    },
    {
        title: '卡类型',
        dataIndex: 'type',
        key: 'type',
        scopedSlots: { customRender: 'type' },
        align: 'center',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        scopedSlots: { customRender: 'status' },
        align: 'center',
    },
    {
        title: '类型', // 收入还是支出
        dataIndex: 'deposit_type',
        key: 'deposit_type',
        scopedSlots: { customRender: 'deposit_type' },
        align: 'center',
    },
    {
        title: '操作时间',
        dataIndex: 'time',
        key: 'time',
        scopedSlots: { customRender: 'time' },
        align: 'center',
        width: '18%',
    },
    {
        title: '会员姓名',
        dataIndex: 'name',
        key: 'name',
        scopedSlots: { customRender: 'name' },
        align: 'center',
        width: '10%',
    },
    {
        title: '联系方式',
        dataIndex: 'phonenumber',
        key: 'phonenumber',
        scopedSlots: { customRender: 'phonenumber' },
        align: 'center',
        width: '10%',
    },
]

export default {
    data() {
        return {
            columns,
            depositList: [],

        }
    },
    created() {
        this.getDepositList()
    },
    methods: {
        async getDepositList() {
            let t1 = Date()
            console.log(t1)
            this.baseAxios({
                method: 'get',
                url: 'deposit/get_deposit_listall'
            }).then((res) => {
                let t2 = Date()
                console.log(t2)
                this.depositList = []
                for (var i = 0; i < res.data.length; ++i) {
                    this.depositList.push({
                        key: res.data[i]['deposit_id'],
                        deposit_id: res.data[i]['deposit_id'],
                        name: res.data[i]['name'],
                        identity: res.data[i]['identity'],
                        phonenumber: res.data[i]['phonenumber'],
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
                let t3 = Date()
                console.log(t3)
            })
        },
    }
}