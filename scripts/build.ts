let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let fnProdConfig = require('../webpack.prod.js');
let fnDevConfig = require('../webpack.dev.js');

import renderPdf from './generate-pdf';

console.log('Running build ...');

let prodConfig = fnProdConfig({ production: true });
let devConfig = fnDevConfig({ production: false });

let devServerCompiler = webpack(devConfig);
let server = new WebpackDevServer(devServerCompiler, {});

// let firstWatchRun = true;
server.listen(8000, 'localhost', () => {
    console.log('WebpackDevServer started ..');
});

setTimeout(() => {

    renderPdf().then(() => {
        console.log('Generate PDF done in build.');
        server.close();
    });

}, 3000)

let compiler = webpack(prodConfig);
compiler.run((err, stats) => {
    if (err) {
        console.error('Error running Webpack PROD..');
        console.error(err);
    } else {
        // console.log(stats);
    }
});