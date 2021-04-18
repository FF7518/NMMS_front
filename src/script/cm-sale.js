// import reqwest from 'reqwest';

var listData = []

export default {
  data() {
    return {
      // form
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      isDiscountDisabled: true,
      isPanelOpen: true,
      form: {
        cid: '',
        amount: 0.00,
        discount: 100,
        type: '1',
        status: 'normal',
        name: '',
        phonenumber: '',
        identity: '',
      },
      // list
      listData: listData,
      // drawer
      isDrawerVisible: false,
      // list内部分页
      pagination: {
        onChange: page => {
          console.log(page)
        },
        pageSize: 10,
      },

    };
  },
  mounted() {

  },
  created() {
    this.$message.info('售卡管理业务')
    this.getCardList()
  },
  methods: {
    refresh() {
      this.form = {
        cid: '',
        amount: 0.00,
        discount: 100,
        type: '1',
        status: 'normal',
        name: '',
        phonenumber: '',
        identity: '',
      }
    },
    // 表单相关操作
    onSubmit() {
      this.addCard()
      this.refresh()
    },
    onCancel() {
      this.refresh()
    },
    onCardtypeChange(e) {
      // alert(e.target.value)
      if (e.target.value == 2) {
        this.isDiscountDisabled = false
      }
      else {
        this.isDiscountDisabled = true
      }
    },
    onDiscountChange(e) {
      // console.log(e)
    },
    onAmountChange(e) {
      // console.log(e)
    },

    // 抽屉 事件函数
    afterDrawerVisibleChange(val) {
      console.log('visible', val)
    },
    showDrawer(key) {
      this.isDrawerVisible = true
    },
    onDrawerClose() {
      this.isDrawerVisible = false
    },

    // List Item上的点击 more
    onListMore() {
      alert("你点击了！！")
    },
    /* 正文 */
    onCardIDSearch() {
      this.getCardInfo()
    },
    onIdentitySearch() {
      this.getMemberInfobyIdentity()
    },
    getCardInfo() {
      this.baseAxios({
        method: 'get',
        url: '/card/get_card_info',
        params: { cid: this.form.cid }
      }).then((res) => {
        console.log(res.data)
        if (res.data.cid) {
          this.$message.warning('卡号已经存在！')
        } else {
          this.$message.success('有效的卡号')
        }
      })
    },
    getMemberInfobyIdentity() {
      // console.log(this.form.identity)
      this.baseAxios({
        method: 'get',
        url: '/member/get_member_infobyidentity',
        params: { identity: this.form.identity }
      }).then((res) => {
        // console.log(res.data)
        if (res.data.mid && parseInt(res.data.mid) > 0) {
          this.form.name = res.data.name
          this.form.phonenumber = res.data.phonenumber
        } else {
          this.form.name = ''
          this.form.phonenumber = ''
        }
      })
    },
    // add
    addCard() {
      console.log('submit!', this.form)
      // alert(JSON.stringify(this.form))
      // const newCard = JSON.stringify(this.form)
      this.baseAxios({
        url: '/card/insert_card_info',
        method: 'post',
        data: this.form,
      }).then((response) => {
        console.log(response.data)
        // alert(response.data)
        if (response.data == true) {
          this.$message.success('操作成功！')
        } else {
          this.$message.error('操作失败！')
        }
      }).catch((error) => {
        this.loading = false
        console.error(error);
        this.$message.error("网络异常！");
      })
    },
    getCardList() {
      this.baseAxios({
        method: 'get',
        url: '/card/get_card_list',
        // params

      }).then((response) => {
        this.listData = []
        for (let d of response.data) {
          this.listData.push(d);
        }
        // console.log(this.listData)
      })
    }
  },
};