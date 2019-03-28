"use strict";

const Hapi = require("hapi");
const path = require("path")
const server = Hapi.server({ port: 8080 });

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
    path: "/{param*}",
    handler: {
      directory: {
        path: 'public'
      }
    }
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
    path: "/test",
    handler: function(request, h) {
      return h.view("test");
    }
  });
  await server.start();
};

start();
