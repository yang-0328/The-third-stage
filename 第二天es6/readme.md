## es6入门

### es6 简介

ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

### let和const 

ES6 新增了`let/const`命令，用来声明变量。它的用法类似于`var`，但是所声明的变量，只在let命令所在的`代码块内`有效。代码块是在大括号 `{}` 中所写的语句,if语句和 for语句里面的{ }也属于块作用域。对于var, 在`function `内部， 加var的是局部变量， 不加var的则是 全局变量；

+ let声明变量及作用域

let不存在变量提升

```html
<!-- 这个例子表面let只在当前代码块内有效 -->
<script>
    {
        var a = 10;
        let b = 20;
        const c = 30;
        {
            console.log(b); 
            let b = 30;
            console.log(b) 
        }
    }
    
</script>
```


```html
<script>
  for (var i = 0; i < 10; i++) {
        setTimeout(function(){
            console.log(i)  // 10次10
        },1000)
      }
      for (let j = 0; j < 10; j++) {
        setTimeout(function(){
            console.log(j)  // 0,1,2,3,4,5,6,7,8,9
        },1000)
      }
</script>
```
+ let/const

let/const声明的变量不能重新被定义 let 可以重新赋值  const不可以赋值 

``` html
<script>
// let i = 10;
// let i = 11;
// console.log(i) // Identifier 'i' has already been declared 
let i = 10;
const j = 20;
i = 30;
console.log(i);
j = 40;
console.log(j)
</script>
```

+ 什么时候使用const 什么时候使用let

如果确定值不会改变 就使用const 如果确定改变的化就使用let

### try catch

我们编译运行程序出错的时候，编译器就会抛出异常。同时程序下面的代码不能执行，这对开发不是很好，但是有一种更为合理的语法结构 `try..catch`，它会在捕捉到异常的同时不会使得代码停止执行而是可以做一些更为合理的操作。

```js
function rand(){

​      var i = Math.random()*10;

​      if(i<5){

​        throw Error ("发生了错误")

​      }else{

​        return i

​      }

​    }

​    try {

​    console.log(rand())

​    } catch (error) {

​    console.log(error)

​    }

​    console.log(22)
```

它按照以下步骤执行：

1. 首先，执行 `try {...}` 里面的代码。
2. 如果执行过程中没有异常，那么忽略 `catch(err)` 里面的代码，`try` 里面的代码执行完之后跳出该代码块。
3. 如果执行过程中发生异常，控制流就到了 `catch(err)` 的开头。变量 `err`（可以取其他任何的名称）是一个包含了异常信息的对象。

### 箭头函数 

箭头函数  ES6 允许使用“箭头”（=>）定义函数。箭头函数实际还是函数
箭头函数的写法 

``` html
<script>
var f = v => v;

// 等同于
var f = function (v) {
    return v;
};
</script>
```
1. 不带参数的写法
```html
<script>
  var f = (a) =>  a 
</script>
```
2. 带一个参数的写法
```html
<script>
  var f = a => a
</script>
```
3. 带多个参数的写法 
```html
<script>
  var f = (a,b) => a+b
</script>
```
4. return 多行写法 
```html
<script>
var f = (a,b) => {
    return a+b;
}
</script>

```
5. 箭头函数的this指向 settimeout会改变this的指向 如果我们用箭头函数 箭头函数就指向父级。
在setInterval和setTimeout中传入函数时，函数中的this会指向window对象。
```html
<script>
var obj = {
    num : 1,
    add:function(){
        setTimeout(() => {
            console.log(this);
        },300)
    }
};
obj.add();
</script>

```
### 函数默认值
在ES6之前，不能直接为函数的参数指定默认值，只能采取变通的方法。
```html
<script>
function log(x,y){
    y = y||'world';
    console.log(x,y);
}
log('hello');//hello world

// es6 写法
function log(x ,y="world"){
    console.log(x,y);
}
log('hello');//hello  world
</script>
```

### 字符串模板 

字符串拼接是开发时一个必不可少的环节，也是很恶心的一个环节，尤其是又臭又长的html字符串拼接。

为什么说html字符串拼接很恶心呢，主要有以下几点：

1. 传统的字符串拼接不能正常换行
2. 传统的字符串拼接不能友好的插入变量 ${}
3. 传统的字符串拼接不能友好的处理单引号、双引号互相嵌套的问题。
es6的模板字符串解决了以上问题

+ 拼接字符串

```html
<script>
    // 以前拼接字符串
    var html = '<ul>'+
        '<li cla="aaa">'+1+'</li>'+
        '<li>2</li>'+
    '</ul>'
    // 现在拼接字符串
    // esc 下面的一个键
    ``
    var html = `<ul>
        <li>1</li>
        <li>2</li>
    </ul>`
</script>
```
+ 插入变量

```html
<script>
    var s1 = `hello vue`;
    var html = `xxx ${s1} xxx` 
    console.log(html) //xxx hello vue xxx
</script>
```

### 变量解构赋值
可以理解为变量的取出
+ 数组的解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构

```html
<script>
    var arr = [1,2,3];
    //var a = arr[0],b = arr[1], c = arr[2];
    [a,b,c] = arr;
    console.log(a,b,c)
</script>
```
上面代码表示，可以从数组中提取值，`按照对应位置`，对变量赋值。
本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
如果解构失败，变量的值等于undefined。

```html
<script>
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [x, y, z] = ['a'];
x // a
y // undefined
z // undefined
</script>
```

+ 对象的解构赋值

解构不仅可以用于数组，还可以用于对象。对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。如果解构失败，变量的值等于undefined。

```html
<script>
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined
</script>
```

### 数组的扩展

+ 扩展运算符
扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为`用逗号分隔的参数序列`。
```html
<script>
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

// 常用场景 合并两个数组
var arr = [1,2],arrs = [3,4];
var newArr = [...arr,...arrs];
console.log(newArr) // [1,2,3,4]
</script>
```

+ Array.from

Array.from方法用于将`类数组对象`转为真正的数组(类数组对象比如arguments)
类数组对象特点 表现像数组 却没有数组该有的方法 比如push

```html
<script>
    function aa(a,b){
        console.log(arguments) //Arguments(2) [1, 2, callee: ƒ, Symbol(Symbol.iterator): ƒ]
        arguments.push(3);
        console.log(arguments) //arguments.push is not a function
    }
    aa(1,2)
    //  想让类数组对象使用数组该有的方法 Array.from转换
     function aa(a,b){
        console.log(arguments) //Arguments(2) [1, 2, callee: ƒ, Symbol(Symbol.iterator): ƒ]
        var arr = Array.from(arguments)
        arr.push(3);
        console.log(arr) //arguments.push is not a function
    }
    aa(1,2)
</script>
```

+ find/findIndex
  - find 
  数组实例的find方法，用于找出`第一个符合条件的数组成员`。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出`第一个返回值为true`的成员，然后返回该成员。`如果没有符合条件的成员，则返回undefined`。
  find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
  ```html
  <script>
      var ele = [1, 5, 10, 15].find(function(value, index, arr) {
        return value > 9;
      }) 
      console.log(ele) // 10
  </script>
  ```
  - findIndex 
  数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的下标，如果所有成员都不符合条件，则返回-1。
  ```html
  <script>
      [1, 5, 10, 15].findIndex(function(value, index, arr) {
        return value > 9;
      }) // 2
  </script>
  ```
### 对象的扩展
`Object.assign`方法用于`对象的合并`，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。`Object.assign`有返回值 返回值是目标对象(target)

```html
<script>
    const target = { a: 1 };
    const source1 = { b: 2 };
    const source2 = { c: 3 };

    Object.assign(target, source1, source2);
    console.log(target) // {a:1, b:2, c:3}
</script>
```

+ 浅拷贝
`Object.assign`方法实行的是浅拷贝，而不是深拷贝。也就是说，如果`源对象某个属性的值是对象`，那么目标对象拷贝得到的是这个对象的引用。
```html
<script>
    const obj1 = {a: {b: 1}};
    const obj2 = Object.assign({}, obj1);

    obj1.a.b = 2;
    obj2.a.b // 2
</script>
```
### Symbol  
ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入Symbol的原因。

+ Symbol 的值都是唯一的 永不相等
```html
<script>
    var s1 = Symbol();
    var s2 = Symbol();
    console.log(s1 === s2); // false
</script>
```
+ 标识 
Symbol函数接受一个可选参数，可以添加一段文本描述即将创建的Symbol，这段属描述不可用于属性访问，但是建议每次创建Symbol时都添加一段描述，便于阅读代码和调试Symbol程序。
```html
<script>
    var s1 = Symbol("我是s1的描述");  //  作用是方便理解这个定义的值是做什么用处
    var s2 = Symbol("我是s2的描述");
    console.log(s1 === s2); // false

    var s3 = Symbol("不凡学院");
    var s4 = Symbol("不凡学院");
    console.log(s3 === s4); // false
</script>
```
  - 获取Symbol里面的描述信息  .description
```html
<script>
    var s3 = Symbol("不凡学院");
    console.log(s3.description); // 不凡学院
</script>
```
+ 作为属性名的 Symbol
   由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
   注意，Symbol 值作为对象属性名时，不能用点运算符。
    -  赋值的第一种方式
```html
<script>
    var s1 = Symbol();
    var obj = {
        name : "张三"
    }
    obj[s1] = 50;
    console.log(obj[s1])
</script>
```
   -  赋值的第二种方式
```html
<script>
    var s1 = Symbol("我是s1")
    var obj = {
        name : "张三",
        [s1] : 40
    }
    console.log(obj[s1])
</script>
```
### Set 和 Map 数据结构

+ Set
ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
Set 本身是一个构造函数，用来生成 Set 数据结构。

```html
<script>
var s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
console.log(s)
// [2 3 5 4]
</script>
```
上面代码通过add方法向 Set 结构加入成员，结果表明 Set 结构不会添加重复的值。

  - size属性
    `Set.prototype.size`：返回Set实例的成员总数。array.length
  - size 方法
    `Set.prototype.add(value)`：添加某个值，返回 Set 结构本身。
    `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。 // 删除成功 返回true 否则 false
    `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为Set的成员。
    `Set.prototype.clear()`：清除 清空set数据结构

```html
<script>
    var s = new Set([1,23,4]);
    s.add(5); // Set(4) {1, 23, 4, 5}
    console.log(s.size) // 4 
    s.delete(1) //
    console.log(s) // Set(3) {23, 4, 5}
    var sets = s.has(23) // 
    console.log(sets) // true
    s.clear() ;
    console.log(s) //Set(0)
</script>
```
   - Set实现数组去重 
```html
<script>
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);
</script>
```

+ Map

ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应(对象,数字,函数都可以作为作为键值)，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。

```html
<script>
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
</script>
```
Map实例的属性和操作方法 
+ size 属性
size属性返回 Map 结构的成员总数。
+ Map.prototype.set(key, value) 
set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。
```html
<script>
    var map = new Map();
    map.set("aa","100");
    console.log(map) // Map(1) {"aa" => "100"}
</script>
```
+ Map.prototype.get(key)
get方法读取key对应的键值，如果找不到key，返回undefined。
```html
<script>
    var map = new Map();
    map.set("aa","100");
    console.log(map.get("aa")) // 100
</script>
```

+ Map.prototype.has(key)
has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
```html
<script>
    var map = new Map();
    map.set("aa","100");
    console.log(map.has("aa")) // true
</script>
```

+ Map.prototype.delete(key)
delete方法删除某个键，返回true。如果删除失败，返回false。
```html
<script>
    var map = new Map();
    map.set("aa","100");
    console.log(map.delete("aa")) // true
</script>
```

+ Map.prototype.clear() 
clear方法清除所有成员，没有返回值。
```html
<script>
    var map = new Map();
    map.set("aa","100");
    map.clear()
    console.log(map) // Map(0) {}
</script>
```
### Proxy

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

```javascript
var proxy = new Proxy(target, handler);
```

```javascript
// 例
var obj = {
    name:""
}
var proxy = new Proxy(obj, {
  get: function(target, propKey) {
    return 35;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35
```

上面代码中，作为构造函数，`Proxy`接受两个参数。第一个参数是所要代理的目标对象，即如果没有`Proxy`的介入，操作原来要访问的就是这个对象；第二个参数是一个配置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作。比如，上面代码中，配置对象有一个`get`方法，用来拦截对目标对象属性的访问请求。`get`方法的两个参数分别是目标对象和所要访问的属性。可以看到，由于拦截函数总是返回`35`，所以访问任何属性都得到`35`。

注意，要使得`Proxy`起作用，必须针对`Proxy`实例（上例是`proxy`对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。

如果`handler`没有设置任何拦截，那就等同于直接通向原对象。

### Proxy常见操作

- **get(target, propKey, receiver)**：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`

  `get`方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。

  ```javascript
  // 如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回undefined。
  var person = {
    name: "张三"
  };
  
  var proxy = new Proxy(person, {
    get: function(target, propKey) {
      if (propKey in target) {
        return target[propKey];
      } else {
        throw new ReferenceError("Prop name " + propKey + " does not exist.");
      }
    }
  });
  
  proxy.name // "张三"
  proxy.age // 抛出一个错误
  ```

- **set(target, propKey, value, receiver)**：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。

  set`方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。

  ```
  var person = {
  
  ​    name: "张三",
  
  ​    age:20
  
     };
  
  
  
     var proxy = new Proxy(person, {
  
  ​    set(target , key , val){
  
  ​      if(key == "age"){
  
  ​        if(val>150){
  
  ​          throw new Error("年龄不符合要求")
  
  ​        }else{
  
  ​          target[key] = val
  
  ​        }
  
  ​      }
  
  ​    }
  
     });
  
     proxy.age = 200;
  ```

  proxy实现双向绑定

  ```
  <div id="app">
        <h2>input框的值为:<span id="val"></span></h2>
        <input type="text" id="ipt" />
      </div>
      <script>
        var ipt = document.getElementById("ipt");
        var span = document.getElementById("val");
        var obj = {
          val: ipt.value
        };
        var proxy = new Proxy(obj, {
          set(target, key, val) {
            span.innerText = val;
            ipt.value = val;
          },
          get(target, propKey) {
            span.innerText = target[propKey];
            return target[propKey];
          }
        });
        document.getElementById("ipt").oninput = function() {
          proxy.val = document.getElementById("ipt").value;
        };
  ```

  

### class

引用类型的数据在使用typeof判断类型的时候返回的都是object  如果向单独的判断引用数据的类型可以使用instanceof来进行判断(`某个对象是不是另一个对象的实例`)
constructor 属性返回对创建此对象的数组函数的引用,指向生成这个实例的函数。。
constructor 返回的是构造函数  而instanceof返回的是true或false

+ es6中的类和对象
  - 对象 
    对象的定义是一组无序的相关属性和方法的集合，所有的事物都是对象

  - class类
    在ES6中，class (类)作为对象的模板被引入，可以通过 class 关键字定义类。class 的本质是 function (class Person() ; typeof Person  == Function)。
    它可以看作一个语法糖，让对象原型的写法更加清晰、更像面向对象编程的语法。

  - 对象和类的区别
    类抽象了对象的公共部分(封装了公共的属性和方法)，他泛指某一大类(class)，
    对象特指某一个，通过类实例化一个具体的对象
    他俩之间的关系可以理解为设计图(类)和实物(对象)的关系

  - 类的使用
  上面是es6 class的写法 下面是es5构造函数的写法
```html
<script>
        class person { // 创建一个person类
            constructor(name){ 
                this.name = name
            }
            ale(){
                alert("我是",this.name)
            }
        }
        var p1 = new person("不凡君"); // 创建person类的实例 需要注意的是使用创建的类必须通过实例化的方式
        console.log(p1.ale())

        // function person(name){
        //     this.name = name;
        // }
        // person.prototype.ale = function(){
        //     alert(this.name)
        // }
        // var p1 = new person("不凡君");
        // console.log(p1.ale())
</script>
```
+ 类的注意事项及特点
  - 构造函数为了与普通函数更好的区分 一般构造函数的首字母都是大写
  - 类里面的constructor(构造函数)函数 可以接收实例传递过来的参数 同时返回实例对象
  - constructor函数 只要new生成实例时 就会自动调用这个函数 即使不写这个函数 也会自动生成
  - 生成实例的时候 new关键字不能省略
  - 类里面的函数 不能加function
  - 类里面的多个函数之间不需要加,
  - 类里面的所有方法都是定义在原型上面
+ 类的继承
利用原型让一个引用类型继承另一个引用类型的属性和方法，即让原型对象等于另一个类型的实例（即要继承的对象的实例）
Class 可以通过extends关键字实现继承 
```html
<script>
    class Point {  }

    class ColorPoint extends Point { 
        constructor() {
            // 关键字super，指向当前实例对象的原型对象
            super() 
            
        }
    }
</script>
```
+ 面向对象案例
```html
<script>
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdn.bootcss.com/jquery/1.10.1/jquery.min.js"></script>
    <style>
        .clearfix:after {
            content: " ";
            display: block;
            height: 0;
            clear: both;
        }
        .clearfix {
            zoom: 1;
        }
        *{
            list-style: none;
        }
        .tab{
            border-bottom: 1px solid red;
        }
        .tab li{
            float: left;
            padding: 10px;
        }
        .tab li:hover{
            color: red;
        }
        .tab .on{
            color: red;
        }
        .box  li{
            display: none;
        }
        .box .on{
            display: block;
        }
    </style>
</head>
<body>
    <div id="main">
        
    </div>
    <div id="main1">

    </div>
    <script>
        class Tab {
            constructor(id , arrs){
                this.id = id;
                this.arrs = arrs;
                this.init();
            }
            init(){
                this.initBox(); // 初始化 容器
                this.initTop(); // 初始化 tab头部栏
                this.initBot(); // 初始化 tab底部栏
            }
            initBox(){
                var str = `<div class="tab clearfix"></div><div class="box clearfix"></div>`
                $(`#${this.id}`).html(str)  ;
            }
            initTop(){ // 初始化tab栏
                var ul = document.createElement("ul")
                var str="";
                for(var i = 0 ; i< this.arrs.length ; i ++){
                    str +=`<li class="${i == 0 ? "on" : ""}" onclick="${this.toggle(this.id , this)}">${this.arrs[i].tabname}</li>`
                }
                ul.innerHTML = str
                $(`#${this.id} .tab`).html(ul);
            }
            initBot(){
                var ul = document.createElement("ul")
                var str="";
                for(var i = 0 ; i< this.arrs.length ; i ++){
                    str +=`<li class="${i == 0 ? "on" : ""}">${this.arrs[i].info}</li>`
                }
                ul.innerHTML = str
                $(`#${this.id} .box`).html(ul);
            }
            toggle(id , that){
                
                $(`#${id} .tab`).on("click","ul li",function(){
                    $(this).addClass("on").siblings().removeClass("on");
                    $(`#${that.id} .box ul li`).removeClass("on").eq($(this).index()).addClass("on");
                })
            }
        }
        var arrs = [
            {
                tabname:"张三",
                info:"张三位于郑州"
            },
            {
                tabname:"李四",
                info:"李四位于上海"
            },
            {
                tabname:"王五",
                info:"王五位于北京"
            },
        ]
        var tabs = new Tab("main" , arrs)
        var tabs1 = new Tab("main1" , arrs)
    </script>
</body>
</html>
</script>
```
### Promise 

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。


```html
<script>
    var p = new Promise(function(resolve , reject){
    setTimeout(() => {
        var num = Math.random()*10;
        if(num>6){
        resolve(num)
        }else{
        reject("小于6")
        }
    }, 1000);
    
    })
    p.then(function(val){
    console.log(val)
    }).catch(function(val){
    console.log(val)
    })
</script>
```
Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。

Promise最大的好处是在异步执行的流程中，把执行代码和处理结果的代码清晰地分离了 解决了层层嵌套 

```html
<script>
    var status = 1,isLogin=false;
       var login = (resolve , reject)=>{
           setTimeout(()=>{
               if(status == 1){
                    isLogin = true
                    resolve({
                        code : 1,
                        token:"ad31nu891nv",
                        msg:"登陆成功!"
                    })
                }else{
                    isLogin = false
                    reject("失败")
                }
           },2000)
            
       };
       var getInfo = (resolve , reject)=>{
            setTimeout(()=>{
                if(isLogin){
                    resolve("获取用户信息成功!")
                }else{
                    reject("获取失败")
                }
            },1000)
       };
       new Promise(login)
       .then(res =>{
           console.log(res);
           return new Promise(getInfo);
       })
       .then(res =>{
            console.log(res);
       })
</script>
```

### async await 
ES2017(es7) 标准引入了 async 函数，使得异步操作变得更加方便。

+ async  await
async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
async  await 最大的好处是让前端有了能力 以同步的方式写异步的代码
  - async 
  async函数返回一个 Promise 对象 语义上理解 当函数前面加上async表示函数内部有异步操作
```html
<script>
    async function main(){ // 声明一个异步函数
        return 1  // return的结果 相当于resolve出去的结果
    }
    console.log(main()) // Promise {<resolved>: 1}
    // 获取async返回的结果通过.then获取
    main().then(res => console.log(res)); // 1
</script>
```
  - await 
      await 关键字要在 async 关键字函数的内部，await 写在外面会报错。
      await右侧如果是函数，那么函数的return值就是「表达式的结果」
      await右侧如果是一个 'hello' 或者什么值，那表达式的结果就是 'hello'
      await关键字会阻塞后面代码的运行
```html
<script>
    async function async1() {
        console.log( 'async1 start' )
        await async2() // 使用await关键字之后 await下面的代码会被阻塞 也就是说会先跳出当前的async1函数  先执行 console.log( 'script start' )
        console.log( 'async1 end' )
    }
    async function async2() {
        console.log( 'async2' )
    }
    async1()
    console.log( 'script start' )
    //  结果会是 
    // async1 start
    // async2
    // script start
    // async1 end
</script>
```
+ 案例
[接口地址](https://apizza.net/pro/#/project/9ea745c6306f56fccb200df4afb1b43d/browse?pass=aa06507e7df25a30a7854e67b660bc2d "接口地址")
```html
<script>
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdn.bootcss.com/jquery/1.10.1/jquery.min.js"></script>
    
</head>
<body>
    <div>
        <p><label for="">请输入用户名：<input type="text" id="names" value="411524" placeholder="请输入用户名"></label></p>
        <p><label for="">请输入密码：<input type="text" id="pass" value="411524" placeholder="请输入密码"></label></p>
        <button onclick="login()">
            登陆
        </button>
        <p id="text"></p>
    </div>
   <script>
    //    需求  登陆之后 查看用户反馈 下面以两种方式给大家演示  用到的接口有 
    //    开发者登陆  https://api.apiopen.top/developerLogin
    //    查看反馈  https://api.apiopen.top/getFeedback
    
    // 第一种 普通的方式  
    function login(){
       doLogin();
    }
    function doLogin(){
        var name = $("#names").val();
        var pass = $("#pass").val();
        $.ajax({
            url:"https://api.apiopen.top/developerLogin",
            type:"post",
            data:{
                name:name,
                passwd:pass
            },
            success(res){ 
                if(res.code == 200){ 
                    getInfo(res)
                }else{
                    alert(res.message)
                }
            }
        })
    }
    function getInfo(val){
        $.ajax({
            url:"https://api.apiopen.top/getFeedback",
            type:"post",
            data:{
                apikey:val.result.apikey,
            },
            success(res){
                $("#text").html(JSON.stringify(res))
            }
        })
    }
    

    // // 第二种方式  es7 的async await 
    // async function login(){
    //     var data = await doLogin();
    //     var msg = await getRes(data.result.apikey);
    //     console.log(msg);
    // }
    // async function doLogin(){
    //     var name = $("#names").val();
    //     var pass = $("#pass").val();
    //     var data = $.ajax({
    //         url:"https://api.apiopen.top/developerLogin",
    //         type:"post",
    //         data:{
    //             name:name,
    //             passwd:pass
    //         }
    //     });
    //     return data
    // }
    // async function getRes(val){
    //     var data = $.ajax({
    //         url:"https://api.apiopen.top/getFeedback",
    //         type:"post",
    //         data:{
    //             apikey:val
    //         }
    //     });
    //     return data
    // }
   </script>
</body>
</html>
</script>
```


### 常用的数组的操作 map、filter、foreach、some、every、includs、find、findIndex 、reduce

+ map() JavaScript 数组map()方法主要创建一个新的数组使用调用此数组中的每个元素上所提供的函数的结果。即对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。对数据进行操作 返回新的数据

```html
<script>
var list = [1,2,3,4];
var newList = list.map(ele =>{
    return ele*2
});
console.log(list,newList) // [1,2,3,4] [2,4,6,8]
</script>

```

+ forEach  方法对数组的每个元素执行一次提供的函数。
foreach 相当于for循环 对数据进行便利
foreach第一个特点 不能对每一项进行更改
第二个特点  不能终止  
```html
<script>
var array1 = ['a', 'b', 'c'];

array1.forEach(function(element) {
  console.log(element);
});

//  "a"
//  "b"
//  "c"
</script>
```
+ filter  方法创建一个新的数组，新数组中的元素是通过`检查指定数组中符合条件的所有元素`。
```html
<script>
var list = [1,2,3,4];
var newList = list.filter(ele => ele > 2);
console.log(list,newList) // [1,2,3,4] [3,4]
</script>
```
+ every()与some()方法都是JS中数组的迭代方法。

every()是对数组中每一项运行给定函数，如果该函数对每一项返回true,则返回true。


some()是对数组中每一项运行给定函数，如果该函数对任一项返回true，则返回true。
```html
<script>
var arr = [ 1, 2, 3, 4, 5, 6 ]; 
 
console.log( arr.some( function( item, index, array ){ 
    return item > 3; 
}));   // true 

console.log( arr.every( function( item, index, array ){ 
    return item > 3; 
}));  // false
</script>

```

+ includes 方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。
```html
<script>
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true
</script>
```
+ find和findIndex find()函数用来查找目标元素，找到就返回该元素，找不到返回undefined，而findIndex()函数也是查找目标元素，找到就返回元素的位置，找不到就返回-1。
```html
<script>
var stu =[
    {
        "name": "张三",
        "gender": "男",
        "age": 20
    },
    {
        "name": "王小毛",
        "gender": "男",
        "age": 20
    },
    {
        "name": "李四",
        "gender": "男",
        "age": 20
    }
]
var item = stu.find((element) => (element.name == '李四'))  // 返回的是{name: "李四", gender: "男", age: 20}
var index = stu.findIndex((element)=>(element.name =='李四'))  // 返回的是索引下标：2
console.log(item , index)
</script>

```
+ reduce 
reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
常用用途用作求和
  - total不带初始值的写法
```html
<script>
 var arr = [1,2,3,4]; 
 //current  当前的元素 total 总和
 var totals = arr.reduce((total,current)=>{
     console.log("total=>",total,"current=>",current,)
     return total = total + current
 })
 console.log(totals)
</script>
```
  - total带初始值的写法
```html
<script>
var totals = arr.reduce((total,current)=>{
    console.log("total=>",total,"current=>",current,)
    return total = total + current
},0)
</script>
```