"use strict";

const Hapi = require("@hapi/hapi");
const Handlebars = require("handlebars");
const Vision = require("@hapi/vision");
const server = Hapi.server({ port: 8080 });

const start = async () => {
  await server.register(Vision);
  server.views({
    engines: {
      html: Handlebars
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
