"use strict";

const Hapi = require("hapi");
const path = require("path")
const server = Hapi.server({ port: 9000 });

const start = async () => {
  await server.register(require("vision"));
  await server.register(require("inert"));
  server.views({
    engines: {
      html: require("handlebars")
    },
    relativeTo: __dirname,
    path: "templates"
  });

  server.route({
    method: "GET",
    path: "/",
    handler: function(request, h) {
      return h.view("index");
    }
  });
  server.route({
    method: "GET",
    path: "/iframe",
    handler: function(request, h) {
      return h.view("iframe");
    }
  });
  await server.start();
};

start();
console.log('server is running at http://127.0.0.1:9000')
