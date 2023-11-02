export function commonInit() {
    if (navigator.userAgent.indexOf('PUP_OB') !== -1) {
        var htmlNode = document.querySelector('html');
        htmlNode.classList.add('pup-ob');
    }
}
