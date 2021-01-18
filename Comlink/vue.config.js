const WorkerPlugin = require('worker-plugin');

module.exports = {
    configureWebpack: {
        plugins: [
            new WorkerPlugin()
        ]
    }
}

/*config => {
         config.module.rules.push({
             test: /src\/\.worker\.js$/i,
             use: {
                 loader: 'comlink-loader',
                 options: {
                     singleton: true
                 }
             }
         })
    },*/