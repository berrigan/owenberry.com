import * as fs from 'fs/promises';
import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';
import renderPdf from './generate-pdf';

import * as fnDevConfig from '../webpack.dev';
import * as fnProdConfig from '../webpack.prod';

async function generatePdf() {
    console.log('Starting WebpackDevServer ..');
    let devConfig = fnDevConfig({ production: false });
    let devServerCompiler = webpack(devConfig);
    let server = new WebpackDevServer(devConfig.devServer, devServerCompiler);
    await server.start();
    console.log('WebpackDevServer started ..');
    console.log('Rendering PDF ..');
    await renderPdf();
    
    await server.stop();
}

async function compileWebpackProdBuild(): Promise<void> {
    let prodConfig = fnProdConfig({ production: true });
    let compiler = webpack(prodConfig);
    return new Promise<void>((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                console.error('Error running Webpack PROD..');
                console.error(err);
                reject();
            } else {
                // console.log(stats);
                resolve();
            }
        });
    })
}

async function copyCname(): Promise<void> {
    await fs.copyFile('CNAME', 'docs/CNAME');
}

async function runStep(fnStep: () => Promise<void>): Promise<void> {
    console.log(`Running ${fnStep.name} in build ...`);
    await fnStep();
    console.log(`${fnStep.name} done.`);
}


async function build(): Promise<void> {
    await runStep(generatePdf);
    await runStep(compileWebpackProdBuild);
    await runStep(copyCname);
}

runStep(build);
