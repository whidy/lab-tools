const Mongoose = require("mongoose");
const Hapi = require("@hapi/hapi");
const Joi = require("@hapi/joi");
const Handlebars = require("handlebars");
const Vision = require("@hapi/vision");
const server = new Hapi.Server({ host: "localhost", port: 3000 });
Mongoose.connect("mongodb://localhost:27017/rrweb", { useNewUrlParser: true });

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
  server.route({
    method: "POST",
    path: "/add",
    options: {
      // validate: {
      //   payload: {
      //     firstname: Joi.string().required(),
      //     lastname: Joi.string().required()
      //   },
      //   failAction: (request, h, error) => {
      //     return error.isJoi
      //       ? h.response(error.details[0]).takeover()
      //       : h.response(error).takeover();
      //   }
      // }
    },
    handler: async (request, h) => {
      try {
        var record = new RecordModel(request.payload);
        var result = await record.save();
        return h.response(result);
      } catch (error) {
        return h.response(error).code(500);
      }
    }
  });

  server.route({
    method: "GET",
    path: "/people",
    handler: async (request, h) => {
      try {
        var person = await PersonModel.find().exec();
        return h.response(person);
      } catch (error) {
        return h.response(error).code(500);
      }
    }
  });

  server.route({
    method: "GET",
    path: "/person/{id}",
    handler: async (request, h) => {
      try {
        var person = await PersonModel.findById(request.params.id).exec();
        return h.response(person);
      } catch (error) {
        return h.response(error).code(500);
      }
    }
  });

  server.route({
    method: "PUT",
    path: "/person/{id}",
    options: {
      validate: {
        payload: {
          firstname: Joi.string().optional(),
          lastname: Joi.string().optional()
        },
        failAction: (request, h, error) => {
          return error.isJoi
            ? h.response(error.details[0]).takeover()
            : h.response(error).takeover();
        }
      }
    },
    handler: async (request, h) => {
      try {
        var result = await PersonModel.findByIdAndUpdate(
          request.params.id,
          request.payload,
          { new: true }
        );
        return h.response(result);
      } catch (error) {
        return h.response(error).code(500);
      }
    }
  });

  server.route({
    method: "DELETE",
    path: "/person/{id}",
    handler: async (request, h) => {
      try {
        var result = await PersonModel.findByIdAndDelete(request.params.id);
        return h.response(result);
      } catch (error) {
        return h.response(error).code(500);
      }
    }
  });
  await server.start();
};

start();
console.log("server start");
