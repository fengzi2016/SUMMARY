# async await

## mdn介绍

async function 声明用于定义一个返回 AsyncFunction 对象的异步函数。

当调用一个 async 函数时，会返回一个 Promise 对象。当这个 async 函数返回一个值时，Promise 的 resolve 方法会负责传递这个值；当 async 函数抛出异常时，Promise 的 reject 方法也会传递这个异常值。

async 函数中可能会有 await 表达式，这会使 async 函数暂停执行，等待 Promise  的结果出来，然后恢复async函数的执行并返回解析值（resolved）。

注意， await 关键字仅仅在 async function中有效。如果在 async function函数体外使用 await ，你只会得到一个语法错误（SyntaxError）。

## 特点举例子

- 只返回promise
```js
    async function f() {
        return 1;
    }
    // 虽然函数没有返回一个promise，但是会被自动转化为参数为1的返回一个resolved的promise
    f().then(alert) //1
```

- await 阻塞javascript代码并且得到返回值。但是js引擎还可以做别的事情，比如执行其他的脚本，处理触发的事件等。
```js
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  let result = await promise; // wait till the promise resolves (*)

  alert(result); // "done!"
}

f();
```

- await 可以接受 thenables对象，thenables对象就是有可以调用的then方法的对象
```js
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { native code }
    // resolve with this.num*2 after 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
};

async function f() {
  // waits for 1 second, then result becomes 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```
- 类的方法可以是async函数
```js
class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1

```
- 利用async函数时，用try catch来捕获错误是不必要的，一般在顶层作用域可以把promise await之后直接用.catch处理。但是如果在async函数内部则提倡用try...catch来处理错误。
```js
    // try...catch
    async function f1() {
        try {
            let response = await fetch('/no-user-here');
            let user = await response.json();
        } catch(err) {
            // catches errors both in fetch and response.json
            alert(err);
        }
    }
    f1();

    async function f() {
        let response = await fetch("url");
    }
    // f() becomes a rejected promise
    f().catch(alert);
    // TypeError: failed to fetch // (*)
```
## 对比promise和await 

- promise
```js
    function getProcessedData(url) {
        return downloadData(url) // 返回一个 promise 对象
            .catch(e => {
                return downloadFallbackData(url)  // 返回一个 promise 对象
            })
            .then(v => {
                return processDataInWorker(v); // 返回一个 promise 对象
            });
    }
```
- async 
```js
    async function getProcessedData(url) {
        let v;
        try {
            v = await downloadData(url); 
        } catch (e) {
            v = await downloadFallbackData(url);
        }
        return processDataInWorker(v);
    }
```

## 习题

1. 将如下代码转化为 async/await

```js
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    })
}
```
<details>
<summary>async函数</summary>

```js

async function loadJson(url){
    let response = await fetch(url);
    if (response.status === 200) {
        return response.json();
    } else {
        throw new HttpError(response);
    }
}
```
</details>

```js

// Ask for a user name until github returns a valid user
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}
```
<details>
<summary>async函数</summary>

```js

async function demoGithubUser2(){
    let user;
    while(true){    
        let name = prompt("Enter a name?", "iliakan");
        try {
            user = await loadJson(`https://api.github.com/users/${name}`);
            break;
        } catch(err) {
            if(err instanceof HttpError && err.response.status == 404) {
                  alert("No such user, please reenter.");
            } else {
                 throw err;
            }
        }
    }
    alert(`Full name: ${user.name}.`);
    return user;
}
demoGithubUser();
```
</details>


2. 将下列函数转化为aysnc/await

```js
    function loadJson(url) {
        return fetch(url)
            .then(response => {
                if (response.status == 200) {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
        })
    }

loadJson('no-such-user.json') // (3)
.catch(alert); // Error: 404
```

<details>
<summary>async函数</summary>

```js

async function loadJson2(url){
   let response = await fetch(url);
   if(response.status === 200 ) {
       return response.json();
   }
   return new Error(response.status);
}
loadJson('no-such-user.json').catch(alert);

```
</details>

## 原理参照

[知乎答案：何幻](https://www.zhihu.com/question/39571954)