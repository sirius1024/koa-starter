const crypto = require('crypto');

/*
* @class http请求加密解密类
* @param params {Object} 原始请求
* @param key {String} 密钥
* */
class Encrypt {
    constructor(params, key) {
        if (typeof (params) !== "object") {

        }
        this.params = params;
        this.key = key;
    }

    get except() {
        return 'sign';
    }

    set except(value) {
        this.except = 'sign'
    }

    //对原始请求加密
    encrypt() {
        let keys = Object.keys(this.params).sort();
        let encryStr = '';
        //顺序排列
        keys.forEach(k => {
            if (k != this.except) {
                let v = this.params[k];
                if (typeof (v) !== 'string') {
                    v = JSON.stringify(v);
                }
                encryStr += `${k}=${v}&`;
            }
        });
        encryStr += "key=" + this.key;
        return this.md5(encryStr);
    }


    md5(str) {
        let md5Encry = crypto.createHash('md5');
        return md5Encry.update(str).digest('hex');
    }
}

module.exports = Encrypt;