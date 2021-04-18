import Moment from 'moment'
import echarts from 'echarts';

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
        dataIndex: 'pre_discount',
        key: 'pre_discount',
        scopedSlots: { customRender: 'pre_discount' },
        align: 'center',
    },
    {
        title: '卡类型',
        dataIndex: 'pre_type',
        key: 'pre_type',
        scopedSlots: { customRender: 'pre_type' },
        align: 'center',
    },
    {
        title: '状态',
        dataIndex: 'pre_status',
        key: 'pre_status',
        scopedSlots: { customRender: 'pre_status' },
        align: 'center',
    },
    {
        title: '类型', // 收入还是支出
        dataIndex: 'pre_deposit_type',
        key: 'pre_deposit_type',
        scopedSlots: { customRender: 'pre_deposit_type' },
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
            constantList: [],
            // 下面两个都是作为cache，不停变换
            depositList: [],
            displayList: [],
            pagination: {
                onChange: page => {
                    // console.log(page)
                },
                pageSize: 15,
            },
            searchKeys: {
                'deposit_type': '',
                'member': {
                    'byMemberType': '',
                    'memberInfo': ''
                },
                'cid': '',
                'cardStatus': [],
                'cardType': [],
                'timeRange': [], // [start , end]
            },

        }
    },
    mounted() {
    },
    created() {
        this.getDepositList()
    },
    watch: {

    },
    methods: {
        // Echarts


        // 时间范围选择器时间，获取时间
        onDateRangePickerChange(date, dateString) {
            // console.log(date, dateString)
            this.searchKeys.timeRange = []
            this.searchKeys.timeRange.push(Moment(date[0]).valueOf())
            this.searchKeys.timeRange.push(Moment(date[1]).valueOf())
            // console.log(this.searchKeys.timeRange)
        },
        // tag 选择器，获取参数
        onTagTypeSelectorChange(value) {
            this.searchKeys.cardType = value
        },
        onTagStatusSelectorChange(value) {
            // console.log(value)
            this.searchKeys.cardStatus = value
        },
        /* 
        高级搜索功能
        如需扩展直接加在下面
        */
        groupSearch() {
            this.depositList = this.constantList
            this.depositList = this.depositList.filter(item => {
                // depositList中的每个item元素
                // 返回true说明符合筛选条件

                /*
                c1 记录的类型
                消费 1
                充值 0
                全部 all
                */
                let c1 = true
                // console.log(this.searchKeys.deposit_type)
                if (this.searchKeys.deposit_type == '0' || this.searchKeys.deposit_type == '1') {
                    c1 = (() => {
                        return this.searchKeys.deposit_type == item.deposit_type
                    })()
                }
                // console.log('c1', c1)

                /* 
                c2 按会员查找
                */
                let c2 = true
                let c2Type = this.searchKeys.member.byMemberType
                let c2Info = this.searchKeys.member.memberInfo
                if (c2Type == 'phonenumber') {
                    c2 = item.phonenumber.toString().match(c2Info)
                } else if (c2Type == 'identity') {
                    c2 = item.identity.toString().match(c2Info)
                } else if (c2Type == 'name') {
                    c2 = item.name.toString().match(c2Info)
                }
                // console.log('c2', c2)

                /* 
                c3 按卡号查找
                */
                let c3 = true
                if (this.searchKeys.cid != '') {
                    c3 = item.cid.toString().match(this.searchKeys.cid)
                }
                if (c3 == null) {
                    c3 = false
                }
                // console.log('c3', c3)

                /* 
                c4 Card Tag 选择器查找 按卡类型
                */
                let c4 = true;
                // console.log(this.searchKeys.cardType)
                c4 = this.searchKeys.cardType.some((key) => {
                    return item.type.toString().match(key)
                })
                if (this.searchKeys.cardType.length == 0) {
                    c4 = true
                }
                // console.log('c4', c4)

                /* 
                c5 Card Tag 选择器查找 按卡状态
                */
                let c5 = true
                c5 = this.searchKeys.cardStatus.some((key) => {
                    return item.status.toString().match(key)
                })
                if (this.searchKeys.cardStatus.length == 0) {
                    c5 = true
                }
                // console.log('c5', c5)

                /* 
                按照时间范围进行检索
                */
                let c6 = true
                if (this.searchKeys.timeRange[0] != undefined) {
                    console.log(this.searchKeys.timeRange)
                    c6 = (() => {
                        return Moment(item.time).valueOf() >= this.searchKeys.timeRange[0] && Moment(item.time).valueOf() <= this.searchKeys.timeRange[1]
                    })()
                }
                console.log('c6', c6)


                return c1 && c2 && c3 && c4 && c5
            })
            this.displayPrepared()
        },
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
                this.constantList = []
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
                this.constantList = [...this.depositList]
                let t3 = Date()
                console.log(t3)
                this.displayPrepared()
            })
        },
        // 展示数据预处理
        // 遍历 in是下标，of是对象
        displayPrepared() {
            this.displayList = []
            this.displayList = [...this.depositList]
            for (let d of this.displayList) {
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
                // deposit_type
                if (d.deposit_type == '0') {
                    d['pre_deposit_type'] = '充值'
                } else {
                    d['pre_deposit_type'] = '消费'
                }
            }
        },
    }
}