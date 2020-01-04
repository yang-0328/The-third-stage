var str = `
<div class="top">
<div class="l">
    <a href="./index.html">vue项目练习</a>
</div>
<div class="r" v-if="!usercount">
    <a href="./login.html">暂未登陆</a>
</div>
<div class="box" v-else>
    <a href="javascript:;" class="r" @blur="hides"  @click="logout = !logout">
        用户登陆账号:{{ usercount }}
    </a>
    <div v-if="logout" class="logout" @click="logouts">
        退出登陆
    </div>
</div>

</div>
`
Vue.component("headers",{
    template:str,
    data () {
        return {
            isLogin:false,
            usercount:"",
            logout:false,
            account:""
        }
    },
    created () {
        if(localStorage.getItem("account")){
            this.usercount = localStorage.getItem("account");
        }else{
            console.log(window.location)
            if(window.location.pathname == "/login.html"){

            }else{
                alert("没有登陆，跳转到登录页")
                window.location.href="./login.html";
            }
           
        }
    },
    methods: {
        logouts(){
            localStorage.removeItem("account");
            window.location.href="./login.html"
        },
        hides(){
            setTimeout(()=>{
                this.logout = false;
            },200)
        }
    }
})