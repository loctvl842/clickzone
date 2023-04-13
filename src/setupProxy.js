const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://clickzone.herokuapp.com/",
      // target: "http://localhost/php/clickzone",
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        console.log("proxyReq: ", { host: proxyReq.host, path: proxyReq.path });
      },
      onError: (err, req, res, target) => {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Something went wrong. And we are reporting a custom error message.");
      },
    })
  );
};
