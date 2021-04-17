// import CardSale from '@/components/CardSale.vue'

export default {
  data() {
    return {
      collapsed: false,
      authList: [true, true, true, true],
      auth_card: true,
      auth_member: true,
      auth_deposit: true,
      auth_sys: true,
    };
  },
  created() {
    // 鉴权
    this.getAdminAuth()
  },
  components: {
    // 'cardSale' : CardSale
  },
  methods: {
    getAdminAuth() {
      this.baseAxios({
        method: 'get',
        url: '/admin/get_admin_info',
        params: { aid : window.sessionStorage.getItem('aid')}
      }).then((res) => {
        // console.log(window.sessionStorage.getItem('aid'))
        // console.log(res.data)
        let auth = parseInt(res.data.auth)
        // comfirm auth
        // 0001 : 会员卡管理
        // 0010 : 用户管理
        // 0100 : 消费管理
        // 1000 : 系统管理
        if (auth & 0b0001) {
          this.authList[0] = false
        } 
        if (auth & 0b0010) {
          this.authList[1] = false
        } 
        if (auth & 0b0100) {
          this.authList[2] = false
        } 
        if (auth & 0b1000) {
          this.authList[3] = false
        } 
        this.auth_card = this.authList[0]
        this.auth_member = this.authList[1]
        this.auth_deposit = this.authList[2]
        this.auth_sys = this.authList[3]
      })
      // console.log(this.authList)
      // console.log('this.authList')
    },
  }
};