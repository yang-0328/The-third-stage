### 计算属性 computed
 computed 在`vue中一些数据经常依赖于别的数据做出改变`，且改变的逻辑也较复杂，这个时候就需要用到计算属性 computed通俗来说就是当前数据不是确定的，要经常做出改变，而这个`改变是其他数据改变导致的`。只要在计算属性函数里引用了 data 中的某个属性，当这个属性发生变化时，函数就可以可以嗅探到这个变化，并且执行某些操作。

当其**依赖的属性的值**发生变化时，计算属性会重新计算，反之，则使用缓存中的属性值。


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="./lib/vue.js"></script>
</head>
<body>
    <div id="app">
           <div>
               <button @click="a++">
                    点我a++
               </button>
               <button @click="b++">
                    点我b++
               </button>
           </div>
           <div>
               a + b = {{ total }}
           </div>
    </div>
    <script>
        var vm = new Vue({
            el:"#app",
            data(){
                return {
                   a:1,
                   b:2
                }
            },
            computed:{
                total(){
                    return this.a + this.b;
                }
            }
        })
    </script>
</body>
</html>
```
> 计算属性特点
+ 计算属性本质是一个方法 但调用的时候不加括号

+ 计算属性所依赖的数据变化必然会触发计算属性的重新求值

+ 计算属性的值会缓存(当多次访问计算过的结果  那么返回的将是计算过的结果)；

  

### 计算属性的getter和 setter

计算属性相当于定义了一个属性，在页面中可以进行使用，相当于在data里面定义一个属性,但是和data里面的属性也有区别，data里面的属性可以进行读取和赋值操作，计算属性默认只能获取而不能修改，如果需要修改，可以通过setter进行修改

当你读取一个变量的时候会触发该变量的getter. 当你修改该变量时候会触发他的setter.

```
<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="UTF-8">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <meta http-equiv="X-UA-Compatible" content="ie=edge">

 <title>Document</title>

 <!-- vue.js 引入 -->

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

</head>

<body>

  <div id="app">

​    <h2>数据求和</h2>

        <div>

​      请输入第一个数字<input type="text" v-model.number="firstNum">

​    </div>

        <div>

​      请输入第二个数字<input type="text" v-model.number="secondNum">

​    </div>

        <div>

​      总数:<input type="text" v-model.number="total">

​    </div>

 </div>



  <script>

  var app = new Vue({

   el: '#app',

   data () {

​    return {

​      secondNum: '',

​      firstNum: ''

​    }

   },

   computed: {

​    total:{

​      get() {

​        return this.secondNum + this.firstNum

​      },

​      set(val){

​        if(val == ""){

​          this.firstNum = 1;

​          this.secondNum = 1;

​        }else{

​           var num = parseInt(Math.random()*10);

​          this.firstNum = num;

​          this.secondNum = val - num;

​        }

​        

​      }

​    }

   }

  })

 </script>

</body>

</html>
```



### 侦听器 

使用侦听器 可以监听data中数据的变化 然后触发watch中的函数变化
```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="./lib/vue.js"></script>
</head>
<body>
    <div id="app">
           <input type="text" v-model="message">
           {{ message }}
           {{ num }}
    </div>
    <script>
        var message = 11
        var vm = new Vue({
            el:"#app",
            watch: {
                // 如果 `question` 发生改变，这个函数就会运行
                message: function (newVal, oldVal) {
                    console.log("newVal" ,newVal )
                    console.log( "oldVal" ,oldVal)
                    this.num ++
                },
                // 侦听器侦听某个属性内部的变化
                // obj:{
                //     handler(){
                //         console.log("数据变化了");
                //     },
                //     deep:true
                // }
            },
            data(){
                return {
                    num : 10,
                    message
                }
            }
        })
    </script>
</body>
</html>

```
### watch深度监听

watch:{} 对象，可监听数据，数据发生变化， 处理函数

目的： watch虽可监听，但只是浅监听，只监听数据第一层或者第二层，

何为第二层？

 `let obj = {name: 'xx', child: {age: 11}};`

 child之后的值就为第二层或者深层

实现目标: 如果 要监听一个对象中的属性，属性最高也是第二层了，watch可能监听不到，

 所以要使用深度监听：deep属性

```
<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

  <title>Title</title>

</head>

<body>

<script type="text/javascript" src="./lib/vue.js"></script>

<div id="app">

    <div>watch监听器</div>

  <input type="text" v-model="msg.text">

</div>



<script type="text/javascript">

  new Vue({

​    el:'#app',

​    data(){

​      return {

​        msg:{text:''},

​      }

​    },

​    // 深度监听

​    watch:{

​      msg:{

​        handler(val, oldval){

​          if(val.text == 'bufan'){

​            alert('不凡学院位于郑州')

​          }

​        },

​        deep:true//开启深度监听

​      }

​    }

  })

</script>

</body>

</html>
```



### 侦听器与计算属性的不同

1.  计算属性一进入页面 就会执行  侦听器 只有当数据更改的时候才会执行
2.  侦听器监听的数据不能更改 计算属性当依赖的属性更改的时候会自动执行 
3.  计算属性会缓存结果
4.  计算属性必须return一个值 而watch不需要


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

