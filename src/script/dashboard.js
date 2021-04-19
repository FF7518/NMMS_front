// import CardSale from '@/components/CardSale.vue'
import bus from '@/utils/bus'
import Moment from 'moment'

export default {
  data() {
    return {
      collapsed: false,
      authList: [true, true, true, true],
      auth_card: true,
      auth_member: true,
      auth_deposit: true,
      auth_sys: true,
      account: '',
      L: {},
      time: Moment(new Date()).format('YYYY年MM月DD日 HH:mm:ss'),
    };
  },
  mounted() {
    let _this = this
    this.timer = setInterval(() => {
      _this.time = Moment(new Date()).format('YYYY年MM月DD日 HH:mm:ss')
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.onQuit()
  },
  created() {
    // 鉴权
    this.getAdminAuth()
    bus.$off('isReady')
    bus.$on('isReady' , (val) => {
      if (val) {
        bus.$emit('auth', this.L)
      }
    })
  },
  components: {
    // 'cardSale' : CardSale
  },
  methods: {
    getAdminAuth() {
      this.baseAxios({
        method: 'get',
        url: '/admin/get_admin_info',
        params: { aid: window.sessionStorage.getItem('aid') }
      }).then((res) => {
        // console.log(window.sessionStorage.getItem('aid'))
        console.log(res.data)
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

        this.account = res.data.account

        let L = {}
        L.auth_card = this.authList[0]
        L.auth_member = this.authList[1]
        L.auth_deposit = this.authList[2]
        L.auth_sys = this.authList[3]
        L.account = res.data.account
        bus.$emit('auth', L)
        this.L = L
        // window.sessionStorage.setItem('auth', L)
      }).catch((error) => {
        this.loading = false
        console.error(error);
        this.$message.error("网络异常！" + error);
      })
      // console.log(this.authList)
      // console.log('this.authList')
    },
    onBackToMainpage() {
      console.log('click')
      bus.$emit('auth', this.L)
      this.$router.push('/dashboard/mainpage')
    },

    // exit sys
    onQuit() {
      // console.log('quit')
      window.sessionStorage.clear()
      bus.$off('auth')
      this.$message.warning('您已退出！')
    }
  }
};