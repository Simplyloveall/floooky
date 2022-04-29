var express = require("express");
var router = express.Router();
const User = require("../models/User.model");
const Event = require("../models/Event.model");
const Contact = require("../models/Contact.model");

const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/add", (req, res, next) => {
  res.render("add-contact");
});

router.post("/add", (req, res, next) => {
  //1. Make sure all fields are filled out
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.phoneNumber
  ) {
    return res.render("add-contact", { message: "Please fill out all fields" });
  }
  Contact.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  })
    .then(() => {
      res.redirect("/contacts/my-contacts");
    })
    .catch((err) => {
      console.log("Error while creating contact", err.message);
    });
});

router.get("/my-contacts", (req, res, next) => {
  Contact.find()
    .then((allContacts) => {
      res.render("my-contacts", { allContacts: allContacts });
    })
    .catch((err) => {
      console.log("Failed", err.message);
      res.redirect("/");
    });
});

router.get("/:id/edit", isLoggedIn, (req, res) => {
  Contact.findById(req.params.id)
    .then((foundContact) => {
      res.render("edit-contact", { foundContact: foundContact });
    })
    .catch((error) => {
      console.log("failed", error.message);
    });
});

router.post("/:id/edit", isLoggedIn, (req, res) => {
  Event.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
  })
    .then(() => {
      res.redirect("/contacts/my-contacts");
    })
    .catch(() => {
      res.redirect("/contacts/my-contacts");
    });
});

router.post("/:id/delete", isLoggedIn, (req, res) => {
  console.log(req.params.id);
  Contact.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/contacts/my-contacts");
    })
    .catch(() => {
      res.redirect("/contacts/my-contacts");
    });
});

module.exports = router;
