let app;

const getApp = async () => {
  if (app) {
    return app;
  }
  app = require("../src/index").app;
  return new Promise((resolve) => app.on("appStarted", () => resolve(app)));
};

module.exports = {getApp}