<template>
  <div class="hello">
    <h1>Web Workers basic example</h1>

    <div class="controls" tabindex="0">

      <form>
        <div>
          <label for="number1">Multiply number 1: </label>
          <input type="number" id="number1" v-model="n1">
        </div>
        <div>
          <label for="number2">Multiply number 2: </label>
          <input type="number" id="number2" v-model="n2">
        </div>
      </form>

      <pre class="result">Result: {{op}}</pre>

    </div>
  </div>
</template>

<script>

import * as Comlink from "comlink"
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      n1:0,
      n2:0,
      instances:[],
      MClass:Object,
      op:""
    }
  },
  async mounted() {
    const obj = Comlink.wrap(new Worker('../test.worker.js', { type: 'module' }))
    this.MClass = new Worker('../test.worker.js', { type: 'module' })
    let instance = await new obj();
    await instance.logSomething();
  },
  methods:{
    async computeNumber(n, m){
      const obj = Comlink.wrap(new Worker('../test.worker.js', { type: 'module' }))
      let instance = await new obj();
      console.log("Start thread: " + this.instances.length)
      this.instances.push(instance)
      instance.computeSth(Number(n), Number(m), this.instances.length).then(({i, r})=> {
          console.log(`第${i}线程执行成功`)
          this.op += `\n第${i}线程执行结果： ${n} + ${m} = ${r}`
        }, (i)=>{
            console.log(`第${i}线程执行失败`)
      }
      )
    }
  },
  watch: {
    n1:function () {
      console.log("N1 changed")
    },
    n2:function () {
      this.computeNumber(this.n1, this.n2)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
