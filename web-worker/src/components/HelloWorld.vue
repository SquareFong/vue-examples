<template>
  <div class="hello">
    <h1>Web Workers basic example</h1>

    <div class="controls" tabindex="0">

      <form>
        <div>
          <label for="number1">Multiply number 1: </label>
          <input type="text" id="number1" value="0">
        </div>
        <div>
          <label for="number2">Multiply number 2: </label>
          <input type="text" id="number2" value="0">
        </div>
      </form>

      <p class="result">Result: 0</p>

    </div>
  </div>
</template>

<script>
import Worker from "worker-loader!../test.worker"

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },mounted() {

    const first = document.querySelector('#number1');
    const second = document.querySelector('#number2');

    const result = document.querySelector('.result');

    if (window.Worker) {
      const myWorker = new Worker();

      first.onchange = function() {
        myWorker.postMessage([first.value, second.value]);
        console.log('Message posted to worker');
      }

      second.onchange = function() {
        myWorker.postMessage([first.value, second.value]);
        console.log('Message posted to worker');
      }

      myWorker.onmessage = function(e) {
        result.textContent = e.data;
        console.log('Message received from worker');
      }
    } else {
      console.log('Your browser doesn\'t support web workers.')
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
