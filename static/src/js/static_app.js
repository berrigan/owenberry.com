import 'bootstrap';

import '../scss/site.scss';

if (navigator.userAgent.indexOf('Electron') !== -1) {
    var htmlNode = document.querySelector('html');
    htmlNode.classList.add('electron-browser');
}

