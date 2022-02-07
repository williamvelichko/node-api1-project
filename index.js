const server = require("./api/server");

const port = 9000;

// START YOUR SERVER HERE
console.log("hello William");

server.listen(port, () => {
  console.log("server has started");
});
