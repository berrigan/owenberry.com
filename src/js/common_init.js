/**
 * @returns {{ isPdfBuild: boolean }}
 */
export function commonInit() {
    const initResults = { isPdfBuild: false };
    if (navigator.userAgent.indexOf('PUP_OB') !== -1) {
        var htmlNode = document.querySelector('html');
        htmlNode.classList.add('pup-ob');
        initResults.isPdfBuild = true;
    }
    return initResults;
}
