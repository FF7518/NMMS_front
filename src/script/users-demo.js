

export default {
    data() {
        return {
            form: {
                'cid': '',
                'money': 0,
                'amount': 0,
                'status': '',
                'type': '',
                'discount' : '',
            },

        }
    },
    created() {

    },
    methods: {
        submit() {
            let refresh = {
                'cid': '',
                'money': 0,
                'amount': 0,
                'status': '',
                'type': '',
                'discount' : '',
            }
            if (this.form.status != 'normal') {
                this.$message.error('卡片状态异常！')
                this.form = refresh   
                return
            }
            if (this.form.type == '2' && this.form.money > 0) {
                this.$message.error('无法充值！')
                return
            }
            // console.log (parseFloat(this.form.money))
            let m = parseFloat(this.form.money)
            if (m < 0) m = 0 - m
            m = m * parseFloat(this.form.discount) / 100
            // m > 0
            let amount = parseFloat(this.form.amount)
            // console.log(this.form)
            if (parseFloat(this.form.money) + amount < 0) {
                this.$message.error('卡余额不足！')
                return
            }
            else {
                this.baseAxios({
                    method: 'post',
                    url: this.form.money < 0 ? '/deposit/xiaofei' : '/deposit/cunkuan',
                    data: {
                        'cid': this.form.cid,
                        'amount': m,
                    }
                }).then((res) => {
                    this.onCidBlur()
                    if (res.data == true) {
                        this.$notification.open({
                            message: '更新成功！',
                            description: '你更新了卡号' + String(this.form.cid)
                        })
                    }
                    else {
                        this.$message.error('更新失败！')
                    }
                    // this.form = refresh 
                }).catch((e) => {
                    this.$message.error('网络异常' + e)
                    // this.form = refresh 
                })
            }
        },
        async onCidBlur() {
            if (this.form.cid != '') {
                this.baseAxios({
                    method: 'get',
                    url: '/card/get_card_info',
                    params: { cid: this.form.cid }
                }).then((res) => {
                    // console.log(res.data)
                    if (res.data.status == 'normal') {
                        this.form.amount = res.data.amount
                        this.form.status = res.data.status
                        this.form.discount = res.data.discount
                        this.form.type = res.data.type
                        if (this.form.type == '2') {
                            this.$message.info('请注意。该卡为折扣卡，无法充值！')
                        }
                    }
                    else {
                        this.$message.warning('您选择的卡片不可用或不存在！')
                        this.form.amount = 0
                        this.form.money = 0
                    }
                }).catch((e) => {
                    console.log(e)
                    this.$message.error('网络异常！' + e)
                })
            }
            return true
        },
        async onMoneyBlur() {
            let m = parseFloat(this.form.money)
            if (this.form.amount == '') {
                this.$message.warning('请输入卡号！')
                return
            }
            let amount = parseFloat(this.form.amount)
            if (m + amount < 0) {
                this.$message.warning('卡余额不足！')
                return
            }

        },
    },
    // watch data changed
    watch: {
        'form.amount': {
            handler(val, oldval) {
                // console.log(val, oldval)
                // let i = document.getElementById('input-amount')
                // // console.log(i.getAttribute('class'))
                // if (i.classList.contains('input-amount_red')) {
                //     i.classList.remove('input-amount_red')
                // }
                // i.classList.add('input-amount_red')
            }
        }
    }
}