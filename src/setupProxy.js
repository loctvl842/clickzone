const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://clickzone.herokuapp.com/",
      // target: "http://localhost/php/clickzone",
      changeOrigin: true,
    })
  );
};
