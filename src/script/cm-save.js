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
        'message': '1111'
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


export default {
    data() {
        return {
            item: '',
            addAmount: 0,
        }
    },
    created() {
        bus.$off('current_card')
        bus.$on('current_card', (cid)=>{
            // console.log(cid)
            let len = fakeData.length
            for (let i = 0; i < len; ++i) {
                if (fakeData[i]['cid'] == cid) {
                    this.item = fakeData[i]
                    console.log(this.item.status)
                    break
                }
            }
        })
    },
    mounted() {

    },
    methods: {
        submit() {
            console.log(this.addAmount )
            this.item.amount += this.addAmount
            console.log(this.item.amount)
        },
        inputChange(value) {
            // console.log(value)
            this.addAmount = value
        },
    },
}