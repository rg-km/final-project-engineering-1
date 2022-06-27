const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8082",
      changeOrigin: true,
    })
  );
  app.use(
    "/admin",
    createProxyMiddleware({
      target: "http://localhost:8082",
      changeOrigin: true,
    })
  );
  app.use(
    "/css",
    createProxyMiddleware({
      target: "http://localhost:8082",
      changeOrigin: true,
    })
  );
  app.use(
    "/js",
    createProxyMiddleware({
      target: "http://localhost:8082",
      changeOrigin: true,
    })
  );
};
