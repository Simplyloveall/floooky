var express = require("express");
var router = express.Router();
const User = require("../models/User.model");
const Event = require("../models/Event.model");
const Contact = require("../models/Contact.model");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/create", isLoggedIn, (req, res, next) => {
  res.render("create-event");
});

router.post("/create", isLoggedIn, (req, res, next) => {
  //1. Make sure all fields are filled out
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.address ||
    !req.body.city ||
    !req.body.state ||
    !req.body.zipCode ||
    // !req.body.imageUrl ||
    !req.body.eventType ||
    !req.body.totalSpots
  ) {
    res.render("create-event", { message: "Please fill out all fields" });
  }

  Event.create({
    title: req.body.title,
    description: req.body.description,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    imageUrl: req.body.imageUrl,
    eventType: req.body.eventType,
    totalSpots: req.body.totalSpots,
    attendees: req.body.attendees,
    owner: req.session.user._id,
  })
    //created Event page
    //share page
    //display highlight of the event with share process
    .then((newlyCreatedEvent) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Error while creating event", err.message);
    });
});

router.get("/all", (req, res) => {
  Event.find()
    .then((allEvents) => {
      res.render("list-events", { allEvents: allEvents });
    })
    .catch((err) => {
      console.log("Failed", err.message);
      res.redirect("/");
    });
});

router.get("/my-events", isLoggedIn, async function (req, res, next) {
  await Event.find({ owner: req.session.user._id })
    .cursor()
    .eachAsync(function (myEvents) {
      myEvents.availableSpots = myEvents.totalSpots - myEvents.attendees.length;

      return myEvents.save();
    });

  Event.find({ owner: req.session.user._id })
    .then((allEvents) => {
      res.render("my-events", { allEvents: allEvents });
    })
    .catch((err) => {
      console.log("Failed", err.message);
      res.redirect("/");
    });
});

router.get("/:id/edit", isLoggedIn, (req, res) => {
  Event.findById(req.params.id)
    .then((foundEvent) => {
      res.render("edit-event", { foundEvent: foundEvent });
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
      res.redirect("/events/my-events");
    })
    .catch(() => {
      res.redirect("/events/my-events");
    });
});

router.post("/:id/delete", isLoggedIn, (req, res) => {
  Event.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/events/my-events");
    })
    .catch(() => {
      res.redirect("/events/my-events");
    });
});

router.get("/:id/rsvp", isLoggedIn, (req, res) => {
  Event.findById(req.params.id)
    .then((foundEvent) => {
      res.render("rsvp", { foundEvent: foundEvent });
    })
    .catch((error) => {
      console.log("failed", error.message);
    });
});

router.post("/:id/confirm", isLoggedIn, (req, res) => {
  Event.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $addToSet: { attendees: req.session.user },
    }
  )
    .then(() => {
      res.redirect("/events/my-events");
    })
    .catch(() => {
      res.redirect("/");
    });
});

module.exports = router;
