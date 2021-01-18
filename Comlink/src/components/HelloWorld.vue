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
      num:0,
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
      let threadNumber = this.num;
      this.num++
      console.log("Start thread: " + threadNumber)
      instance.computeSth(Number(n), Number(m), threadNumber).then(({t, r})=> {
        console.log(`第${t}线程执行成功`);
        this.op += `\n第${t}线程执行结果： ${n} + ${m} = ${r}`;
        this.deleteThread(t)
        }, (i)=>{
            console.log(`第${i}线程执行失败`)
      }
      )
      this.instances.push({number:threadNumber, instance})
    },
    deleteThread(trN){
      for(let i=0; i<this.instances.length; ++i){
        if(this.instances[i].number === trN){
          this.instances.splice(i, 1)
          break;
        }
      }
    }
  },
  watch: {
    n1:function () {
      console.log("number1 changed")
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
