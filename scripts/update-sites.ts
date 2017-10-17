let cpx = require('cpx');

console.log('Updating sites with shared data ...');

let sites = [
    'static',
    'plain-javascript'
];

sites.forEach(siteName => {
    cpx.copy('./data/*.*', `./${siteName}/data`);
});

console.log('... finsihed updating sites.');