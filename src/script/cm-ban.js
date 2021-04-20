import bus from "@/utils/bus"

const fakeData = [
    {
        'cid': 1,
        'amount': 100.5,
        'discount': 100,
        'type': '1',
        'status': 'normal',
        'message': ''
    },
    {
        'cid': 2,
        'amount': 500,
        'discount': 80,
        'type': '2',
        'status': 'normal',
        'message': ''
    },
    {
        'cid': 3,
        'amount': 1000,
        'discount': 80,
        'type': '2',
        'status': 'normal',
        'message': ''
    },
    {
        'cid': 4,
        'amount': 580.43,
        'discount': 100,
        'type': '1',
        'status': 'normal',
        'message': '1111'
    },
    {
        'cid': 5,
        'amount': 932,
        'discount': 100,
        'type': '1',
        'status': 'lost',
        'message': ''
    },
    {
        'cid': 6,
        'amount': 1000,
        'discount': 95,
        'type': '2',
        'status': 'normal',
        'message': ''
    },
]


export default {
    data() {
        return {
            item: {},
            isFreeBanButtonDisabled: true,
            isBanButtonDisabled: true,
            isBanSeletorDisalbed: true,
            // ista: 'normal',
            searchValue: '',
            searchList: '',
            AllData: '',
            loading: false,
            isDrawerVisible: false,
            // check [lost]
            // tab1
            check_cid: '' ,
            check_identity: '',
            isLostChecked: false,
            // tab2
            move2cid: '',
        }
    },
    created() {
        bus.$off('current_card')
        bus.$on('current_card', (cid) => {
            // console.log(cid)
            let len = fakeData.length
            for (let i = 0; i < len; ++i) {
                if (fakeData[i]['cid'] == cid) {
                    // this.item = fakeData[i]
                    // console.log(this.item.status)
                    break
                }
            }
        })
    },
    mounted() {

    },
    methods: {
        refreshCache() {
            this.item = {}
            this.isFreeBanButtonDisabled = true
            this.isBanButtonDisabled = true
            this.isBanSeletorDisalbed = true
            this.searchValue = ''
            this.searchList = ''
            this.AllData = ''
            this.loading = false
            this.check_identity = ''
            this.check_cid = ''
            this.isLostChecked = false
            this.move2cid = ''
            this.getCardList()
        },
        submit() {

            // lost 解禁的校验情况
            if (this.item.status == 'normal' && !this.isLostChecked) {
                console.log(this.item.status, this.isLostChecked)
                this.$message.warning('挂失状态解禁未校验或校验失败！')
                this.refreshCache()
                return
            }

            // console.log('更新item')
            // console.log('刷新列表')
            this.loading = true
            // console.log(this.item)
            this.updateCardInfo()
            
        },
        updateCardInfo() {
            // 异步，在发送请求的时候，上面的refreshCache已经执行了
            let status = this.item.status
            let cid = this.item.cid
            this.baseAxios({
                method: 'post',
                url: '/card/update_card_info',
                data: {
                    'cid': this.item.cid,
                    'amount': this.item.amount,
                    'discount': this.item.discount,
                    'status': this.item.status,
                    'type': this.item.type,
                    'message': this.item.message
                },
            }).then((res => {
                this.loading = false
                // console.log(res.data)
                if (res.data == true) {
                    if (status == 'deleted') {
                        this.$notification.open({
                            message: '您刚刚退还了一张会员卡！',
                            description: '会员卡号：' + String(cid) + "，您仍可以在消费记录中找到它。"
                        })
                    }

                    this.$message.success('修改成功！')

                } else {
                    this.$message.error('修改失败！', (e) => {
                        console.log(e)
                    })
                }
                this.refreshCache()
            })).catch((e) => {
                this.loading = false
                console.error(e);
                this.$message.error("网络异常！" + e)
                this.refreshCache()
            })
        },
        getCardList() {
            this.baseAxios({
                method: 'get',
                url: '/card/get_card_list',
                // params

            }).then((response) => {
                this.searchList = []
                // console.log(response.data.length)
                // 同步到列表
                var listLen = response.data.length
                for (var i = 0; i < listLen; ++i) {
                    this.searchList.push({
                        cid: response.data[i]['cid'],
                        amount: response.data[i]['amount'],
                        discount: response.data[i]['discount'],
                        type: response.data[i]['type'],
                        status: response.data[i]['status'],
                        messsage: response.data[i]['message']
                    });
                }
                this.searchList = this.searchList.filter((item) => {
                    return item.status != 'deleted'
                })
                // console.log(this.searchList)
                this.AllData = this.searchList
            })

            // this.listData = fakeData
        },
        handleChange(e) {
            // console.log(e, 'change')
            this.searchValue = e
            this.isFreeBanButtonDisabled = false
            this.isBanButtonDisabled = true
            this.isBanSeletorDisalbed = true
            // need improve
            for (let i = 0; i < this.searchList.length; ++i) {
                if (this.searchList[i]['cid'] == e) {
                    this.item = this.searchList[i]
                    if (this.item.status == 'normal') {
                        this.item.pre_status = '正常'
                        this.isFreeBanButtonDisabled = true
                        this.isBanButtonDisabled = true
                        this.isBanSeletorDisalbed = false
                    }
                    else if (this.item.status == 'lost') {
                        this.item.pre_status = '挂失'
                    }
                    else if (this.item.status == 'deactived') {
                        this.item.pre_status = '停用'
                    }
                    else this.item.pre_status = '退还'
                    this.item.pre_type = this.item.type == 1 ? '储值卡' : '折扣卡'
                    this.item.pre_discount = String(this.item.discount) + ' %'

                    break
                }
            }
        },
        // 稍微有点复杂的禁用按钮
        // 需要刷新pre_status
        onFreeBanButtonClick() {

            if (this.item.status == 'lost') {
                this.isDrawerVisible = true
                this.isLostChecked = false

                
            } 
            else {
                this.isLostChecked = true
            }

            this.item.status = 'normal';
            this.item.pre_status = '正常';
            this.isFreeBanButtonDisabled = true;
            this.isBanButtonDisabled = true
            this.isBanSeletorDisalbed = false
        },
        onBanButtonClick() {
            if (this.item.amount > 0 && this.item.status == 'deleted') {
                this.$message.error('卡内还有余额！无法执行操作！')
                return
            }

            if (this.item.status == 'lost') {
                this.item.pre_status = '挂失'
            }
            else if (this.item.status == 'deactived') {
                this.item.pre_status = '停用'
            }
            else {
                this.item.pre_status = '退还'
                this.$message.warning('请注意！该操作不可逆，请确认！')
            }
            this.isFreeBanButtonDisabled = false
            this.isBanButtonDisabled = true
            this.isBanSeletorDisalbed = true
        },
        // 判断有没有选中ban的选项
        onBanSeletorChange(e) {
            if (this.item.status != 'normal') {
                this.isBanButtonDisabled = false
            }
            else this.isBanButtonDisabled = true
        },
        handleSearch(e) {
            // console.log(e, 'search')
            this.getCardList()
        },

        // Drawer
        onDrawerClose() {
            this.isDrawerVisible = false
        },
        // check [lost]
        onLostCheckClick() {
            let check_cid = this.check_cid
            let check_id = this.check_identity
            // 检查是否对应
            this.baseAxios({
                method : 'get',
                url : '/card/get_member_info',
                params : { cid : check_cid }
            }).then((res) => {
                if (res.data.identity == check_id) {
                    this.isLostChecked = true
                    this.$message.success('校验成功！')
                    this.isDrawerVisible = false
                }
                else {
                    this.$message.warning('校验失败！请重新校验！')
                }
            }).catch(e => {
                this.$message.error('网络异常！'+ e)
            })
        },
        onLostMoveClick() {

        }
    },
}