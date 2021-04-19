const auth_card = '[会员卡管理]'
const auth_member = '[用户管理]'
const auth_deposit = '[消费管理]'
const auth_sys = '[系统管理]'

const options = [
    { label: '会员卡管理', value: 1 },
    { label: '用户管理', value: 2 },
    { label: '消费管理', value: 4 },
    { label: '系统管理', value: 8 },
]

const columns = [
    {
        title: '编号',
        dataIndex: 'aid',
        key: 'aid',
        align: 'center',
    },
    {
        title: '账号',
        dataIndex: 'account',
        key: 'account',
        align: 'center',
    },
    {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
        scopedSlots: { customRender: 'password' },
        align: 'center',
    },
    {
        title: '权限',
        dataIndex: 'auth',
        key: 'auth',
        scopedSlots: { customRender: 'auth' },
        // align: 'center',
    },
    {
        title: '查看',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
    }
]


export default {
    data() {
        return {
            // search
            searchAdmin: {
                'byAdminType': 'aid',
                'adminInfo': '',
            },
            columns,
            adminData: [],
            listData: [],
            isInfoModalVisible: false,
            isAddModalVisible: false,
            currentAdmin: {},
            currentAuthList: [],
            addAdmin: {},
            addAuthList: [],
            options,
        }
    },
    created() {
        this.getAdminList()
    },
    methods: {
        async getAdminList() {
            this.baseAxios({
                method: 'get',
                url: '/admin/get_admin_list',
            }).then((res) => {
                this.adminData = []
                for (let d of res.data) {
                    // console.log(d)
                    this.adminData.push({
                        'aid': d['aid'],
                        'account': d['account'],
                        'password': d['password'],
                        'auth': d['auth']
                    })
                }
                this.displayPrepared()
            }).catch((e) => {
                this.loading = false
                console.error(e);
                this.$message.error("网络异常！" + e);
            })
        },
        // 展示数据封装
        displayPrepared() {
            this.listData = []
            // 因为我需要两个独立的数组，所以必须深拷贝
            // 而下面这种对于多维数组而言是浅拷贝
            // this.listData = [...this.adminData]

            // deep copy
            this.listData = JSON.parse(JSON.stringify(this.adminData))

            for (let d of this.listData) {
                // console.log(d)
                d['password'] = '******'
                let auth = parseInt(d.auth)
                let authSeq = []
                if (auth & 0b0001) {
                    authSeq.push(auth_card)
                }
                if (auth & 0b0010) {
                    authSeq.push(auth_member)
                }
                if (auth & 0b0100) {
                    authSeq.push(auth_deposit)
                }
                if (auth & 0b1000) {
                    authSeq.push(auth_sys)
                }
                d['auth'] = authSeq.join(' ')
            }
            // console.log(this.adminData)
        },
        // how to show
        adminSelectHandle(text, record, index) {
            this.currentAdmin = {}
            this.currentAuthList = []
            this.currentAdmin.aid = record.aid
            this.currentAdmin = this.adminData.filter((item) => {
                return item.aid == this.currentAdmin.aid
            })[0]

            let d = this.currentAdmin.auth
            if (d - 8 >= 0) {
                d -= 8
                this.currentAuthList.push(8)
            }
            if (d - 4 >= 0) {
                d -= 4
                this.currentAuthList.push(4)
            }
            if (d - 2 >= 0) {
                d -= 2
                this.currentAuthList.push(2)
            }
            if (d - 1 >= 0) {
                d -= 1
                this.currentAuthList.push(1)
            }

            this.isInfoModalVisible = true
        },
        // del
        adminDeleteHandle(text, record, index) {
            // console.log(text ,record, index)
            this.currentAdmin = {}
            this.currentAuthList = []
            this.currentAdmin.aid = record.aid
            this.baseAxios({
                method: 'post',
                url: '/admin/delete_admin_list',
                params: { aid: this.currentAdmin.aid }
            }).then((res) => {
                // console.log(res.data)
                
                if (res.data == true) {
                    this.$message.success('删除成功！')
                    this.getAdminList()
                }
                else {
                    this.$message.error('删除失败！')
                }
            }).catch((e) => {
                this.loading = false
                console.error(e);
                this.$message.error("网络异常！" + e);
            })

        },
        // update
        onCheckBoxChange(values) {
            this.currentAuthList = values
        },
        onAddCheckboxChange(values) {
            this.addAuthList = values
        },
        onInfoModalSubmit(e) {
            var auth = 0
            for (let i of this.currentAuthList) {
                auth += i
            }
            this.currentAdmin.auth = auth
            // console.log(e)
            this.baseAxios({
                method: 'post',
                url: '/admin/update_admin_info',
                data: this.currentAdmin
            }).then((res) => {
                // console.log(res.data)
                if (res.data == true) {
                    this.$message.success('修改成功！')
                    this.getAdminList()
                }
                else {
                    this.$message.error('修改失败！')
                }

            }).catch((e) => {
                this.loading = false
                console.error(e);
                this.$message.error("网络异常！" + e);
            })

            this.isInfoModalVisible = false
        },
        // Add
        onButtonHandle() {
            this.addAdmin = {},
                this.addAuthList = []
            this.isAddModalVisible = true
        },
        onAddModalSubmit() {
            var auth = 0
            for (let i of this.addAuthList) {
                auth += i
            }
            this.addAdmin.auth = auth
            this.baseAxios({
                method: 'post',
                url: '/admin/insert_admin_info',
                data: this.addAdmin
            }).then((res) => {
                // console.log(res.data)
                if (res.data == true) {
                    this.$message.success('新建成功！')
                    this.getAdminList()
                    this.addAdmin = {}
                    this.addAuthList = []
                } else {
                    this.$message.error('新建失败！')
                }

            }).catch((e) => {
                this.loading = false
                console.error(e);
                this.$message.error("网络异常！" + e);
            })


            this.isAddModalVisible = false
        },
        // search
        groupSearch() {
            // console.log('groupSearch')
            this.displayPrepared()
            this.listData = this.listData.filter(item => {
                let c = true
                let type = this.searchAdmin.byAdminType
                let info = this.searchAdmin.adminInfo
                if (type == 'aid') {
                    c = item.aid.toString().match(info)
                } else if (type == 'account') {
                    c = item.account.toString().match(info)
                }
                return c
            })
        },
        onInputSearchChange(value) {
            // console.log(this.searchAdmin.adminInfo)
            if (this.searchAdmin.adminInfo == '') {
                this.displayPrepared()
            }
        },
    }
}