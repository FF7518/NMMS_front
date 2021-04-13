import bus from '@/utils/bus'


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
        'cid':2 ,
        'amount': 500,
        'discount': 80,
        'type': '2',
        'status': 'normal',
        'message': ''
    },
    {
        'cid':3 ,
        'amount': 1000,
        'discount': 80,
        'type':'2' ,
        'status': 'normal',
        'message': ''
    },
    {
        'cid': 4,
        'amount':580.43 ,
        'discount': 100,
        'type': '1',
        'status':'normal' ,
        'message': ''
    },
    {
        'cid': 5,
        'amount':932 ,
        'discount':100 ,
        'type':'1' ,
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
    {title:'卡号', dataIndex:'cid', key: 'cid', scopedSlots:{customRender:'cid'}},
    {title:'余额', dataIndex:'amount', key:'amount', scopedSlots:{customRender:'amount'}},
    {title:'折扣', dataIndex:'discount', key:'discount', scopedSlots:{customRender:'discount'}},
    {title:'种类', dataIndex:'type', key:'type', scopedSlots:{customRender:'type'}},
    {title:'操作', dataIndex:'operation', scopedSlots:{customRender:'operation'}},
  ]
  
  var listData = []
  
  
  export default {
    data() {
      return {
        columns,
        listData: listData,
        AllData: null,
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
      };
    },
    created() {
      this.getCardInfo()
    },
    methods: {
      cardSelect(text, index) {
        return {
            on : {
                click: () => {
                    this.current_card = text.cid
                    // console.log('you choose ', this.current_card)
                    bus.$emit('current_card', this.current_card)
                }
            }
        }
      },
      searchCard(value) {
        // console.log('searchCard',value)
        if (value == 0) {
            this.listData = fakeData
            return
        }
        this.listData = fakeData.filter(record => {
            return record['type'].toString().match(value)
        })
      },
      onListMore() {
        alert("你点击了！！")
      },
      getCardInfo() {
        // this.baseAxios({
        //   method: 'get',
        //   url: '/card/get_card_info',
        //   // params
  
        // }).then((response)=>{
        //   this.listData = []
        //   console.log(response.data.length)
        //   // 同步到列表
        //   var listLen = response.data.length
        //   for(var i = 0; i < listLen; ++i) {
        //     this.listData.push({
        //       cid: response.data[i]['cid'],
        //       amount: response.data[i]['amount'],
        //       discount: response.data[i]['discount'],
        //       type: response.data[i]['type']
        //     });
        //   }
        //   console.log(this.listData)
        //   this.AllData = this.listData
        // })

        this.listData = fakeData


      },
      cardSelectHandle(text, record, index) {
        console.log(text, record, index)
      }
    }
  };