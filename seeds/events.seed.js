// Iteration #1
const { testing } = require("googleapis/build/src/apis/testing");
const mongoose = require("mongoose");
const Event = require("../models/Event.model");
require("dotenv/config");

const events = [
  {
    title: "Volley ball game at south beach",
    description:
      "we will be playing recreationally Volley ball game for couple of hours while sharing some beers. Also part of the plan is to have few sprints towards the water and quick dips before getting back to the game",
    address: "120 Collins Ave",
    city: "Miami Beach",
    state: "FL",
    zipCode: 33145,
    imageUrl:
      "https://cdn.vox-cdn.com/thumbor/oMCdIG4kyMWBBHu_0wBulHtd-xI=/0x0:4755x3170/2120x1413/filters:focal(2222x669:2982x1429):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/69251380/959269384.0.jpg",
    eventType: "outdoor-activity",
    totalSpots: "20",
    eventDate: "May 18, 2022",
    startTime: "5:30pm",
    endTime: "8:00pm",
  },
  {
    title: "Bar hopping in Brickell",
    description:
      "we will meet up at a local bar, grab a drink, socialize a bit and then head out to the second bar. That's where we put our party hat and bust some moves and to cap off the night we head to another super amazing bar in the Brickell area. One drink at each of the three bars is included in the cost of the event. Party till you drop!",
    address: "770 Miami Ave",
    city: "Miami",
    state: "FL",
    zipCode: 33030,
    imageUrl:
      "https://drunkard.com/wp-content/uploads/2015/04/bar-hopping-hdr.jpg",
    eventType: "social",
    totalSpots: "16",
    eventDate: "May 13, 2022",
    startTime: "9:00pm",
    endTime: "2:00am",
  },
  {
    title: "A dinner to remember",
    description:
      "An Italina fare five course meal prepared by world's renowned chef, paired with wines from south of france and topped off with a tiramisu. Music in the background will bring you vibes from the amalfi coast. The events cost includes food, wine and dessert",
    address: "2423 Brickell Ave",
    city: "Miami",
    state: "FL",
    zipCode: 33169,
    imageUrl:
      "https://i.insider.com/55ba73262acae732118bb6fa?width=2000&format=jpeg&auto=webp",
    eventType: "food",
    totalSpots: "8",
    eventDate: "May 05, 2022",
    startTime: "7:30pm",
    endTime: "10:30pm",
  },
  {
    title: "let's laugh together",
    description:
      "going to a renowned comedy club on a special night, Jamy Jones and Nick Faraaj will be presenting during their homecoming event. cost of the event includes priority line access, reserved table and two drinks of your choice",
    address: "3420 26th Street",
    city: "Miami",
    state: "FL",
    zipCode: 33120,
    imageUrl: "https://media.timeout.com/images/105229306/1372/772/image.jpg",
    eventType: "experience",
    totalSpots: "20",
    eventDate: "Apr 30, 2022",
    startTime: "6:30pm",
    endTime: "9:00pm",
  },
  {
    title: "Social evening with Ironhackers",
    description:
      "students, alumni and staff gather for an evening of fun filled activities. Light refreshments will be served. we wil be splitting up in smallers groups to play board games. Our house DJ-Mike will be mixing music. Dancing is strongly encouraged, so bring on your dancing shoes",
    address: "120 8th Street",
    city: "Miami",
    state: "FL",
    zipCode: 33225,
    imageUrl:
      "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F272871049%2F268702284101%2F1%2Foriginal.20220425-204912?w=800&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C37%2C1200%2C600&s=8e6709032c5da0a91b4b489ed69f4a7e",
    eventType: "social",
    totalSpots: "60",
    eventDate: "April 29, 2022",
    startTime: "6:30pm",
    endTime: "10:00pm",
  },
  {
    title: "Movie night",
    description:
      "if you haven't seen NO TIME TO DIE yet, let's sing some bond tunes together. This is a night filled with excitement, drinks, popcorn and anything your heart desires from the confectionary stand. Cost of the event only includes the movie tickets",
    address: "5478 Tenth Street",
    city: "Miami",
    state: "FL",
    zipCode: 33130,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/f/fe/No_Time_to_Die_poster.jpg",
    eventType: "night-out",
    totalSpots: "12",
    eventDate: "May 27, 2022",
    startTime: "6:00pm",
    endTime: "9:00pm",
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

Event.create(events)
  .then(function (results) {
    console.log("Success", results);
    mongoose.connection.close();
  })
  .catch(function (error) {
    console.log("Failure", error.message);
    mongoose.connection.close();
  });
