/*
mongoose配置文件样例
*/

const connectionStr = process.env.MONGO_URL || Config.mongo.MONGO_URL;
Logger.trace("connecting mongodb", connectionStr);
global.mongoose = require("mongoose").connect(connectionStr, {
  config: {
    autoIndex: false,
    strict: "throw",
    timestamps: true
  }
});

// global.mongoose = require('mongoose').connect(connectionStr, {
//     useMongoClient: true,
//     autoIndex: false,
//     strict: 'throw',
//     timestamps: true
// });

mongoose.Promise = global.Promise;
global.Schema = mongoose.Schema;
global.ObjectId = Schema.Types.ObjectId;

const db = mongoose.connection;
const AutoIncrement = require("mongoose-auto-increment");
AutoIncrement.initialize(db);
global.MongoosePlugin = {
  "mongoose-auto-increment": AutoIncrement.plugin
};
// connecting: Emitted when connection.{open,openSet}() is executed on this connection.
db.on("connecting", data => {
  Logger.trace("connecting...", data || "");
});
// connected: Emitted when this connection successfully connects to the db. May be emitted multiple times in reconnected scenarios.
db.on("connected", () => {
  Logger.trace("mongodb connected.");
});
// open: Emitted after we connected and onOpen is executed on all of this connections models.
db.on("open", () => {
  Logger.trace("mongodb open");
  let now = moment().format("YYYY-MM-DD HH:ss");
  Logger.trace(`\n==== end with mongodb(ose) boot up ==== @${now}\n`);
});
// disconnecting: Emitted when connection.close() was executed.
db.on("disconnecting", () => {
  Logger.trace("disconnecting");
});
// disconnected: Emitted after getting disconnected from the db.
db.on("disconnected", () => {
  Logger.trace("disconnected");
});
// close: Emitted after we disconnected and onClose executed on all of this connections models.
db.on("close", () => {
  Logger.trace("close");
});
// reconnected: Emitted after we connected and subsequently disconnected, followed by successfully another successfull connection.
db.on("reconnected", () => {
  Logger.trace("reconnected");
});
// error: Emitted when an error occurs on this connection.
db.on("error", data => {
  Logger.error("db error", data || "");
});
// fullsetup: Emitted in a replica-set scenario, when primary and at least one seconaries specified in the connection string are connected.
db.on("fullsetup", data => {
  Logger.trace("mongoose fullsetup event emited", data || "");
});
// all: Emitted in a replica-set scenario, when all nodes specified in the connection string are connected.
db.on("all", data => {
  Logger.trace("mongoose all event emited", data || "");
});
