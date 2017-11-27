//set global modules
const setGlobal = () => {
    const Koa = require('koa');
    global.path = require('path');
    global.fs = require('fs');
    global.moment = require('moment');
    global.Router = require('koa-router');
    global.app = new Koa();
    global._ = require('lodash');
    global.NODE_ENV = process.env.NODE_ENV || 'development';
};

//global config setting. use: Config.constant.appStartStr
const setConf = () => {
    global.Config = {};
    let confs = fs.readdirSync(path.join(process.cwd(), 'libs/configurations'));//read file list of configs dir
    confs.forEach(fileName => {
        let section = fileName.split('.')[0];
        global.Config[section] = require(path.join(process.cwd(), 'libs/configurations', fileName));
    })
};


//set logger module
const setLogger = (customLogConfig) => {
    // level: method level, default is 'log':0, 'trace':1, 'debug':2, 'info':3, 'warn':4, 'error':5
    const colors = require('colors');
    const tracer = require('tracer');

    const logFormat = '{{level}}_{{title}} {{timestamp}} ({{path}}:{{line}}:{{pos}}) {{message}}';

    const config = customLogConfig || {
        level: 'log',
        format: [logFormat],
        filters: {
            log: colors.grey,
            trace: colors.magenta,
            debug: colors.blue,
            info: colors.green,
            warn: colors.yellow,
            error: [colors.red, colors.bold]
        },
        dateformat: 'HH:MM:ss.L',
        preprocess: (data) => {
            switch (data.title) {
                case 'log':
                    data.title = data.title + '  ';
                    break;
                case 'info':
                case 'warn':
                    data.title = data.title + '@@@';
                    break;
            }
            data.title = data.title.toUpperCase();
            data.path = data.path.replace(process.cwd(), '');
        }
    };

    global.Logger = tracer.colorConsole(config);
    let now = new Date().toISOString();
    Logger.debug(`
    ################ system booting, start with Logger setup
    ==>> ${now}`);
    if (process.env.NODE_ENV === 'production') {
        tracer.setLevel('log');
    }
};


//global setting mongodb,mysql,mssql,oracle or redis something like that
const setDatabase = () => {
    let dbFiles = fs.readdirSync(path.join(process.cwd(), 'libs/databases'));
    dbFiles.forEach(fileName => {
        require(path.join(process.cwd(), 'libs/databases', fileName));
    })
};

//global setting koa-middwares, mostly is app.use(xxx)
const setMiddlewares = () => {
    let middlewares = fs.readdirSync(path.join(process.cwd(), 'libs/middlewares'));
    middlewares.forEach(mw => {
        require(path.join(process.cwd(), 'libs/middlewares', mw));
    })
};

//global set routes of Koa App
const setRouters = () => {
    let routes = fs.readdirSync(path.join(process.cwd(), 'routes'));
    routes.forEach(routeFile => {
        let prefix = '/' + path.basename(routeFile, '.js');
        if (prefix.substring(0, 2) === '/_') {
            Logger.debug('hidden router file', prefix);
            return;
        }
        let router = require(path.join(process.cwd(), 'routes', routeFile));
        if (prefix === '/index') {
            prefix = '';
        }
        router.prefix(prefix);
        app.use(router.routes()).use(router.allowedMethods());
    })
};

//you could register some script here
const initialized = () => {
    let inits = fs.readdirSync(path.join(process.cwd(), 'libs/initialized'));
    inits.forEach(i => {
        require(path.join(process.cwd(), 'libs/initialized', i));
    })
};

module.exports = [setGlobal, setConf, setLogger, setDatabase, setMiddlewares, setRouters, initialized];