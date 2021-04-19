

export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },
    created() {
        window.sessionStorage.removeItem('aid')
    },
    methods: {
        onUsernameInputChange(value) {
            // console.log(this.username)
        },
        onPasswordInputChange(value) {

        },
        submit() {
            console.log(this.username, this.password)
            this.check()
        },
        // axios发送进行后端校验，成功返回aid，否则返回0
        check() {
            this.baseAxios({
                method: 'post',
                url: '/admin/admin_login_check',
                data: { 'account': this.username, 'password': this.password }
            }).then((res) => {
                // console.log(res.data)
                if (res.data == 0) {
                    this.$message.error("用户名或密码错误！");
                } else {
                    var session = window.sessionStorage
                    console.log(session)
                    session.setItem('aid', JSON.stringify(res.data))
                    console.log(session)
                    this.$router.push('/dashboard')
                }
            }).catch((error) => {
                console.error(error);
                this.$message.error("网络异常！" + error);
            })
        },
        // 如果成功，将信息存入cookies

    },
}