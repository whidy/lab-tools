if (process.env.DEV) {
  module.exports = require("./book.dev.json");
} else {
  module.exports = require("./book.json");
}
