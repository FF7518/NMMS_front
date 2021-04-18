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
            item: '',
            addAmount: 0,
            searchValue: '',
            searchList: '',
            AllData: '',
            loading: false
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
        // this.item.amount = 0
    },
    mounted() {

    },
    methods: {
        refreshCache() {
            this.item = {}
            this.addAmount = 0
            this.searchValue = ''
            this.searchList = ''
            this.AllData = ''
            this.loading = false
        },
        submit() {
            try {
                this.item.amount = parseInt(this.item.amount)
                this.loading = true
                console.log(this.addAmount)
                this.item.amount += this.addAmount
                console.log(this.item.amount)

            } catch (e) {
                console.log(e)
            }
            this.updateCardInfo()
            this.refreshCache()

        },
        inputChange(value) {
            // console.log(value)
            this.addAmount = value
        },
        updateCardInfo() {
            this.baseAxios({
                method: 'post',
                url: '/card/update_card_info',
                data: this.item,
            }).then((res => {
                this.loading = false
                console.log(res.data)
                if (res.data == true) {
                    this.$message.success('修改成功！')
                } else {
                    this.$message.error('修改失败！', (e) => {
                        console.log(e)
                    })
                }
            })).catch((error) => {
                this.loading = false
                console.error(error);
                this.$message.error("网络异常！");
            })
        },
        getCardInfo() {
            this.baseAxios({
                method: 'get',
                url: '/card/get_card_list',
                // params

            }).then((response) => {
                this.searchList = []
                console.log(response.data.length)
                // 同步到列表
                var listLen = response.data.length
                for (var i = 0; i < listLen; ++i) {
                    this.searchList.push({
                        cid: response.data[i]['cid'],
                        amount: response.data[i]['amount'],
                        discount: response.data[i]['discount'],
                        type: response.data[i]['type']
                    });
                }
                console.log(this.searchList)
                this.AllData = this.searchList
            })

            // this.listData = fakeData
        },
        handleChange(e) {
            console.log(e, 'change')
            this.searchValue = e
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
        handleSearch(e) {
            console.log(e, 'search')
            this.getCardInfo()
        },
    },
}