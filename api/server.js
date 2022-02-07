// BUILD YOUR SERVER HERE
const express = require("express");

const model = require("./users/model");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  console.log("server working");
  res.json("its working");
});

server.get("/api/users", (req, res) => {
  model
    .find()
    .then((users) => {
      res.json(users);
    })
    .catch(() => {
      res.status(500).json({ message: "could not get users" });
    });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
