import * as Comlink from "comlink"

const myValue = 42;
class MyClass {
    logSomething() {
        console.log(`myValue=${myValue}`)
    }
    computeSth(n,m, t){
        let a = 0;
        for(let i=9000000000; i>0; i--){
            a += 2
        }
        console.log(a + '###################' + a)
        console.log(n + m)
        let r = n+m
        return new Promise((resolve, reject)=>{
            console.log("成功: " + t)
            resolve({t, r})
            reject(t)
        })
    }
}

Comlink.expose(MyClass)