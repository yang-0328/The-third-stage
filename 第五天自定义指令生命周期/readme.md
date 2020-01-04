## 自定义指令
常见的指令如 v-text v-model都是vue封装好的语法糖 
我们也可以封装自己的指令(用于对dom执行某些操作)
封装自己的指令是通过directives来执行的
指令的主要作用就是可以操作dom
### 常用指令钩子函数 
+ bind：
只调用一次，指令第一次绑定到元素时调用(这个时候还没插入dom)。在这里可以进行一次性的初始化设置。(不可以执行input的focus 因为指令绑定到元素 但元素还没插入到dom)
bind：进行样式修改之类的操作
+ inserted：
当指令绑定的元素插入到dom时执行的钩子函数
inserted：进行JS中的有关操作
### 常用指令钩子参数  
+ el  
指代的是绑定自定义指令的那个元素  
+ binding 
当前自定义指令对象 
  - name 
指令名，不包括 v- 前缀
  - value
指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2
  - expression
字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
  
### 指令简写 
在很多时候，在 bind 和 update 时触发相同行为，而不关心其它的钩子,可以把指令简写 
```html
<script>
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
</script>

```
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
        <input type="text" v-aaa v-if="isShow">
        <button @click="isShow = !isShow">
          取反
        </button>
    </div>
    <script>
      var that ;
      var vm = new Vue({
        el:"#app",
        data(){
          return {
            info:111,
            isShow:false
          }
        },
        created () {
          console.log("我是混入的对象!");
          that = this;
        },
        directives: {
          aaa(el){
              console.log(el,this,that);
               that.$nextTick(function(){
                el.focus()
                })
              // setTimeout(()=>{
              //   el.focus()
              // })
              
          }
        }
      });
    </script>
  </body>
</html>

```

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
