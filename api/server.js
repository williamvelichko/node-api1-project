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

server.put("/api/users/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let item = model.findById(id);
    if (item == null) {
      res.status(404).json({ message: `couldnt find user with id ${id}` });
      return;
    }
    let body = req.body;
    if (!body.name) {
      res.status(500).json({ message: `needs a name` });
      return;
    } else if (!body.bio) {
      res.status(500).json({ message: `needs a bio` });
      return;
    } else {
      let user = await model.update(id, body);
      res.status(200).json(user);
    }
  } catch (e) {
    res.status(500).json({ message: "could not update" });
  }
});

server.delete("/api/users/:id", (req, res) => {
  let { id } = req.params;
  model
    .remove(id)
    .then((user) => {
      if (user == null) {
        res.status(404).json({ message: `couldnt find user with id ${id}` });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(() => {
      res.status(500).json({ message: "could not delete" });
    });
});
module.exports = server; // EXPORT YOUR SERVER instead of {}
