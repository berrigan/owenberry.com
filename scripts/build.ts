import * as http from 'http';
import finalhandler from 'finalhandler';
import serveStatic from 'serve-static';

import * as path from 'path';
import * as fs from 'fs/promises';
import webpack from 'webpack';
import { renderPdf } from './generate-pdf';

import fnProdWebpackConfig from '../webpack.prod';

const HTTP_SERVER_PORT: number = 8000;
const HTTP_SERVE_DIRECTORY = path.join(__dirname, '..', 'docs');

async function httpServerActionPromise(
    server: http.Server,
    action: 'listen' | 'close',
): Promise<void> {
    const listenEvent = action == 'listen' ? 'listening' : action;
    return new Promise((resolve, reject) => {
        function err() {
            removeEventListeners();
            reject();
        }
        function okListener() {
            removeEventListeners();
            resolve();
        }
        function removeEventListeners() {
            server.removeListener('error', err);
            server.removeListener(listenEvent, okListener);
        }
        server.on('error', err);
        server.on(listenEvent, okListener);
    });
}

async function httpServerListen(server: http.Server): Promise<void> {
    const promise = httpServerActionPromise(server, 'listen');
    server.listen(HTTP_SERVER_PORT, 'localhost');
    return promise;
}

async function httpServerClose(server: http.Server): Promise<void> {
    const promise = httpServerActionPromise(server, 'close');
    server.close();
    return promise;
}

async function startLocalWebServer(): Promise<http.Server> {
    const serve = serveStatic(HTTP_SERVE_DIRECTORY, {
        cacheControl: true,
        fallthrough: false,
        etag: false,
        maxAge: -1,
    });
    const server = http.createServer({
        keepAlive: true,
        keepAliveTimeout: 0,
        keepAliveInitialDelay: 0,
        requestTimeout: 10000,
    }, function (req, res) {
        const done = finalhandler(req, res);
        serve(req, res, done);
    });
    await httpServerListen(server);
    console.log('Static Server started ..');
    return server;
}

async function generatePdf_LocalWebServer(renderAndClose: boolean = true): Promise<void> {
    const server = await startLocalWebServer();
    console.log('Rendering PDF ..');
    await renderPdf();
    await httpServerClose(server);
}

async function writeLine(out: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        process.stdout.write(`${out}\n`, 'utf8', (err) => {
            if (err == undefined) {
                resolve();
            } else {
                reject(err);
            }
        });
    })
}

async function compileWebpackProdBuild(): Promise<void> {
    let prodConfig = fnProdWebpackConfig(undefined);
    let compiler = webpack(prodConfig);
    const promise = new Promise<void>((resolve, reject) => {

        const handleErr = (step: string, err: Error | null | undefined): boolean => {
            if (err) {
                console.error(`Error running Webpack compiler.${step} PROD ..`);
                console.error(err);
                reject();
                return true;
            }
            return false;
        };

        process.stdout.write('Running webpack compiler ..');
        compiler.compile((err, compilation) => {
            if (handleErr('compile', err)) return;
            if (compilation === undefined) { reject(); return; }
            compiler.emitAssets(compilation, (err) => {
                if (handleErr('compile', err)) return;
                console.log('emitted?');
                resolve();
            });
        });
    });
    return promise;
}

async function copyCname(): Promise<void> {
    await fs.copyFile('CNAME', 'docs/CNAME');
}

async function runStep(fnStep: () => Promise<void>): Promise<void> {
    await writeLine(`Running ${fnStep.name} in build ...`);
    await fnStep();
    await writeLine(`${fnStep.name} done.`);
}


async function build(): Promise<void> {
    await runStep(compileWebpackProdBuild);
    await runStep(generatePdf_LocalWebServer);
    await runStep(copyCname);
}

build();
