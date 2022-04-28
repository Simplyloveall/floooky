var express = require("express");
var router = express.Router();
var Event = require("../models/Event.model");

/* GET home page. */
router.get("/test", function (req, res, next) {});

router.get("/", (req, res, next) => {
  Event.find()
    .populate("owner")
    .then((allEvents) => {
      res.render("index", { allEvents: allEvents });
    })
    .catch((err) => {
      console.log("Failed", err.message);
      // res.redirect("/");
    });
});

module.exports = router;
