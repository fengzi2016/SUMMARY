# types 声明
## 问题
0. type的基本概念
    - 结构类型系统: TypeScript 比较的并不是类型定义本身，而是类型定义的形状（Shape），即各种约束条件：
    ```js   
        class Foo {
        method(input: string): number { ... }
        }

        class Bar {
        method(input: string): number { ... }
        }

        const foo: Foo = new Foo(); // Okay.
        const bar: Bar = new Foo(); // Okay.
    ```
1. 为什么可以全局types
2. types有哪几种方法
    - declare只能声明类型，不能写定义
    - 全局变量 declare var  | let | const
    - 全局方法 declare function 支持函数重载，传入不同参数匹配不同同名函数
    - 全局类 declare class
    - 全局枚举 declare enum
    - 全局对象 declare namespace 它用来表示全局变量是一个对象，包含很多子属性。
    - 全局类型 interface | type
    - 三斜线 /// < reference types="jquery" />
    - 拓展全局变量 declare global
    - 拓展模块 declare module
3. 模块化导出声明的方法
 - export 
 ```js
 export const name: string;
 import { name } from 'xxx';
 ```
 ```js
 declare const name: string;
 export { name };
 ```
 - export namespace
 - export default
    - 只有 function、class 和 interface 可以直接默认导出，其他的变量需要先定义出来，再默认导出
```js
// 将默认导出放在最前面
// 其他例子
export default Directions;
// 函数例子
export default function foo(): string;
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}


```
 - export = xxxx
    - 使用 commonjs 规范的库，为它写类型声明文件，要使用到 export = 这种方法
    ```js
    // types/foo/index.d.ts

        export = foo;

        declare function foo(): string;
        declare namespace foo {
            const bar: number;
        }
    ```
    - 导出例子
    ```js
        // 整体导出
        module.exports = foo;
        // 单个导出
        exports.bar = bar;
    ```
    ```js
        // 官方推荐
        // 整体导入
        import foo = require('foo');
        // 单个导入
        import bar = foo.bar;
        // 整体导入
        const foo = require('foo');
        // 单个导入
        const bar = require('foo').bar;

        // 整体导入
        import * as foo from 'foo';
        // 单个导入
        import { bar } from 'foo';
    ```
 
- 
3. types不同方法之间的联系
    - 在declare namespace 内部，我们直接使用 function ajax 来声明函数，而不是使用 declare function ajax
    - 如果对象拥有深层的层级，则需要用嵌套的 namespace 来声明深层的属性的类型
    ```js
    declare namespace jQuery {
        function ajax(url: string, settings?: any): void;
        namespace fn {
            function extend(object: any): void;
        }
    }
    ```
4. types局部和全局
- 暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到 namespace 下
- 在使用这个 interface 的时候，也应该加上 namespace的值 前缀
```js
declare namespace jQuery {
    interface AjaxSettings {
        method?: 'GET' | 'POST'
        data?: any;
    }
    function ajax(url: string, settings?: AjaxSettings): void;
}

let settings: jQuery.AjaxSettings = {
    method: 'POST',
    data: {
        name: 'foo'
    }
};
jQuery.ajax('/api/post_something', settings);
```
5. types的通用例子
- 检查声明文件
    - npm 包中package.json 中有 types 字段，或者有一个 index.d.ts 声明文件
    - 发布到 @types 里， 尝试安装一下对应的 @types 包就知道是否存在该声明文件，安装命令是 npm install @types/foo --save-dev
    - 自己写声明文件，创建一个 types 目录，专门用来管理自己写的声明文件，将 foo 的声明文件放到 types/foo/index.d.ts 中。这种方式需要配置下 tsconfig.json 中的 paths 和 baseUrl 字段。
    - 目录结构
    ```
    /path/to/project

    ├── src

    |  └── index.ts

    ├── types

    |  └── foo

    |     └── index.d.ts

    └── tsconfig.json
    ```
    - tsconfig配置
    ```json
    {
        "compilerOptions": {
            "module": "commonjs",
            "baseUrl": "./",
            "paths": {
                "*": ["types/*"]
            }
        }
    }
    ```
    - 如此配置之后，通过 import 导入 foo 的时候，也会去 types 目录下寻找对应的模块的声明文件了

- 声明到xxx.d.ts文件中，可以让所有文件都能访问到
- 如果还是解析失败，则检测tsconfig.json 中的 files、include 和 exclude 配置，确保其包含了 xxx.d.ts 文件
- 使用@types统一管理第三方库的声明文件
- @types 的使用方式很简单，直接用 npm 安装对应的声明模块即可，以 jQuery 举例： npm install @types/jquery --save-dev
- 搜索声明文件[网址](https://microsoft.github.io/TypeSearch/)

6. types定义的特殊情况
- 第三方库没有声明类型则需要自己声明
    - 全局变量引用
        - npm install @types/xxx --save-dev
        - 将xxx.d.ts放到src下
    - 既可以通过 < script > 标签引入，又可以通过 import 导入的库，称为 UMD 库,相比于 npm 包的类型声明文件，我们需要额外声明一个全局变量，为了实现这种方式，ts 提供了一个新语法 export as namespace, 可以将声明好的一个变量声明为全局变量
    ```js
    // 可以被全局访问 
    export as namespace foo;
    ```
- 声明合并，可以同时是对象和函数
    ```js
        declare function jQuery(selector: string): any;
        declare namespace jQuery {
            function ajax(url: string, settings?: any): void;
        }
    ```
    - 拓展全局变量类型
        - 声明合并
        ```js
        interface String {
            prependHello(): string;
        }

        'foo'.prependHello();
        ```
        - declare namespace 给已有的命名空间添加类型声明
    - 使用 declare global 可以在 npm 包或者 UMD 库的声明文件中扩展全局变量的类型。注意即使此声明文件不需要导出任何东西，仍然需要导出一个空对象，用来告诉编译器这是一个模块的声明文件，而不是一个全局变量的声明文件
    ```js
        // types/foo/index.d.ts
        declare global {
        interface String {
            prependHello(): string;
            }
        }

        export {};
    ```
    - ts 提供了一个语法 declare module，它可以用来扩展原有模块的类型。declare module 也可用于在一个文件中一次性声明多个模块的类型
    ```js
    // 如果是需要扩展原有模块的话，需要在类型声明文件中先引用原有模块，再使用 declare module 扩展原有模块
    // types/moment-plugin/index.d.ts

    import * as moment from 'moment';

    declare module 'moment' {
        export function foo(): moment.CalendarKey;
    }
    // 引入
    import * as moment from 'moment';
    import 'moment-plugin';

    moment.foo();
    ```
- 三斜线导入
- 在全局变量的声明文件中，是不允许出现 import, export 关键字的。一旦出现了，那么他就会被视为一个 npm 包或 UMD 库，就不再是全局变量的声明文件了。故当我们在书写或者依赖一个全局变量的声明文件时，如果需要引用另一个库的类型，那么就必须用三斜线指令了
```js
// types/jquery-plugin/index.d.ts
// 下面是依赖
/// <reference types="jquery" />

declare function foo(options: JQuery.AjaxSettings): string;

// src/index.ts

foo({});
```
    - 有types 和 path 两种不同的指令。它们的区别是：types 用于声明对另一个库的依赖，而 path 用于声明对另一个文件的依赖。
7. types的高级情况
- 片段 
    - 类型判断 keyof in
    ```js
    // 片段
    type User = {
    id: number;
    name: string;
    birthday: number;
    };

    updateUser(user.id, {
    name,
    });

    type Partial<T> = {
    [P in keyof T]?: T[P];
    }

    function updateUser(id: User['id'], data: Partial<User>) {}
    ```
- 条件类型
    - 欠缺输入类型和输出类型之间的关联关系
    - 条件类型一般形式是T extends U ? X : Y 
    - 例子
    ```ts
        function process<T extends string | null>(text: T): T extends string ? string : null {
        return text && text.replace(/f/g, 'p');
        }

        process('foo').toUpperCase(); // Okay.
        process(null).toUpperCase(); // Error!!!

        (A | B) extends U ? X : Y ==> (A extends U ? X : Y) | (B extends U ? X : Y)

        // 考虑到常见需求，TypeScript 在发布条件类型时，一并发布了Exclude<T, U>、NonNullable<T>等内置工具类型。
    ```
- 自动生成声明文件
    - 在命令行中添加 --declaration
    - tsconfig   
    ```json
        {
            "compilerOptions": {
                "module": "commonjs",
                "outDir": "lib",
                "declaration": true,
            }
        }
    ```
- 声明文件发布，如果是手动写的声明文件，那么需要满足以下条件之一，才能被正确的识别：
    - 给 package.json 中的 types 或 typings 字段指定一个类型声明文件地址
    - 在项目根目录下，编写一个 index.d.ts 文件
    - 针对入口文件（package.json 中的 main 字段指定的入口文件），编写一个同名不同后缀的 .d.ts 文件
8. types常用的库

9. types的原理
    - xxx.d.ts用于编译时的检查，声明文件里的内容在编译结果中会被删除
## 官网
- 全局和模块定义
- 默认情况下，TypeScript 会自动包含支持全局使用的任何定义
- 可以像使用模块一样使用它
```js
    import * as $ from 'jquery';
```
- 将全局变量定义到tsconfig中
```json
// 通过配置 compilerOptions.types: [ "jquery" ] 后，只允许使用 jquery 的 @types 包
// 即使这个人安装了另一个声明文件，比如 npm install @types/node，它的全局变量（例如 process）也不会泄漏到你的代码中
{
  "compilerOptions": {
    "types" : [
      "jquery"
    ]
  }
}
```