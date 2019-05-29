const Hapi = require("@hapi/hapi");
const Handlebars = require("handlebars");
const Vision = require("@hapi/vision");
const server = new Hapi.Server({ host: "localhost", port: 3001 });
// var httpProxy = require('http-proxy');
// var proxy = httpProxy.createProxyServer(function(req, res) {
//   proxy.web(req, res, { target: 'http://localhost:3000' });
// }).listen(8000);
const start = async () => {
  await server.register(Vision);
  server.views({
    engines: {
      html: Handlebars
    },
    relativeTo: __dirname,
    path: "view"
  });
  server.route({
    method: "GET",
    path: "/",
    handler: function(request, h) {
      console.log(request);
      return h.view("index");
    }
  });
  await server.start();
};

start();
console.log("server start");
