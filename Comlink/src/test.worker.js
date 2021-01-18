import * as Comlink from "comlink"

class MyClass {
    logSomething() {
        console.log("这是一个comlink演示")
    }
    computeSth(n,m, t){
        let a = 0;
        for(let i=3000000000; i>0; i--){
            a += 1
        }
        let r = n+m
        console.log('###################' + '线程' + t + '执行完成，' + '循环' + a +'次')
        return new Promise((resolve, reject)=>{
            resolve({t, r})
            reject(t)
        })
    }
}

Comlink.expose(MyClass)