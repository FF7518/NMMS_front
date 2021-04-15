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
  
  },
  methods: {
    // 表单相关操作
    onSubmit() {
      this.addCard()
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
      console.log(e)
    },
    onAmountChange(e) {
      console.log(e)
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

    // 网络http
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

      })
    },
    getCardInfo() {
      this.baseAxios({
        method: 'get',
        url: '/card/get_card_info',
        // params

      }).then((response) => {
        this.listData = []
        console.log(response.data.length)
        // 同步到列表
        var listLen = response.data.length
        for (var i = 0; i < listLen; ++i) {
          this.listData.push({
            // href: 'https://www.antdv.com/',
            title: `会员卡  ${i}`,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description:
              '信息',
            content:
              response.data[i],
          });
        }
        console.log(this.listData)
      })
    }
  },
};