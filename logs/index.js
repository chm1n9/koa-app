
const log4js = require("log4js"),
  log4js_config = require("../config/log.json")

// log4js.configure(log4js_config)


module.exports = Log = log4js.getLogger('console');
