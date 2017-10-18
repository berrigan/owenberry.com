let cpx = require('cpx');
import fs = require('fs');
import path = require('path');
import _ = require('lodash');

cpx.copy('./data/*.*', './static/dist/data');


function template(html: string, templateObject: object) {

    let templateRegex = /(\${ ?([a-zA-Z_][a-zA-Z0-9_]*([.]{0,1}[a-zA-Z_][a-zA-Z0-9_]*)*) ?})/g;
    let result:RegExpExecArray = null;

    while (null !== (result = templateRegex.exec(html))) {

        const path = result[2];
        let data:any = _.get(templateObject, path);
        
        if (typeof data === 'object') {
            console.log(`Cannot interpolate object data endpoint :: ${ path }`);
        }
        else if (data === undefined || data == null) {
            console.log(`Found template var with no data in template object :: ${path}`);
        }
        else {
            const regExpStr = result[0].replace('$','\\$').replace('.','\\.');
            const replaceRegExp = new RegExp(regExpStr, 'g');
            const dataString = data.toString();
            
            html = html.replace(replaceRegExp, dataString);

            // update regex as we increment through string to adjust for
            // difference in the length between the segment we're replacing and the new data
            const diff = result[0].length - dataString.length;
            templateRegex.lastIndex -= diff;
        }
    }
    return html;
}

try {
    console.log('... reading index.html');
    const indexHtml = fs.readFileSync('./static/src/html/resume.template.html', { encoding: 'utf8' });
    console.log(indexHtml);

    const jsonResume = fs.readFileSync('./data/resume.json', { encoding: 'utf8' });
    const resume = JSON.parse(jsonResume);

    const templated = template(indexHtml, resume);

    console.log(templated);
}
catch (templatingException) {
    console.log('EX');
    console.log(templatingException);
}