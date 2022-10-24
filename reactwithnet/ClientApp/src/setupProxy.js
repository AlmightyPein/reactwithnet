const createProxyMiddleware = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:42775';

const context =  [
    "/weatherforecast",
    "/api/coviddata",
    "/api/auth/register",
    "/api/auth/confirmemail",
    "/api/auth/login",
    "/api/auth/test",
    "/api/auth/CheckAuth",
    "/api/auth/getprofiledata",
    "/api/auth/updatedata",
    "/swagger",
    "/api/doctor/getdisease",
    "/api/auth/logout",
    "/api/auth/isUniqueUser",
    "/api/doctor/getdiseasefromimage"
];

module.exports = function(app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    secure: false
  });

    app.use(appProxy);
    
};
