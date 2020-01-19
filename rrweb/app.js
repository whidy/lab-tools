const Mongoose = require("mongoose");
const Hapi = require("@hapi/hapi");
const Handlebars = require("handlebars");
const Vision = require("@hapi/vision");
const server = new Hapi.Server({ host: "localhost", port: 3000 });
Mongoose.connect("mongodb://localhost:27017/rrweb", { useNewUrlParser: true, useUnifiedTopology: true });

const RecordModel = Mongoose.model("record", {
  events: Array
});

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
      return h.view("index");
    }
  });
  server.route({
    method: "GET",
    path: "/player",
    handler: async (request, h) => {
      try {
        var events = await RecordModel.find().exec();
        console.log(events[0].events);
        // return h.response(events);
        return h.view("player", {data: events[0].events});
      } catch (error) {
        // return h.view("player", {events});
      }
    }
  });

  await server.start();
};

start();
console.log("server start http://localhost:3000");
