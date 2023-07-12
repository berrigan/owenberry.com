// import 'bootstrap';

import '../scss/site.scss';

if (navigator.userAgent.indexOf('PUP_OB') !== -1) {
    var htmlNode = document.querySelector('html');
    htmlNode.classList.add('pup-ob');
}
