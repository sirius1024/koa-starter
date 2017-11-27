const alphabet = require('alphabetjs');
const packageInfo = require(path.join(process.cwd(), 'package.json'));
setTimeout(() => {
    Logger.log(alphabet(packageInfo.shortname, 'stereo'));
    setTimeout(() => {
        Logger.log(`
    Koa web is ${packageInfo.version}(${NODE_ENV}) on Node ${process.version}
    `);
    }, 1000)
}, 2000);