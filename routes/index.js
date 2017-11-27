const router = new Router();
const Encrypt = require("../utils/custom-encry");

//const clientsModel = require("../models/clients");

//拦截器，用于验证签名以及白名单放行，目前只拦截post请求
router.post("/*", async (ctx, next) => {
  let reqParams = ctx.request.body;
  Logger.log(`拦截到请求${JSON.stringify(reqParams)}`);
  //不加密列表
  if (Config.variables.unEncryptRoute.indexOf(ctx.originalUrl) > -1) {
    Logger.trace(`配置放行 --> ${ctx.originalUrl}`);
    await next();
    return;
  }

  Logger.trace(`默认拦截 --> ${ctx.originalUrl}`);

  //这里可以自定定义拦截器

  // let clientData = await clientsModel
  //   .findOne({
  //     clientId: reqParams.client_id
  //   })
  //   .lean();
  // let encrypt = new Encrypt(reqParams, clientData.clientKey);
  // if (encrypt.encrypt(reqParams) != reqParams.sign) {
  //   Logger.log(
  //     `拦截未匹配签名的请求 - ${ctx.originalUrl} - ${encrypt.encrypt(
  //       reqParams
  //     )}`
  //   );
  //   ctx.status = 403;
  //   ctx.body = {
  //     error: "sign not match"
  //   };
  //   return;
  // }
  Logger.trace(`签名放行 --> ${ctx.originalUrl}`);
  await next();
});

router.all("/alive", async (ctx, next) => {
  ctx.body = new moment().format("YYYY-MM-DD HH:mm:ss") + "_" + NODE_ENV;
});

module.exports = router;
