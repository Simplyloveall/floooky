// Iteration #1
const { testing } = require("googleapis/build/src/apis/testing");
const mongoose = require("mongoose");
const User = require("../models/User.model");
require("dotenv/config");

const users = [
  {
    firstName: "John",
    lastName: "Blinky",
    email: "john.blinky@test.com",
    password: "password",
  },
  {
    firstName: "Jason",
    lastName: "Bourne",
    email: "jason.bourne@test.com",
    password: "password",
  },
  {
    firstName: "Casandra",
    lastName: "Thompson",
    email: "casandra.thompson@test.com",
    password: "password",
  },
  {
    firstName: "Brian",
    lastName: "Dickson",
    email: "brian.dickson@test.com",
    password: "password",
  },
  {
    firstName: "Miley",
    lastName: "Cirus",
    email: "miley.cirus@test.com",
    password: "password",
  },
  {
    firstName: "Barbara",
    lastName: "Walters",
    email: "barbara.walters@test.com",
    password: "password",
  },
];

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/floooky";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

User.create(users)
  .then(function (results) {
    console.log("Success", results);
    mongoose.connection.close();
  })
  .catch(function (error) {
    console.log("Failure", error.message);
    mongoose.connection.close();
  });
