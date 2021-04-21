import bus from '@/utils/bus'
import { times } from 'lodash';


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
    'message': ''
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




// 设置会员卡表表头
const columns = [
  { title: '卡号', dataIndex: 'cid', key: 'cid', scopedSlots: { customRender: 'cid' }, align: 'center', },
  { title: '余额', dataIndex: 'amount', key: 'amount', scopedSlots: { customRender: 'amount' }, align: 'center', },
  { title: '折扣', dataIndex: 'pre_discount', key: 'discount', scopedSlots: { customRender: 'discount' }, align: 'center', },
  { title: '种类', dataIndex: 'pre_type', key: 'type', scopedSlots: { customRender: 'type' }, align: 'center', },
  { title: '操作', dataIndex: 'operation', scopedSlots: { customRender: 'operation' }, align: 'center', },
]

const selectRecordColumns = [
  { title: '编号', dataIndex: 'deposit_id', key: 'deposit_id' },
  { title: '卡号', dataIndex: 'cid', key: 'cid' },
  { title: '操作', dataIndex: 'deposit_type', key: 'deposit_type' },
  { title: '明细', dataIndex: 'amount', key: 'amount' },
  { title: '时间', dataIndex: 'time', key: 'time', width: '40%' }
]

var listData = []


export default {
  data() {
    return {
      columns,
      listData: listData,
      AllData: null,
      selectRecordColumns,
      pagination: {
        onChange: page => {
          // console.log(page)
        },
        pageSize: 15,
      },
      searchTags: [
        {
          key: '2',
          text: '折扣卡'
        },
        {
          key: '1',
          text: '储值卡'
        },
        {
          key: '0',
          text: '全部'
        }
      ],
      searchKey: '',
      searchValue: "",
      current_card: '',
      drawerTitle: '',
      isDrawerVisible: false,
      selectItem: '',
      selectMember: '',
      selectRecord: [],
    };
  },
  created() {
    this.getCardList()
  },
  methods: {
    afterDrawerVisibleChange(val) {

    },
    async getDepositById(key) {
      this.baseAxios({
        method: 'get',
        url: '/deposit/get_deposit_bycard',
        params: { cid: key }
      }).then((res) => {
        this.selectRecord = []
        for (let i = 0; i < res.data.length; ++i) {
          this.selectRecord.push({
            'deposit_id': res.data[i]['deposit_id'],
            'cid': res.data[i]['cid'],
            'deposit_type': res.data[i]['deposit_type'],
            'amount': res.data[i]['amount'],
            'time': res.data[i]['time']
          })
        }
      })
    },
    async getMemberAndCardInfo(key) {
      this.baseAxios({
        method: 'get',
        url: '/card/get_memberandcard_info',
        params: { cid: key }
      }).then((res) => {
        this.selectItem = {
          'cid': '',
          'amount': '',
          'type': '',
          'discount': '',
          'status': '',
          'message': '',
        }
        this.selectItem['cid'] = res.data['cid']
        this.selectItem['amount'] = res.data['amount']
        this.selectItem['type'] = res.data['type']
        this.selectItem['discount'] = res.data['discount']
        this.selectItem['status'] = res.data['status']
        this.selectItem['message'] = res.data['message']
        this.selectMember = {
          'mid': '',
          'name': '',
          'identity': '',
          'phonenumber': '',
        }
        this.selectMember['mid'] = res.data['mid']
        this.selectMember['name'] = res.data['name']
        this.selectMember['identity'] = res.data['identity']
        this.selectMember['phonenumber'] = res.data['phonenumber']
      })
    },
    async getCardInfo(key) {
      this.baseAxios({
        method: 'get',
        url: '/card/get_card_info',
        params: { cid: key }
      }).then((res) => {
        this.selectItem = {
          'cid': '',
          'amount': '',
          'type': '',
          'discount': '',
          'status': '',
          'message': '',
        }
        this.selectItem['cid'] = res.data['cid']
        this.selectItem['amount'] = res.data['amount']
        this.selectItem['type'] = res.data['type']
        this.selectItem['discount'] = res.data['discount']
        this.selectItem['status'] = res.data['status']
        this.selectItem['message'] = res.data['message']
      })
    },
    async getMemberInfo(key) {
      this.baseAxios({
        method: 'get',
        url: '/card/get_member_info',
        params: { cid: key }
      }).then((res) => {
        this.selectMember = {
          'mid': '',
          'name': '',
          'identity': '',
          'phonenumber': '',
        }
        this.selectMember['mid'] = res.data['mid']
        this.selectMember['name'] = res.data['name']
        this.selectMember['identity'] = res.data['identity']
        this.selectMember['phonenumber'] = res.data['phonenumber']
      })
    },
    showDrawer(key) {
      this.isDrawerVisible = true
      console.log(key)
      this.getCardInfo(key)
      this.getMemberInfo(key)
      // this.getMemberAndCardInfo(key)
      this.getDepositById(key)
    },
    onDrawerClose() {
      this.isDrawerVisible = false
      this.selectItem = {}
      this.selectMember = {}
      this.selectRecord = []
    },
    cardSelect(text, index) {
      return {
        on: {
          click: () => {
            this.current_card = text.cid
            // console.log('you choose ', this.current_card)
            bus.$emit('current_card', this.current_card)
          }
        }
      }
    },
    groupSearch() {
      this.listData = JSON.parse(JSON.stringify(this.AllData))
      this.listData = this.listData.filter(item => {
        // cid
        let c1 = true
        if (this.searchValue != '') {
          c1 = item.cid.toString().match(this.searchValue)
        }
        if (c1 == null) {
          c1 = false
        }

        // type
        let c2 = true
        // console.log(this.searchKey) // 0 1 2
        if (this.searchKey == '1' || this.searchKey == '2') {
          c2 = item.type.toString().match(this.searchKey)
        }

        return c1 && c2
      })
    },
    inputSearchCard(e) {
      // console.log(e)
      // console.log(this.searchValue)
      this.listData = JSON.parse(JSON.stringify(this.AllData))
      this.listData = this.listData.filter(record => {
        return record['cid'].toString().match(this.searchValue)
      })
    },
    searchCard(value) {
      // console.log('searchCard',value)
      if (value == 1 || value == 2) {
        this.listData = this.AllData
        this.listData = this.listData.filter(record => {
          return record['type'].toString().match(value)
        })
      }
      else {
        this.listData = this.AllData
      }
    },
    onListMore() {
      alert("你点击了！！")
    },
    getCardList() {
      this.baseAxios({
        method: 'get',
        url: '/card/get_card_listnd',
        // params

      }).then((res) => {
        this.listData = []

        for (let d of res.data) {
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
          this.listData.push(d)
        }
        console.log(this.listData)
        this.AllData = this.listData
      })

      // this.listData = fakeData


    },
    cardSelectHandle(text, record, index) {
      // console.log(text, record, index)
      this.showDrawer(record.cid)
      this.drawerTitle = record.cid
    }
  }
};