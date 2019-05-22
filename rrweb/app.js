const Mongoose = require("mongoose");
const Hapi = require("@hapi/hapi");
const Joi = require("@hapi/joi");
const server = new Hapi.Server({ host: "localhost", port: 3000 });
Mongoose.connect("mongodb://localhost:27017/rrweb", { useNewUrlParser: true });

const PersonModel = Mongoose.model("person", {
  firstname: String,
  lastname: String
});
server.route({
  method: "POST",
  path: "/person",
  options: {
    validate: {
      payload: {
        firstname: Joi.string().required(),
        lastname: Joi.string().required()
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
      var person = new PersonModel(request.payload);
      var result = await person.save();
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

server.start();
