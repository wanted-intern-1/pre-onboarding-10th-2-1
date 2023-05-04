const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/v1/search-conditions',
    createProxyMiddleware({
      target: 'https://api.clinicaltrialskorea.com',
      changeOrigin: true,
    })
  );
};
