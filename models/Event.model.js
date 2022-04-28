const { model, Schema } = require("mongoose");

const eventSchema = new Schema({
  title: { type: String },
  description: { type: String, maxlength: 400 },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: Number },
  imageUrl: {
    type: String,
    default:
      "https://cdn.agrilifetoday.tamu.edu/wp-content/uploads/2020/10/AdobeStock_386219295.jpeg",
  },
  eventType: {
    type: String,
    enum: [
      "indoor-activity",
      "outdoor-activity",
      "date-night",
      "night-out",
      "food",
      "game",
      "sports",
      "social",
      "music",
      "experience",
    ],
  },
  totalSpots: {
    type: Number,
  },
  attendees: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  // tags: {
  //   type: [String]
  // }
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

const Event = model("Event", eventSchema);

module.exports = Event;
