var str = `
<div class="top">
<img src="http://bufantec.com/pages/tec/static/img/bd_logo.png" alt="">
<ul>
    <li :class="{on: currentname == 'a'}">
        <a href="./a.html">首页</a>
    </li>
    <li :class="{on:currentname == 'b'}">
        <a href="./b.html">项目案例</a>
    </li>
    <li :class="{on:currentname == 'c'}">
        <a href="./c.html">加入我们</a>
    </li>
    <li :class="{on:currentname == 'd'}">
        <a href="./d.html">联系我们</a>
    </li>
</ul>
</div>
`
Vue.component("headers",{
    template:str,
    data () {
        return {
            current:"a"
        }
    },
    props:["currentname"]
})