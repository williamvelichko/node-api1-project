// BUILD YOUR SERVER HERE
const { json } = require("express");
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

server.get("/api/users/:id", (req, res) => {
  let { id } = req.params;
  model
    .findById(id)
    .then((user) => {
      if (user == null) {
        res.status(404).json({ message: `couldnt find user with id ${id}` });
      } else {
        res.json(user);
      }
    })
    .catch(() => {
      res.status(500).json({ message: "could not get user" });
    });
});

server.post("/api/users", (req, res) => {
  let body = req.body;
  if (!body.name) {
    res.status(500).json({ message: `needs a name` });
  } else if (!body.bio) {
    res.status(500).json({ message: `needs a bio` });
  } else {
    model
      .insert(body)
      .then((newUser) => {
        res.json(newUser);
      })
      .catch(() => {
        res.status(500).json({ message: "could not get NewUser" });
      });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
