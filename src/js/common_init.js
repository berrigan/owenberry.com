/**
 * @returns {{ isPdfBuild: boolean }}
 */
export function commonInit(options) {
    options = options ?? { forcePdfBuild: false };
    const initResults = { isPdfBuild: false };
    if (options.forcePdfBuild || navigator.userAgent.indexOf('PUP_OB') !== -1) {
        var htmlNode = document.querySelector('html');
        htmlNode.classList.add('pup-ob');
        initResults.isPdfBuild = true;
    }
    return initResults;
}

// @ts-ignore
window._debug = Object.assign({}, window._debug, { commonInit });
