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
  { title: '卡号', dataIndex: 'cid', key: 'cid', scopedSlots: { customRender: 'cid' } },
  { title: '余额', dataIndex: 'amount', key: 'amount', scopedSlots: { customRender: 'amount' } },
  { title: '折扣', dataIndex: 'discount', key: 'discount', scopedSlots: { customRender: 'discount' } },
  { title: '种类', dataIndex: 'type', key: 'type', scopedSlots: { customRender: 'type' } },
  { title: '操作', dataIndex: 'operation', scopedSlots: { customRender: 'operation' } },
]

const selectRecordColumns = [
  { title: '编号', dataIndex: 'deposit_id', key: 'deposit_id' },
  { title: '卡号', dataIndex: 'cid', key: 'cid' },
  { title: '操作', dataIndex: 'deposit_type', key: 'deposit_type' },
  { title: '明细', dataIndex: 'amount', key: 'amount' },
  { title: '时间', dataIndex: 'time', key: 'time' }
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
          console.log(page)
        },
        pageSize: 6,
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
      // this.getCardInfo(key)
      // this.getMemberInfo(key)
      this.getMemberAndCardInfo(key)
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
    inputSearchCard(e) {
      // console.log(e)
      // console.log(this.searchValue)
      this.listData = this.AllData
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
        url: '/card/get_card_list',
        // params

      }).then((response) => {
        this.listData = []
        console.log(response.data.length)
        // 同步到列表
        var listLen = response.data.length
        for (var i = 0; i < listLen; ++i) {
          this.listData.push({
            cid: response.data[i]['cid'],
            amount: response.data[i]['amount'],
            discount: response.data[i]['discount'],
            type: response.data[i]['type']
          });
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