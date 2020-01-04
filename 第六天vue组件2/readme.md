# vue
## 生命周期
### 生命周期定义
从Vue实例创建、运行、到销毁期间，总是伴随着各种各样的事件，这些事件，统称为生命周期(生命周期钩子)！
### 生命周期钩子 
生命周期钩子就是生命周期事件的别名；常用两个 created mounted 带before的钩子都没啥用 created mounted用作获取数据
### 生命周期函数分类
+ 创建期间的生命周期函数：
    - beforeCreate：实例刚在内存中被创建出来，此时，还没有初始化好 data 和 methods 属性
    - created：实例已经在内存中创建OK，此时 data 和 methods 已经创建OK，此时还没有开始 编译模板(模板 比如`{{}}`)
    - beforeMount：此时已经完成了模板的编译，但是还没有挂载到页面中
    - mounted：此时，已经将编译好的模板，挂载到了页面指定的容器中显示
+ 运行期间的生命周期函数：
    - beforeUpdate：状态更新之前执行此函数， 此时 data 中的状态值是最新的，但是界面上显示的 数据还是旧的，因为此时还没有开始重新渲染DOM节点
    - updated：实例更新完毕之后调用此函数，此时 data 中的状态值 和 界面上显示的数据，都已经完成了更新，界面已经被重新渲染好了！

+ 销毁期间的生命周期函数：
    - beforeDestroy：实例销毁之前调用。在这一步，实例仍然完全可用。
    - destroyed：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 
![生命周期图解](./imgs/imgs.png "生命周期图解")

## 组件简介
   组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码，减少项目的代码量。
组件系统让我们可以用独立可复用的小组件来构建大型应用，几乎任意类型的应用的界面都可以抽象为一个组件树：
![组件图解](https://cn.vuejs.org/images/components.png "组件图解")
## 组件类型
### 组件注册类型
+ 全局注册  全局注册的组件可以用在其被注册之后的任何 (通过 new Vue) 新创建的 Vue 根实例，也包括其组件树中的所有子组件的模板中。
```html
 <div id="app">
        <com></com>
    </div>
    <script>
        // 全局组件
        Vue.component("com",{
            data(){
                return {
                    num : 10
                }
            },
            template:"<h2>{{ num }}</h2>"
        })
        var vm = new Vue({
            el : "#app"
        })
    </script>
```
+  局部注册 只能在当前页面中使用
```html
 <div id="app">
            <com></com>
            <com1></com1>
    </div>
    <script>
        // 局部注册组件
        
        var vm = new Vue({
            el : "#app",
            components: {
                "com":{
                    data () {
                        return {
                            info:"我是局部注册的组件"
                        }
                    },
                    template:"<h3>{{ info }}</h3>"
                },
                "com1":{
                    data () {
                        return {
                            info:"我是局部注册1的组件"
                        }
                    },
                    template:"<h3>{{ info }}</h3>"
                }
            }
        })
    </script>
```
> 组件的大小写问题 
在dom里面是不识别大写的 浏览器会把标签中的大写转换成小写  如果要识别的话需要用-连接 如
```html
<div id="app">
        <H2>标题</H2>
        <is-show></is-show>
    </div>
    <script>
        // 局部注册组件
        
        var vm = new Vue({
            el : "#app",
            components: {
                "isShow":{
                    data () {
                        return {
                            info:"我是局部注册的组件"
                        }
                    },
                    template:"<h3>{{ info }}</h3>"
                }
            }
        })
    </script>
```
在页面里面就会渲染成
![组件大小写](https://raw.githubusercontent.com/208895638/teachVue/master/%E6%88%AA%E5%9B%BE/%E7%BB%84%E4%BB%B6%E5%A4%A7%E5%B0%8F%E5%86%99.jpg "组件大小写")

> 组件的特点
 
 1. data 必须是一个函数
 2. 组件是密封的 组件之间的数据是相互独立的 也就是说即使写几个组件 更改其中的某一个组件之间的值 其他的组件也不会受到影响
 3. 组件模板中只能有一个根元素
 4. 每个组件都有自己的内部状态和方法(data  methods) 组件里面的状态是互不影响的

> 组件传值 组件是密封的 所有想给某个组件传值 vue提供了props 通过props传值 这个props是写在我们组件里面的一个属性 传值通过这个属性来传值的
```html
<div id="app">
        <is-show prop1="父组件传递的数据" :parinfo="parinfo"></is-show>
    </div>
    <script>
        // 局部注册组件
        
        var vm = new Vue({
            el : "#app",
            data(){
                return {
                    parinfo:"我是父组件的数据"
                }
            },
            components: {
                "is-show":{
                    props:[
                        "prop1",
                        "parinfo"
                    ],
                    data () {
                        return {
                            info:"我是局部注册的组件"
                        }
                    },
                    template:"<h3>{{ info }} {{ prop1 }} {{ parinfo }}</h3>"
                }
            }
        })
    </script>
```
> props类型检测 props类型  有八种类型
作用就是对我们传递的数据进行类型检查 
1. String
2. Number
3. Boolean
4. Array
5. Object
6. Date
7. Function
8. Symbol
> 单向数据流 父级 prop 的更新会向下流动到子组件中，但是反过来则不行 如果我们实在想改变这个传值 我们用data或者计算属性来代替这个传值
缺点是值是更改了 但原数据没有改变
```
 components: {
                "is-show":{
                    // props:[
                    //     "prop1",
                    //     "parinfo",
                    //     "list"
                    // ],
                    props:{
                        parinfo:Boolean
                    },
                    data () {
                        return {
                            info:"我是局部注册的组件",
                            infos : this.parinfo
                        }
                    },
                    methods: {
                        changeParent(){
                            this.infos = !this.infos;
                        }
                    },
                    template:`<div>
                                <h3> {{ infos }}</h3>
                                <button @click="changeParent">改变父元素传值</button>
                            </div>`
                }
            }
```
> 子组件向父元素传递值  通过自定义事件来完成
 
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="lib/vue.js"></script>
</head>
<body>
    <div id="app">
            {{  childInfo }}
        <is-show  :parinfo="parinfo" @childevents="parEvents"></is-show>
    </div>
    <script>
        // 局部注册组件
        
        var vm = new Vue({
            el : "#app",
            data(){
                return {
                    parinfo:"我是父组件的数据",
                    childInfo:""
                }
            },
            methods:{
                parEvents(val){
                    this.childInfo = val;
                    console.log("我是子组件传递过来的数据",val)
                }
            },
            components: {
                "is-show":{
                    props:[
                        "parinfo"
                    ],
                    data () {
                        return {
                            info:"我是局部注册的组件"
                        }
                    },
                    methods: {
                        mes(){
                            this.$emit("childevents",this.info)  //  @childevents="parEvents"
                            console.log("我是子组件里面的事件",this)
                        }
                    },
                    template:"<h3 @click='mes'>{{ info }} {{ parinfo }}</h3>"
                }
            }
        })
    </script>
</body>
</html>
```

> 子组件与子组件进行通信  通过bus(中央事件总线)传递  首先子组件传递事件名称  另外一个组件在生命周期函数中响应这个事件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="lib/vue.js"></script>
</head>
<body>
    <div id="app">
        <zujian1 :mes="childInfo"></zujian1>
        <zujian2 @event="parEvents"></zujian2>
    </div>
    <script>
        // 局部注册组件   bus 
        var bus = new Vue();
        var vm = new Vue({
            el : "#app",
            data(){
                return {
                    parinfo:"我是父组件的数据",
                    childInfo:""
                }
            },
            methods:{
                parEvents(val){
                    this.childInfo = val;
                    console.log("我是子组件传递过来的数据",val)
                }
            },
            components: {
                "zujian1": {
                    props:["mes"],
                    data(){
                        return {
                            get1:""
                        }
                    },
                    created () {
                        var that = this;
                        var mess =  bus.$on("busevent",val=>{
                                console.log(that , this);
                                this.get1 = val;
                                //return val
                            });
                    },
                    // computed: {
                    //     getMes(){
                    //        var mess =  bus.$on("busevent",function(val){
                    //             console.log(val,"接收的数据");
                    //             return val
                    //         });
                    //         return mess
                    //     }
                    // },
                    template :"<h3>组件 传递过来的值是{{ mes }} {{ get1 }}</h3>"
                },
                "zujian2": {
                    data(){
                        return {

                        }
                    },
                    methods:{
                        post2(){
                            //this.$emit("event",1)
                            bus.$emit("busevent",1);
                        }
                    },
                    template :"<h3 @click='post2'>组件2传递数据</h3>"
                },
            }
        })
    </script>
</body>
</html>
```


> .sync 修饰符  我们可以对我们传入的数据进行更改 写法是在我们需要给组件传递的数据加一个.sync  在更改的时候传一个 this.$emit("update:+我们接收的属性");
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="lib/vue.js"></script>
</head>
<body>
    <div id="app">
        <com :message.sync= "mes"></com>
    </div>
    <script>
        var vm = new Vue({
            el : "#app",
            methods: {
                
            },
            data(){
                return {
                    mes : "父元素里面的值"
                }
            },
            components: {
                "com":{
                    props: ["message"],
                    template:"<h3 @click='changeProp'>子组件 {{message}}</h3>",
                    methods:{
                        changeProp(){
                            //this.message = "改变之后的";
                            this.$emit('update:message', "改变之后的")
                            //this.$emit("undate:message","改变之后的")
                        }
                    }
                }
            }
            
        })
    </script>
</body>
</html>
```