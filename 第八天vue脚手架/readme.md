## vue-cli(脚手架)
使用vue开发大型项目时，需要考虑到目录结构、项目构建以及部署、热加载、代码单元化测试等事情，如果手动完成这些，效率非常低，一般情况下我们使用脚手架完成这样的工作。在vuejs的生态中，我们可以使用vue-cli来快速的构建项目。

## 使用脚手架的好处
vue-cli是vue官方提供的脚手架工具,脚手架是基于webpack搭建的开发环境 

+ 可以愉快的使用es6语法而不必担心兼容问题

+ 打包和压缩文件为一个js文件 

+ 页面自动刷新 
## npm
npm是安装node之后自带的一个包管理工具 安装依赖通过npm安装  npm install
## 依赖 
项目运行需要的一些东西 这些东西存放在node_modules里面 把node_modules里面的文件叫做依赖
## 淘宝镜像  

安装淘宝镜像之后 我们安装依赖的时候就国内镜像里面安装 

### 搭建vue-cli开发环境
1. 在命令行里面输入下面这个命令 这个命令是用来安装vue-cli
```
cnpm install -g @vue/cli
```
2. 判断是否安装成功 在命令行工具里面输入 vue -V 敲回车会出现vue的版本 如果出现版本就代表安装成功

3. 创建vue的项目  vue create my-project

4. cd my-project 进入刚刚创建的项目

5. npm run serve 运行刚刚创建的项目

### 群文件下载的项目

1. 首先把群文件里面的文件下载到自己的工作区域
2. 下载完成之后在项目的根目录打开cmd  输入cnpm install 这一步代表安装项目运行所需要的依赖 
3. 安装依赖完成之后 输入 npm run serve 运行项目 会打开一个端口 项目就运行在这个端口里面
### 目录 
+ node_modules 这个是安装依赖所存放的目录
+ public 项目index.html所存放的目录
+ src  工作目录  
+ assets 存放的静态资源目录 
+ components 存放的是公共组件的目录 存放的是封装的全局组件
+ views 存放的是一个一个单独的页面 
views 页面规范 
  - views存放的是单独的页面  
  - 页面可以理解为views下的文件夹 比如home文件夹代表home页面 
  - 页面由多个组件拼凑而成 
  - 多个组件存放的位置 在当前页面的components文件夹里面
+ App.vue 是我们的项目一个根组件  其他页面会渲染到我们App.vue里面
+ main.js 项目的入口文件 是一个配置文件 脚手架根据main.js文件运行项目 脚手架内置了webpack main.js是webpack的配置文件
+ router.js 创建页面的配置文件 
+ store.js 状态管理工具
+ .gitignore 提交git的时候忽略的文件
+ babel.config.js  把es6的代码转换成es5 的babel配置文件
+ package.json 是包管理配置文件 存放的是项目运行所需要的依赖
  - script 标签里面存放的是命令配置  执行的时候执行npm run + 命令
### webpack 

vue-cli内置集成了webpack  webpack能css、js、页面、image、video字体文件等打包成一个js文件 这个js文件会动态的插入到public里面的index.html里面 webpack首先默认查找main.js 根据main.js里面的配置 把这些东西打包进app.js里面

### es6模块化 

模块功能主要由两个命令构成：export和import。export命令用于规定模块(js文件)的对外接口，import命令用于输入其他模块提供的功能。
+ export 导出模块  
一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。
```html
<script>
var str  = "张三" ;
var fuc = function(){
    alert(str)
}
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
export {
    str,
    fuc
}
</script>

```

+ import 导入模块 
使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块。

```html
<script>
import {str , fuc} from "./exports.js";
console.log(str,fuc() ,"111111")
</script>
```
  - 如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。
```html
<script>
import { lastName as surname } from './profile.js';
console.log(surname)
</script>
``` 

+ 模块的整体加载 
除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。

```html
<!-- 下面是一个circle.js文件，它输出两个方法area和circumference。 -->
<script>
// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
</script>
```
```html
<!-- 现在，加载这个模块。 -->
<script>
// main.js

import { area, circumference } from './circle.js';

console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));
</script>
```
上面写法是逐一指定要加载的方法，整体加载的写法如下。
```html
<!-- 现在，加载这个模块。 -->
<script>
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
</script>
```

+ `export default` 命令 

从前面的例子可以看出，使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。

为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。

```html
<script>
    // 比较export 和 export default 的写法  
export default function crc32() { // 输出
  // ...
}

import crc32 from 'crc32'; // 输入


export function crc32() { // 输出
  // ...
};

import {crc32} from 'crc32'; // 输入
</script>
```
### 单页面应用(SinglePage Web Application,SPA)只有一张Web页面的应用

### 单文件组件 
 .vue文件，称为单文件组件，是Vue.js自定义的一种文件格式，一个.vue文件就是一个单独的组件，在文件内封装了组件相关的代码：html、css、js,vue-cli内置集成了scss 可以直接使用 , 一个页面由多个单文件组成

### 单文件组成 
+ template 
页面
+ style
样式
+ script
js

### 单页面与多页面 

vue-cli生成的项目叫单页面应用 spa

+ 单页面 
单页面应用（SPA），通俗一点说就是指只有一个主页面的应用，浏览器一开始要加载所有必须的 html, js, css。所有的页面内容都包含在这个所谓的主页面中。但在写的时候，还是会分开写（页面片段），然后在交互的时候由路由程序动态载入，单页面的页面跳转，仅刷新局部资源。单页面应用跳转的时候不会请求服务器。
+ 多页面 
多页面（MPA），就是指一个应用中有多个页面，页面跳转时是整页刷新

### 单页面优点
+ 用户体验好，快，内容的改变不需要重新加载整个页面，基于这一点spa对服务器压力较小

+ 前后端分离

+ 页面效果会比较炫酷（比如切换页面内容时的专场动画）transition

### 单页面缺点

+ 不利于seo  vue的项目首先不考虑seo vue react angular 创建的项目对seo都是不友好的

+ 初次加载时耗时多(在一进入页面的是就加载了项目的所有文件 ，在后面可以优化)

+ 页面复杂度提高很多


### 其他注意事项  @  scoped
推荐使用@  @ 以src目录为根目录
scoped 使样式只作用域当前的组件
### 案例 

vue-cli重构品牌列表  及安装swiper及使用 
[轮播](https://segmentfault.com/a/1190000014609379 "轮播")

### 作业 

在脚手架中重构图片弹窗

### dependencies 和 devDependencies 

dependencies项目开发和打包的时候都需要用到的依赖 npm install 依赖 --save
devDependencies 是项目开发的时候需要用到的依赖 打包的时候就没有了  npm install 依赖 --save-dev
