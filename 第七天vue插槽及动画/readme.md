
## 插槽
   Vue 实现了一套内容分发的 API，将 <slot> 元素作为承载分发内容的出口。
   插槽（Slot）是Vue提出来的一个概念，正如名字一样，插槽用于决定将所携带的内容，插入到模板template指定的某个位置，从而使模板分块，具有模块化的特质和更大的重用性。
   插槽显不显示、怎样显示是由父组件来控制的，而插槽在哪里显示就由子组件来进行控制。
   没有插槽的情况下在组件标签内些一些内容是不起任何作用的，当我在组件中声明了slot元素后，在组件元素内写的内容就会跑到它这里了！
### 插槽详解 
`插槽是父组件与子组件新的通讯的方式，可以将父组件里面的内容显示到子组件中(包括标签)`
### 默认插槽 slot

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
        <div>123</div>
        <com>
            <div>
                插入组件的标签
            </div>
            456
        </com>
    </div>
    <script>
        var vm = new Vue({
            el:"#app",
            components: {
                "com" : {
                    template:"<h2>子组件<slot></slot></h2>"
                }
            }
        })
    </script>
</body>
</html>
```
### 编译作用域
父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。
```html
<div id="app">
        {{ red }}
        <com1></com1>
    </div>
    <script>
      var vm = new Vue({
        el: "#app",
        data(){
            return {
                isActive : true,
                red:"red"
            }
        },
        components: {
          com1 : {
            data(){
              return {
                info:"子组件内容"
              }
            },
            template:"<h2>我是子组件{{ info }} {{ red }}</h2>"    // Property or method "red" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property.
          }
        }
      });
    </script>
```
### 后备内容
在组件中没有写入内容的时候默认展示的内容  
```html
<div id="app">
        {{ red }}
        <com1></com1>
    </div>
    <script>
      var vm = new Vue({
        el: "#app",
        data(){
            return {
                isActive : true,
                red:"red"
            }
        },
        components: {
          com1 : {
            data(){
              return {
                info:"子组件内容"
              }
            },
            template:"<h2>我是子组件{{ info }}<slot>我是插槽的默认内容</slot></h2>"
            
          }
        }
      });
    </script>
```
### 具名插槽
 用于标记往哪个具名插槽中插入子组件内容。
 简单理解就是 给每一个 slot 一个name属性，
	父组件中 使用子组件标签时用的v-slot:name
	要跟子组件的name匹配上，才会渲染出来
  需要template
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
        
        <com>
            <template v-slot:header>
                <h1>标题</h1>
            </template>
            <template v-slot:main>
                <h2>内容</h2>
            </template>
            <template v-slot:footer>
                <h3>底部内容</h3>
            </template>
        </com>
    </div>
    <script>
        var vm = new Vue({
            el:"#app",
            data () {
                return {
                    info:1
                }
            },
            components: {
                "com" : {
                    template:`
                    <div class="container">
                        <header>
                            <slot name="header"></slot>
                        </header>
                        <main>
                            <slot name="main"></slot>
                        </main>
                        <footer>
                            <slot name="footer"></slot>
                        </footer>
                    </div>
                    `
                }
            }
        })
    </script>
</body>
</html>
```
### 作用域插槽  用作访问我们组件里面的属性 
可以理解为子组件传递数据到父组件
template内可以通过临时变量props来访问来自子组件插槽的数据msg
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
        <com>
            <template v-slot:default="slotProps">
                {{ slotProps.names }} {{ slotProps.age }}
            </template>
        </com>
    </div>
    <script>
        var vm = new Vue({
            el : "#app",
            data(){
                return {
                    list:[
                        {
                            name:"张三",
                            age : 40
                        },
                        {
                            name:"李四",
                            age : 40
                        },
                    ]
                }
            },
            components: {
                com : {
                    props: ['list'],
                    data(){
                        return {
                            names:"张三",
                            age:40
                        }
                    },
                    template:`
                        <h2>子组件内容<slot :names="names" :age="age"></slot></h2>
                    `
                }
            }
        })
    </script>
</body>
</html>
```
> 动态组件  让多个组件使用同一个挂载点(components)，并动态切换，这就是动态组件。
动态组件缓存
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <script src="05-vue/lib/vue.js"></script>
    <style>
        .on{
            color: red;
        }
    </style>
  </head>
  <body>
    <div id="app">
        <ul>
          <li v-for="item in list" :key="item.name" @click="currentComponents = item.components">{{ item.name }}</li>
        </ul>
        <div class="box">
          <keep-alive>
              <component :is="currentComponents"></component>
          </keep-alive>
          
        </div>
    </div>
    <script>
      var vm = new Vue({
        el: "#app",
        data(){
            return {
                isActive : true,
                red:"red",
                currentComponents:"com1",
                list:[
                  {
                    name : "组件1",
                    components:"com1"
                  },
                  {
                    name : "组件2",
                    components:"com2"
                  },
                  {
                    name : "组件3",
                    components:"com3"
                  },
                ]
            }
        },
        components: {
          com1 : {
            data(){
              return {
                info:"组件1"
              }
            },
            template:"<p>{{ info }}</p>"
          },
          com2 : {
            data(){
              return {
                info:"组件2"
              }
            },
            template:"<p>{{ info }}</p>"
          },
          com3 : {
            data(){
              return {
                info:"子组件内容",
                nowIndex:100
              }
            },
            template:`
              <ul>
                <li @click="nowIndex = 1" :class="{on : nowIndex == 1}">张三</li>  
                <li @click="nowIndex = 2" :class="{on : nowIndex == 2}">李四</li>  
                <li @click="nowIndex = 3" :class="{on : nowIndex == 3}">王五</li>  
              </ul>
            `
          }
        }
      });
    </script>
  </body>
</html>

```

## 处理边界情况（一些特殊的情况的写法）
> vue中以$开头的是代表vue实例中所具有的属性或方法
> 访问元素 & 组件 

### 访问根元素中的属性或方法

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <script src="05-vue/lib/vue.js"></script>
    <style>
        .on{
            color: red;
        }
    </style>
  </head>
  <body>
    <div id="app">
        <com1></com1>
    </div>
    <script>
      var vm = new Vue({
        el: "#app",
        data(){
            return {
                rootInfo:"我是根元素的属性"
            }
        },
        methods: {
          alerts(){
            alert(111)
          }
        },
        components: {
          com1 : {
            data(){
              return {
                info:"组件1"
              }
            },
            template:"<p>{{ info }} <com2></com2></p>",
            components:{
              com2:{
                template:"<p>我是组件1的子组件</p>",
                created () {
                  console.log(this.$root.alerts())
                }
              }
            }
          }
        }
      });
    </script>
  </body>
</html>
```
### 访问父元素的属性或方法 this.$parent

### 访问子组件实例或子元素 this.$ref


##  vue的可复用性与组合
> 混入 混入 (mixins) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。
比如 vue有可复用的属性的方法的话 可以把可复用的属性或者方法提取出来 未来有某个组件需要用到这个属性或者方法  可以把这个属性或者方法直接混入到这个组件里面

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <script src="05-vue/lib/vue.js"></script>
    
  </head>
  <body>
    <div id="app">
        
    </div>
    <script>
      var objs = {
        el:"#app",
        data(){
          return {
            info:111
          }
        },
        created () {
          console.log("我是混入的对象!");
        }
      }
      //var vm = new Vue(objs);
      var vm = new Vue({
        mixins: [objs]
      });
    </script>
  </body>
</html>

```


## filter过滤器
VueJs 提供了强大的过滤器API，能够对数据进行各种过滤处理，返回需要的结果。
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <script src="05-vue/lib/vue.js"></script>
    
  </head>
  <body>
    <div id="app">
        <ul>
          <li v-for="item in list " :key="item.name">{{ item.name }}  {{ item.age }} {{ item.money | fil1 | fil }}</li>
        </ul>
    </div>
    <script>
      var that ;
      var vm = new Vue({
        el:"#app",
        data(){
          return {
            list:[
              {
                name : "张三",
                age : 40,
                money:100
              },
              {
                name : "王五",
                age : 20,
                money:200
              },
              {
                name : "李四",
                age : 30,
                money:300
              },
            ]
          }
        },
        filters:{
          fil1(val){
            return val*2
          },
          fil(val){
            console.log(val );
            return val+"元"
          }
        },
        created () {
          console.log("我是混入的对象!");
          that = this;
        },
        
      });
    </script>
  </body>
</html>

```

## vue过渡动效

vue提供的过渡效果  Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。

> 单元素/组件的过渡 通过vue提供的组件transition来进行过渡
> 过渡的类名 
+ v-enter 定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
+ v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
+ v-enter-to: 2.1.8版及以上 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。
+ v-leave: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
+ v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
+ v-leave-to: 2.1.8版及以上 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。
![图片示例](https://cn.vuejs.org/images/transition.png "图片示例")
+ 过渡小案例  渐隐渐现
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <script src="./lib/vue.js"></script>
    <style>
        .v-enter{
            opacity: 0;
        }
        .v-enter-active{
            transition: .3s ease-in;
        }
        .v-enter-to{
            opacity: 1;
        }
        .v-leave{
            opacity: 1;
        };
        .v-leave-active{
            transition: .3s ease-in;
        }
        .v-leave-to{
            opacity: 0;
        }
    </style>
  </head>
  <body>
    <div id="app">
       <transition>
           <h2 v-if="isShow" >h2标签</h2>
           <p v-else >p标签</p>
       </transition>
        <button @click="isShow = !isShow">div动画</button>
    </div>
    <script>
      var vm = new Vue({
        el: "#app",
        data(){
            return {
                rootInfo:"我是根元素的属性",
                isShow:false,
                boxShow:true
            }
        },
        methods: {
        },
        
      });
    </script>
  </body>
</html>
```
### 结合animate.css实现复杂的动画效果
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <script src="lib/vue.js"></script>
    <style>
        .animated{
            animation-duration: 4s!important;
        }
    </style>
    <link rel="stylesheet" href="https://daneden.github.io/animate.css/animate.min.css">
  </head>
  <body>
    <div id="app">
        <!-- enter-active-class 动画进入时将要执行的类名 -->
        <!-- leave-active-class 动画离开时将要执行的类名 -->
        <!-- duration 过渡持续时间 -->
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" 
        :duration="{ enter : 4000 , leave : 3000}">
            <div class="box" v-if="boxShow">

              </div>
              <h2 v-else>h2标签</h2>
        </transition>
        <button @click="boxShow = !boxShow">div动画</button>
    </div>
    <script>
      var vm = new Vue({
        el: "#app",
        data(){
            return {
                rootInfo:"我是根元素的属性",
                isShow:false,
                boxShow:true
            }
        },
        methods: {
          alerts(){
            alert(111)
          }
        },
        
      });
    </script>
  </body>
</html>

```







