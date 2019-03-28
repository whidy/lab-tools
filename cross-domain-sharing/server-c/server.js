"use strict";

const Hapi = require("hapi");

const server = Hapi.server({ port: 8081 });

const start = async () => {
  await server.register(require("vision"));

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
    path: "/test",
    handler: function(request, h) {
      return h.view("test");
    }
  });
  await server.start();
};

start();
