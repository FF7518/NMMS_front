import bus from '@/utils/bus'

export default {
    data() {
        return {
            isCMClick: false,
            auth_card: false,
            auth_member: false,
            auth_deposit: false,
            auth_sys: false,
            account: 'Access Ungranted（请确认您是否具有访问权限！）'
        }
    },
    created() {
        bus.$off('auth')
        console.log('created func')
        let unchanged = false

        bus.$on('auth', (L) => {
            console.log(L)
            this.auth_card = !L.auth_card
            this.auth_member = !L.auth_member
            this.auth_deposit = !L.auth_deposit
            this.auth_sys = !L.auth_sys
            this.account = L.account
            unchanged = true
        })
        bus.$emit('isReady',true)

    },
    components: {

    },
    mounted() {

    },
    methods: {
        onCardmanageClick() {
            if (this.isCMClick) {
                this.isCMClick = false
            } else this.isCMClick = true
        },

    }
};