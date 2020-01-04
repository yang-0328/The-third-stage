var str = `
<div class="aside">
<h2>留言板</h2>
<ul>
    <li :class="{on:current == 'index'}"><a href="./index.html">列表页</a></li>
    <li :class="{on:current == 'add'}"><a href="./add.html">新增页</a></li>
    <li :class="{on:current == 'info'}"><a href="javascript:;">详情页</a></li>
</ul>
</div>
`
Vue.component("asides",{
    props:["current"],
    template:str
})