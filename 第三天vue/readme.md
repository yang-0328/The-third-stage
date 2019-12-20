# vue
## vue入门
###  vue简介
Vue.js（读音 /vjuː/, 类似于 view） 是一套构建用户界面的 渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，并且非常容易学习，非常容易与其它库或已有项目整合。另一方面，Vue 完全有能力驱动采用单文件组件和 Vue 生态系统支持的库开发的复杂单页应用
### vue引入

 1. [开发版本](https://cdn.jsdelivr.net/npm/vue/dist/vue.js)  包含完整的警告和调试模式

 2. [生产版本](https://cdn.jsdelivr.net/npm/vue) 删除了警告，33.30KB min+gzip


### vue 插值及常用指令 

**下面所有的例子必须在引入vue的前提下才能运行**

### `{{ }}`

 用来插入文本内容及执行简单的函数

```html
<div id="app">
    <div>
        {{  name }}    
    </div>
</div>
<script>
    var vm = new Vue({
        el : "#app", // 需要挂载到某个元素上
        data(){ // 数据仓库
            return {
                name : "王五1111"
            }
        }
    })
</script>
```
### 指令  v-text v-html  

- v-text是用于操作纯文本，它会替代显示对应的数据对象上的值。当绑定的数据对象上的值发生改变，插值处的内容也会随之更新。
- v-html用于输出html，它与v-text区别在于v-text输出的是纯文本，浏览器不会对其再进行html解析，但v-html会将其当html标签解析后输出。

```html
<!-- 例 v-text -->
<div id="app">
    <div v-text="name"></div>
</div>
<script>
    var vm = new Vue({
        el : "#app", // 需要挂载到某个元素上
        data(){ // 数据仓库
            return {
                name : "王五1111"
            }
        }
    })
</script>
```

```html
<!-- 例 v-html -->
<div id="app">
    <div v-html="name"></div>
</div>
<script>
    var vm = new Vue({
        el : "#app", // 需要挂载到某个元素上
        data(){ // 数据仓库
            return {
                name : "<span>王五</span>"
            }
        }
    })
</script>
```

### v-if v-show

- 指令v-show 控制元素的显示和隐藏  特点是vue在渲染有v-show的节点时这个节点的样式为display:none
- v-if 也是控制元素的显示和隐藏 如果隐藏的话在页面里面这个节点是不会渲染的

```html
<!-- v-if v-show 区别 -->
<div id="app">
  {{ name }}
  <div v-if="isShow">age : {{ age }}</div>
  <div v-show="isShow">age : {{ age }}</div>
</div>

<script>
  var vm = new Vue({
    el: "#app",
    data() {
      return {
        name: "王五",
        age: 30,
        isShow: false
      };
    }
  });
</script>
```
![结果](https://raw.githubusercontent.com/208895638/teachVue/master/%E6%88%AA%E5%9B%BE/v-if%20v-show%E7%9A%84%E5%8C%BA%E5%88%AB.jpg "v-if和v-show的区别")
+ v-if v-else-if v-else vue的条件语句
  - v-if 控制元素的显示和隐藏
  - v-else-if 前一兄弟元素必须有 v-if 或 v-else-if。
  - v-else 前一兄弟元素必须有 v-if 或 v-else-if。
```html
<div id="app">
    <div v-if="age>30">
        {{ name }}
    </div>
    <div v-else-if="age == 30">
        {{ name2 }}
    </div>
    <div v-else>
        {{ name1 }}
    </div>
</div>

<script>
  var vm = new Vue({
    el: "#app",
    data() {
      return {
        name: "王五",
        name1: "李四",
        name2:"张三",
        age: 30,
        isShow: false
      };
    }
  });
</script>
```
### v-for 

基于源数据多次渲染元素或模板块。此指令之值，必须使用特定语法 `alias in expression` ，为当前遍历的元素提供别名：

- v-for 循环的时候必须绑定key值,vue是根据这个key值判断元素，key值是唯一的，一般用id表示

```html
<ul>
    <li v-for="(item , index) in list" :key="item.id">
        {{ item.title }}
    </li>
</ul>
<script>
var vm = new Vue({
  el: "#app",
  data() {
    return {
      list:[
          {
              name : '张三',
              id:1
          },
          {
              name : '李四',
              id:2
          },
          {
              name : '王五',
              id:3
          }
      ]
    };
}})
</script>
      
```
### v-bind

` 绑定标签中的某一个属性   `v-bind`可以去掉 直接用一个:表示

- `v-bind`简写 `:` 用一个冒号表示

```html
  <h2 v-bind:title="title">
      我是标签
  </h2>
  <script>
    var vm = new Vue({
      el: "#app",
      data() {
        return {
          title:"标签"
        };
    }})
  </script>
```
### v-once

只在页面里面渲染一次 

### v-model

Vue的核心特性之一是双向绑定，vue的响应式原理是实现了数据－>视图，接下来我们要学习 视图－>数据的原理。v-model
> 用法：
v-model指令用来在input、select、textarea、checkbox、radio等表单控件或者组件上创建双向绑定。
你可以用 v-model 指令在表单控件元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 v-model 本质上不过是语法糖，它负责监听用户的输入事件以更新数据，并特别处理一些极端的例子。

+ 双向绑定文本

```html
<div id="demo">
    <input v-model="message" placeholder="edit me">
    <p>Message is: {{ message }}</p>
</div>
<script type="text/javascript">
    var app=new Vue({
        el:'#demo',
        data:{
            message:'hello vue'
        }
    });
</script>
```
+ 多行文本 

```html
<div id="demo">
    <span>Multiline message is:</span>
    <p style="white-space: pre">{{ message }}</p>
    <br>
    <textarea v-model="message" placeholder="add multiple lines"></textarea>
</div>
<script type="text/javascript">
    var app=new Vue({
        el:'#demo',
        data:{
            message:'hello vue'
        }
    });
</script>
```
+ 复选框
  - 单个勾选框，
```html
<div id="demo">
    <input type="checkbox" id="checkbox" v-model="checked">
    <label for="checkbox">{{ checked }}</label>
</div>
<script type="text/javascript">
    var app=new Vue({
        el:'#demo',
        data:{
            checked:false
        }
    });
</script>
```
+ 多个勾选框，绑定到同一个数组：
```html
<div id="demo">
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames">
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
    <label for="mike">Mike</label>
    <br>
    <span>Checked names: {{ checkedNames }}</span>
</div>
<script type="text/javascript">
    var app=new Vue({
        el:'#demo',
        data:{
            checkedNames: []
        }
    });
</script>
```
+ 单选按钮 
```html
<div id="demo">
    <input type="radio" id="one" value="One" v-model="picked">
    <label for="one">One</label>
    <br>
    <input type="radio" id="two" value="Two" v-model="picked">
    <label for="two">Two</label>
    <br>
    <span>Picked: {{ picked }}</span>
</div>
<script type="text/javascript">
    var app=new Vue({
        el:'#demo',
        data:{
                picked: ''
        }
    });
</script>
```
+ 选择列表 
```html
<div id="demo">
    <select v-model="selected">
    <option>A</option>
    <option>B</option>
    <option>C</option>
    </select>
    <span>Selected: {{ selected }}</span>
</div>
<script type="text/javascript">
    var app=new Vue({
        el:'#demo',
        data:{
                selected: null
        }
    });
</script>
```
### v-model 修饰符
修饰符 对绑定的数据起修饰作用
+ .lazy 
在默认情况下， v-model 在 input 事件中同步输入框的值与数据 ，但可以添加一个修饰符 lazy ，从而转变为在 change 事件中同步：
```html
<!-- 在 "change" 而不是 "input" 事件中更新 -->
<input v-model.lazy="msg" >
```
+ .number
如果想自动将用户的输入值转为 Number 类型，可以添加一个修饰符 number 给 v-model 来处理输入值：
```html
<input v-model.number="age" type="text">
```
+ .trim 
如果要自动过滤用户输入的首尾空格，可以添加 trim 修饰符到 v-model 上过滤输入： 
```html
<input v-model.trim="msg">
```

### v-on指令 
绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。
在监听原生 DOM 事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 $event **属性： **v-on:click="handle('ok', $event)"。
+ v-on执行简单的表达式
```html
<div id="example-1">
  <button v-on:click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
<script>
var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})
</script>
```
+ v-on执行函数 
```html
<div id="example-1">
  <button v-on:click="add">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
<script>
var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  },
  methods:{
      add(){
          this.counter ++ ;
      }
  }
})
</script>
```
+ v-on简写 @
```html
<button @click="alert(1)"></button>
```
+ 常用事件函数
用v-on 给每个按钮分别添加不同的事件，来向数组追加元素。
```html
<div id="box">
    <input type="button" value="按钮1click" v-on:click='add()' />
    <input type="button" value="按钮2mouseover" v-on:mouseover='add()' />
    <input type="button" value="按钮3mouseout" v-on:mouseout='add()' />
    <input type="button" value="按钮4mousedown" v-on:mousedown='add()' />
    <input type="button" value="按钮5mouseup" v-on:mouseup='add()' />
    <input type="button" value="按钮6dblclick" v-on:dblclick='add()' />
    <hr />
    <ul>
        <li v-for='value in arr'>
            {{value}}
        </li>
    </ul>
</div>
<script type="text/javascript">
    new Vue({
        el: '#box',
        data: {
            arr:['apple','banana','orange','pear']
        },
        methods:{
            add:function(){//方法
                this.arr.push('tomato')
            }
        }
    })
</script>
```
+ 事件对象
有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 $event 把它传入方法：

```html
<div id="box">
    <input type="button" value="按钮" v-on:click="show()"/>
    <input type="button" value="按钮" @click="show($event)"/>
    <input type="button" value="按钮" @click="show($event,12)"/>
</div>
<script type="text/javascript">
    new Vue({
        el: '#box',
        data: {
            
        },
        methods:{
            show:function(ev,b){
                //相对与浏览器可视区域的坐标
                alert(ev.clientX);
                alert(b)
            }
        }
    })
</script>
```

### 事件修饰符 

在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

为了解决这个问题，Vue.js 为 v-on 提供了事件修饰符。之前提过，修饰符是由点开头的指令后缀来表示的。
常用事件修饰符
+ .stop
阻止事件冒泡 
+ .prevent
阻止默认事件 
+ .capture  实现事件捕获机制 默认事件触发从里到外 capture实现事件触发从外到里
即是给元素添加一个监听器，当元素发生冒泡时，先触发带有该修饰符的元素。若有多个该修饰符，则由外而内触发。
就是谁有该事件修饰符，就先触发谁。
+ .self 使用self实现点击当前元素的时候才触发事件处理函数 可以理解为变相的阻止事件冒泡
+ .once 事件只触发一次
```html
<!-- capture 事件捕获 -->
<div id="app">
        <div class="box" @click.capture="boxEvents">
            <div class="inner" @click="innerEvents">
                里面的内容
            </div>
        </div>
    </div>
    <script>
        var vm = new Vue({
            el:"#app",
            data () {
                return {
                    
                }
            },
            methods: {
                boxEvents(){
                    console.log("boxEvents")
                },
                innerEvents(){
                    console.log("innerEvents")
                }
            }
        })
    </script>
```
```html
<!-- self -->
<div id="app">
        <div class="box" @click.self="boxEvents">
            <div class="inner" @click="innerEvents">
                里面的内容
            </div>
        </div>
    </div>
    <script>
        var vm = new Vue({
            el:"#app",
            data () {
                return {
                    
                }
            },
            methods: {
                boxEvents(){
                    console.log("boxEvents")
                },
                innerEvents(){
                    console.log("innerEvents")
                }
            }
        })
    </script>
```
```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>
```

+ 按键修饰符 

在监听键盘事件时，我们经常需要检查详细的按键。Vue 允许为 v-on 在监听键盘事件时添加按键修饰符： 

```html
<div id="box"> 
    <!-- 回车 13 -->
    <input type="text" value="按钮" @keyup.13="show()"/>
    <input type="text" value="按钮" @keyup.enter="show()"/>
    <input type="text" value="按钮" @keyup.up="show()"/>
    <input type="text" value="按钮" @keyup.down="show()"/>
    <input type="text" value="按钮" @keyup.left="show()"/>
    <input type="text" value="按钮" @keyup.right="show()"/>
</div>
<script type="text/javascript">
    new Vue({
        el: '#box',
        data: {
            
        },
        methods:{
            show:function(){
                alert("你按回车了")
            }
        }
    })
</script>
```
## Class 与 Style 绑定
操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是属性，所以我们可以用 v-bind 处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将 v-bind 用于 class 和 style 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。

### class绑定
+ 三元运算符 
```html
    <div id="app">
      <div :class=" num <= 10 ? 'on' : 'green'">
        1234
      </div>
    </div>
    <script>
      var vm = new Vue({
        el: "#app",
        data(){
            return {
                num : 9
            }
        }
      });
    </script>
```
+ 对象语法
  - 绑定单个class
```html
<!-- 下面表示 active 这个 class 存在与否将取决于数据属性 -->
<div v-bind:class="{ active: isActive }"></div>
```
  - 绑定多个class
```html
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
```
+ 数组语法 
可以把一个数组传给 v-bind:class，以应用一个 class 列表：
```html
<div v-bind:class="[activeClass, errorClass]"></div>
<script>
var vm = new Vue({
    el: "#app",
    data(){
        return {
            activeClass: 'active',
            errorClass: 'text-danger'
        }
    }
});
</script>
```

### 内联样式绑定 
v-bind:style 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：
+ 对象语法
```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<div v-bind:style="styleObject"></div>
<script>
var vm = new Vue({
    el: "#app",
    data(){
        return {
            activeColor: 'red',
            fontSize: 30,
            styleObject: {
                color: 'red',
                fontSize: '13px'
            }
        }
    }
});
</script>
```
+ 数组语法
```html
<div v-bind:style="[baseStyles, overridingStyles]"></div>
<script>
    let vm = new Vue({
        el: '#app',
        data: {
            baseStyles: {
                color: 'green',
                fontSize: '30px'
            },
            overridingStyles: {
                'font-weight': 'bold'
            }
        }
    });
</script>
```

